var done = true; var result=0;
function motAdtagFbTrack(tagId,fbDepth){
var cdate=new Date().toISOString().slice(0, 19).replace('T',' ');
var event_file = '//webstats.motigo.com/e.js?t=4&d='+cdate+'&cid=4416069&i='+tagId+'&etime=1526887308&depth='+fbDepth;
var s = document.createElement("script");
s.type = "text/javascript";
s.src = event_file;
document.body.appendChild(s);
}
function motAdtagFallback(tagType,doTrack){
if (typeof this.counter === "undefined"){this.counter=new Array();}
if (!(tagType in this.counter)){this.counter[tagType]=0;}
this.counter[tagType]=this.counter[tagType]+1;
if(this.counter[tagType]==1 && tagType=='Layer'){var fallbackId='fallback'+tagType+this.counter[tagType];
var fallbackDiv = document.createElement('div');
fallbackDiv.setAttribute('id', fallbackId);
document.getElementById('motigoAdtag'+tagType).appendChild(fallbackDiv);
fallbackDiv=document.getElementById(fallbackId);
fallbackDiv.innerHTML='<sc'+'ript type="text/javascript" src="//get.mirando.de/mirando.js#a=11449571"></sc'+'ript>';
ret = fallbackDiv.childNodes;for ( var i = 0; ret[i]; i++ ) {if (ret[i].nodeName.toLowerCase()=="script" ) {                            var script=( ret[i].parentNode ? ret[i].parentNode.removeChild( ret[i] ) : ret[i] );                            eval(script.innerHTML);    }}if(doTrack)motAdtagFbTrack(5,1);
}
}
document.write('<div id="motigoAdtagLayer">');
document.write('<sc'+'ript type="text/javascript" src="//get.mirando.de/mirando.js#a=12677056"></sc'+'ript>');
document.write('</div>');
document.write('<div id="motigoAdtagPopunder">');
document.write('<sc'+'ript type="text/javascript" src="//get.mirando.de/js/jslib.js"></sc'+'ript><sc'+'ript type="text/javascript" src="//get.mirando.de/mirando.js#a=11449575"></sc'+'ript>');
document.write('</div>');
document.write('<div id="motigoAdtagMotigolayer1">');
document.write('<sc'+'ript type="text/javascript" src="//get.mirando.de/mirando.js#a=17533196"></sc'+'ript>');
document.write('</div>');
document.write('<div id="motigoAdtagPushDown">');
document.write('<sc'+'ript type="text/javascript" src="//get.mirando.de/mirando.js#a=14466056"></sc'+'ript><sc'+'ript>var  motigo4279Status=0;function motigoReject4279(){   parent.motigo4279Status=-1;}function motigoAccept4279(){   parent.motigo4279Status=1;}function survey4279(){  if(motigo4279Status==1)    console.log(\'4279:1\');  else if(motigo4279Status==-1)     motAdtagFallback(\'PushDown\',false); else   window.setTimeout("survey4279()", 500);} survey4279();</sc'+'ript>');
document.write('</div>');
document.write('<div id="motigoAdtagPopunder">');
document.write('<!--script type="text/javascript" src="//get.mirando.de/js/jslib.js"></sc'+'ript--><sc'+'ript type="text/javascript" src="//get.mirando.de/mirando.js#a=15586239"></sc'+'ript>');
document.write('</div>');
document.write('<div id="motigoAdtagPopunder">');
document.write('<sc'+'ript type="text/javascript" src="//get.mirando.de/js/jslib.js"></sc'+'ript><sc'+'ript type="text/javascript" src="//get.mirando.de/mirando.js#a=15847019"></sc'+'ript>');
document.write('</div>');
document.write('<div id="motigoAdtagPopunder">');
document.write('<sc'+'ript type="text/javascript" src="//get.mirando.de/js/jslib.js"></sc'+'ript><sc'+'ript type="text/javascript" src="//get.mirando.de/mirando.js#a=16045100"></sc'+'ript>');
document.write('</div>');
document.write('<div id="motigoAdtagPopunder">');
document.write('<sc'+'ript type="text/javascript" src="//get.mirando.de/js/jslib.js"></sc'+'ript><sc'+'ript type="text/javascript" src="//get.mirando.de/mirando.js#a=16045451"></sc'+'ript>');
document.write('</div>');
document.write('<div id="motigoAdtagInread">');
document.write('<sc'+'ript type="text/javascript" src="//get.mirando.de/mirando.js#a=12491744"></sc'+'ript>');
document.write('</div>');
document.write('<div id="motigoAdtagPopunder">');
document.write('<sc'+'ript type="text/javascript" src="//get.mirando.de/mirando.js#a=17582704"></sc'+'ript>');
document.write('</div>');
