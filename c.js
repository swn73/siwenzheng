
function motigo_webstats_init(counter_id) {
    var _c = document;
    // do the replacement
    this._d = function () {
        var a = _c.getElementById('mws' + counter_id);
        if (a ) {
            a.href = 'http://www.motigo.com/webstats/catalog/a/b/'+counter_id;
            a.innerHTML = "<img src='//webstats.motigo.com/assets/n80x15-7.gif' />";
        }
    };
}


function motigo_guid(){
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);return v.toString(16);});
}

function motEvt(etype,guid,url,info,etime,depth)
{
    var cdate=new Date().toISOString().slice(0, 19).replace('T',' ');
    var event_file = '//webstats.motigo.com/e.js?t='+etype+'&d='+cdate+'&cid=4416069&g='+guid+'&url='+url+'&i='+info+'&etime='+etime+'&depth='+depth;
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = event_file;
    document.body.appendChild(s);
}

function _gaUn()
{
    if(typeof(linkclicked) !== "undefined" && linkclicked)
        return;
    var cdate=new Date().toISOString().slice(0, 19).replace('T',' ');
    var vtime=(motstime-Date.parse(lvisit))/1000;
    motEvt(3,vguid,encodeURI(location.href),"",vtime,vdepth);

    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); } while(curDate-date < 300);
}

function _gaLt(event){
    var el = event.srcElement || event.target;
    while(el && (typeof el.tagName == "undefined" || el.tagName.toLowerCase() != "a" || !el.href)){
        el = el.parentNode;
    }

    if(el && el.href){
        linkclicked=true;
        var link = el.href;
        if(link.indexOf(location.host) == -1 && !link.match(/^javascript\:/i)){ /* external link */
            var hitBack = function(link, target){ target ? window.open(link, target) : window.location.href = link; };
            var target = (el.target && !el.target.match(/^_(self|parent|top)$/i)) ? el.target : false;
            var et=1;
            if(target)
                et=2;
            motcbs.push(function(){hitBack(link, target);});
            var vtime=(motstime-Date.parse(lvisit))/1000;
            motEvt(et,vguid,encodeURI(link),encodeURI(location.href),vtime,vdepth);
            event.preventDefault ? event.preventDefault() : event.returnValue = !1;
        }
    }
}

var motstime=null;
var linkclicked=false;
var lvisit=null;
var vguid=null;
var vdepth=null;

function motigoTrack(mAjax)
{
    if (!this.mws_i) {
        this.mws_i = new motigo_webstats_init(4416069);
        this.mws_i._d();
    }

    motstime=new Date();
    var motcbs=[];

    var cookiename="motc_4416069_";

    var re1 = new RegExp(cookiename+"1=([^;]+)");
    var value = re1.exec(document.cookie);
    var is_returned=1;
    if(!value)
    {
        is_returned=0;
        var exp1=new Date();
        exp1.setDate(exp1.getDate() + 10000);
        document.cookie =cookiename+'1=4416069; expires='+exp1.toString()+'; path=/;';
    }
    var re2 = new RegExp(cookiename+"2=([^;]+)");
    lvisit = re2.exec(document.cookie);
    var reftime='';
    var is_visit=1;
    if(lvisit)
    {
        lvisit=lvisit[1];
        reftime=(new Date()-Date.parse(lvisit))/1000;
        is_visit=0;
    }
    var exp2 = new Date();
    var cd=exp2.toString();
    exp2.setTime(exp2.getTime()+(1*60*60*1000));
    document.cookie =cookiename+'2='+cd+'; expires='+exp2.toString()+'; path=/;';

    var re3 = new RegExp(cookiename+"3=([^;]+)");
    var vm = re3.exec(document.cookie);
    vdepth=0;
    vguid=null;
    if(vm)
    {
        vguid=vm[1].split('#')[0];
        vdepth=parseInt(vm[1].split('#')[1])+1;
    }
    var refh=document.referrer.split('/')[2];
    var curh=window.location.hostname;
    if(!vguid || !refh || curh!=refh)
    {
        vguid=motigo_guid();
        vdepth=0;
        reftime='';
    }

    var exp3 = new Date();
    exp3.setTime(exp3.getTime()+(1*60*60*1000));
    document.cookie =cookiename+'3='+vguid+'#'+vdepth+'; expires='+exp3.toString()+'; path=/;';

    var re3 = new RegExp(cookiename+"3=([^;]+)");
    var vm = re3.exec(document.cookie);
    if(!vm)
        vguid='';

    var referer=document.referrer;
    if(mAjax && this.lastReferer)
        referer=this.lastReferer;

    this.lastReferer=location.href;
    
    var cookieEnabled=(navigator.cookieEnabled)? true : false;
    if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ document.cookie="testcookie";cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false;}

    var tracking_file = '//webstats.motigo.com/t.js?id=4416069&type=3&lang=EN';
    tracking_file 	+= '&host=' + window.location.host
    + '&width=' + screen.width
    + '&height=' + screen.height
    + '&requrl=' + encodeURIComponent(location.href)
    + '&referrer=' + encodeURIComponent(referer)
    + '&time=' + (new Date().getTime())
    + '&date=' + (new Date().getFullYear()) + '-' + (new Date().getMonth()+1) + '-' +(new Date().getDate())
    + '&hours=' + (new Date().getHours())
    + '&minutes=' + (new Date().getMinutes())
    + '&seconds=' + (new Date().getSeconds())
    + '&timezone=' + (new Date().getTimezoneOffset())
    + '&is_visit=' + is_visit
    + '&is_returned=' + is_returned
    + '&vguid=' + vguid
    + '&depth=' + vdepth
    + '&reftime=' + reftime
    + '&java=' + (navigator.javaEnabled() ? 1 : 0)
    + '&cookies=' + (cookieEnabled ? 1 : 0);

    if(mAjax)
    {
        var s = document.createElement("script");
        s.setAttribute("src", tracking_file);
        document.body.appendChild( s );
    }
    else
    {
        document.write('<sc'+'ript type="text/javascript" src="' + tracking_file + '"></scr'+'ipt>');
        //document.write('<sc'+'ript type="text/javascript" src="http://get.mirando.de/js/jslib.js"></scr'+'ipt><scri'+'pt type="text/javascript" src="http://get.mirando.de/mirando.js#a=11449575"></sc'+'ript>');
     }

    linkclicked=false;
}

if(typeof motigoCounterLoaded==="undefined")
{
    var motigoCounterLoaded=new Array();
}

if(window.frameElement && window.frameElement.nodeName=="IFRAME" && location.href.toLowerCase().indexOf("beepworld")<0)
{
        var rurl=location.href;
        if(rurl.indexOf("?")>=0)
            rurl+="&motigredir=1";
        else
            rurl+="?motigredir=1";
        self.parent.location=rurl;
}
else if(!("4416069" in motigoCounterLoaded))
{
    motigoCounterLoaded["4416069"]=true;
    if(location.href.indexOf("motigredir=1")>=0)
        document.write("Do not insert the motigo tracking code in an iframe!");


     motigoTrack(0);

    var w = window;
    w.addEventListener ? w.addEventListener("unload",function(){return _gaUn();},!1)
     : w.attachEvent && w.attachEvent("onunload",function(){return _gaUn();});

    var w = window;
    w.addEventListener ? w.addEventListener("load",function(){document.body.addEventListener("click",_gaLt,!1)},!1)
     : w.attachEvent && w.attachEvent("onload",function(){document.body.attachEvent("onclick",_gaLt)});
}
