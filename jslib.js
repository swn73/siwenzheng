/* ########################################################################
Titel: CrossBrowser PopUnder JavaScript

Description:
This code ensures the capability for opening popunder windows using  
javascript even if popup-blockers are present and active.
This code might be delivered by an adserver.

Tested Browsers:
    	* Internet Explorer 6,7,8,9
	* Google Chrome 7,8,9,10,11,12
    	* Firefox 2,3,4,5,6,7 (only onclick popunder)
    	* Opera 8,9
    	* Safari 2,3,4,5

Tested Toolbars:
    * Google Toolbar, Ver. 4.0.1020.2544-big/en (Internet Explorer 6.0.2900, WinXP Pro, SP2)
    * Yahoo Toolbar, Version 27.12.2006 (Internet Explorer 6.0.2900, WinXP Pro, SP2)


Date Created: 22.12.2006 - 17:08
Date Changed: 01.07.2011 - 10:22
Version: 1.9.3
Author: parrej
######################################################################## */

if (typeof Mirando === "undefined") {
	var Mirando = function() {};
}


var mirPopunderOpened=0;

Mirando.PopUnder = function() {

	/* CONFIGURATION PARAMETERS--------------------------------------- */
	this.windowName 		= false; /* the standard name of the new window or false if dynamic windownames are used */
	this.windowFeatures 		= 'scrollbars=yes,menubar=yes,location=yes,toolbar=yes,status=yes,resizable=yes'; /* you might want to also set 'width=800,height=600' */
	this.adTarget			= 'about:blank'; /* usualy set by Adserver */
	this.rewriteTags		= new Array("a", "input", "img", "textarea", "select","div","li","ul","span","i","button","ol","b","fieldset","section","article","th","td","h1","h2","h3","h4","h5"); /* Set all html tags which should be given an onclick-event during rewriting */
	this.triggerOnce		= true; /* Set this value to true, to only trigger the opening of a popunder window once per ad-webpage */
	this.uriBlacklist		= new Array('.googlesyndication.com', '.google.de', '.google.com', '.mirando.de'); /* Blacklist of URIs which must not be rewritten */
	this.elemIdBlacklist		= new Array('mirando'); /* Blacklist containing strings of Document-Element-IDs which must not be rewritten */
	this.instantOpen		= !(navigator && navigator.userAgent && navigator.userAgent.match(/chrome|opera/i) ); /* set to true, if you want to instantly try to open the popunder when it's loaded from the server */
	this.autoOpenDelay		= 2; /* set to a number of seconds you want to way before automaticaly open a popunder when 'this.instantOpen' is set to true */
	this.afterOpenCallback 		= null;
	this.altClicked =false;
	/* --------------------------------------------------------------- */
	
	var actionTriggered = false;
	var now = false;
	
	var that = this; // to avoid dynamic this-binding problems
	
	function unblockablePopunder(sUrl,sOptions,sName) 
	{
		var _parent = self;
		//var bPopunder = (navigator.appName=="Microsoft Internet Explorer" && parseInt( navigator.appVersion) < 9);
		var bPopunder = (navigator.appName=="Microsoft Internet Explorer");
		var ffPopunder = (navigator.appName=="Netscape");
		
		if(that.altClicked==false && ffPopunder==true)
			return null;				
		if (top != self) 
		{
		  try 
		  {
			if (top.document.location.toString()) 
				_parent = top;
		  }
		  catch(err) { }
		}

		var popunder = _parent.window.open(sUrl, sName, sOptions);
		if (popunder) 
		{
		   popunder.blur();
		   if (bPopunder) 
		   {
			  window.focus();			  
			  //try { opener.window.focus(); } catch (err) { }
		   }
		   else 
		   {                  
			 popunder.init = function(e) 
			 {
				with (e) 
			{
				  (function() 
			  {
					  if (typeof window.mozPaintCount != 'undefined') 
				  {
						 var x = window.open('about:blank');
						// var x = _parent.window.open('about:blank');
						 if(x==null)
						{
							 popunder.close();
							 popunder=null;
							 return null;
						}
						x.close();
					  }   
					  try { opener.window.focus(); }catch (err) {}
				  })();
				}
			  };
			  popunder.params = {
					url: sUrl
			  };
			  popunder.init(popunder);
		   }
		}                     
		return popunder;
		
	}    
	
	function openAddLink()
	{
		
		var popUnderWindow = null;
		if(that.triggerOnce && actionTriggered) { return; }
		
		if(!that.adTarget && !that.afterOpenCallback) { 
			// neither content-url nor callback set, exiting.
			return; 
		}
		
		if(!that.windowName) {
			now = new Date();
			that.windowName = ''+(now.getTime());
		}

		//popUnderWindow = window.open(that.adTarget, that.windowName, that.windowFeatures);

        var popunderHeight=-1;
        var popunderWidth=-1;

        var features=that.windowFeatures;
        var splitFeatures=features.split(',');
        for(var i=0;i<splitFeatures.length;i++)
        {
            if(splitFeatures[i].indexOf('width=')>=0)
                popunderWidth=parseInt(splitFeatures[i].replace('width=',''));
            if(splitFeatures[i].indexOf('height=')>=0)
                popunderHeight=parseInt(splitFeatures[i].replace('height=',''));
        }
        mirPopunderOpened++;

        if(popunderHeight>0 && popunderWidth>0)
        {
            var topPos=screen.height-popunderHeight;
            var rightPos=screen.width-popunderWidth;

            if(mirPopunderOpened==1)
                features+=',left=0,top=0';
            else if(mirPopunderOpened==2)
                features+=',left='+rightPos+',top='+topPos;
            else if(mirPopunderOpened==3)
                features+=',left='+rightPos+',top=0';
            else if(mirPopunderOpened==4)
                features+=',left=0,top='+topPos;
            else if(mirPopunderOpened>4)
                features+=',left='+Math.floor((Math.random() * 500) + 1)+',top='+Math.floor((Math.random() * 500) + 1);
        }

        popUnderWindow = unblockablePopunder(that.adTarget,features,that.windowName);

		if(popUnderWindow) { 
			//popUnderWindow.blur();
			//window.focus();
			actionTriggered = true;
			
			if (that.afterOpenCallback) {
				that.afterOpenCallback(popUnderWindow);
			}
		}
	}
	
	function inUriBlacklist(rewriteObj)
	{
		var k = 0;
		var matchString = '';
		var tagname = rewriteObj.tagName.toLowerCase();
		if(that.uriBlacklist.length>0) {
			if(tagname=='a') { matchString = rewriteObj.href.toLowerCase(); }
			if(tagname=='img') { matchString = rewriteObj.src.toLowerCase(); }
			if(matchString.length<1) return false;
			for(k=0;k<that.uriBlacklist.length;k++) {
				if(matchString.indexOf(that.uriBlacklist[k])!=-1) return true;
			}
		}
		return false;
	}
	
	function inElemIdBlacklist(rewriteObj)
	{
		var k = 0;
		var matchString = '';
		var tagname = rewriteObj.tagName.toLowerCase();
		if(that.elemIdBlacklist.length>0) {
			matchString = rewriteObj.id.toLowerCase();
			if(matchString.length<1) return false;
			for(k=0;k<that.elemIdBlacklist.length;k++) {
				if(matchString.indexOf(that.elemIdBlacklist[k])!=-1) return true;
			}
		}
		return false;
	}
	
	that.rewriteLinks = function()
	{
		var elementsFound = 0;
		var userAgent = navigator.userAgent;
		var i = 0;
		for(var j=0;j<that.rewriteTags.length;j++) {
			elementsFound = document.getElementsByTagName(that.rewriteTags[j]).length;
			if(elementsFound>0) {
				if(document.all && (!userAgent.match(/opera/i))) {
					for(i=0;i<elementsFound;i++) {
					
						var currentElement = document.getElementsByTagName(that.rewriteTags[j])[i];
					
						if(inUriBlacklist(currentElement)) continue;
						if(inElemIdBlacklist(currentElement)) continue;
						
						if(!currentElement.getAttribute('onclick')) {
							currentElement.attachEvent("onclick", openAddLink);
						}
					}
				} else {
					for(i=0;i<elementsFound;i++) {
						
						var currentElement = document.getElementsByTagName(that.rewriteTags[j])[i];
					
						if(inUriBlacklist(currentElement)) continue;
						if(inElemIdBlacklist(currentElement)) continue;
						
						var oldClickHandler = currentElement.onclick;

						currentElement.onclick = function() {			
							that.altClicked =true;
						    if (oldClickHandler) {
						    	oldClickHandler();
	  					    }
						    openAddLink();

						};
					}
				}
			}
		}
		if (that.instantOpen) {
		    window.setTimeout(function() {
		        openAddLink();
		    }, that.autoOpenDelay*1000 );
		}
	}
}
