/**
 * TODOs
 * 
 * Deal with length issue. field name plus data cannot exceed 128 chars. Example of breaking:
 * http://digital.ncdcr.gov/cdm/compoundobject/collection/p249901coll22/id/85451/rec/2
 * This limit applies to custom variables only, but let's just keep the events short, too, eh?
 * 
 * Break out multi-part agencies or collections into separate events/variables?
 * 
 * document everything, in fact
 * 
 * what the hell does this line do?
 *   pageTracker = _gat._getTrackerByName('UA-1152148-35');
 * my guess is nothing, it looks like legacy code to me
 * if it's working with Addthis, it probably needs an update
 * 
 * re-test whether the setDomainName nonsense is working across browsers, and with the events, etc.
 * 
 * plug-and-play version for sharing, plus a readme
 * minimized version
 * 
 * This could actually be a presentation, dudes
 * 
 */

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1152148-35']);

if (location.host==='digital.ncdcr.gov') {
  _gaq.push(['_setDomainName', 'ncdcr.gov']);
} else if (location.host==='cdm16062.contentdm.oclc.org') {
  _gaq.push(['_setDomainName', 'cdm16062.contentdm.oclc.org']);
}
_gaq.push(['_setAllowLinker', true]);

var pageTracker = [];
var addthis_config = [];
_gaq.push(function() {
  pageTracker = _gat._getTrackerByName('UA-1152148-35');
    addthis_config = {
      data_ga_tracker: pageTracker,
      data_track_clickback: true
    };
});

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

$(document).ready(function(){
  var agency="", collection="";  
  var rows=document.getElementsByTagName("tr");
  var done=0;
  for(var i=0;i<rows.length;i++){
    if (done===2) {
      break;
    }
    else {
      //Most browsers
      try{if(rows[i].childNodes[1].textContent&&(/Agency/.test(rows[i].childNodes[1].textContent))){agency=rows[i].childNodes[3].textContent.trim();done++;}}catch(e){}
      try{if(rows[i].childNodes[1].textContent&&(/Digital Collection/.test(rows[i].childNodes[1].textContent))){collection=rows[i].childNodes[3].textContent.trim();done++;}}catch(e){}
      //IE8
      try{if(rows[i].childNodes[0].innerText&&(/Agency/.test(rows[i].childNodes[0].innerText))){agency=$.trim(rows[i].childNodes[1].innerText);done++;}}catch(e){}
      try{if(rows[i].childNodes[0].innerText&&(/Digital Collection/.test(rows[i].childNodes[0].innerText))){collection=$.trim(rows[i].childNodes[1].innerText);done++;}}catch(e){}
    }    
  };
  if (agency!==""){
    _gaq.push(['_trackEvent', 'Agency', agency]);
    _gaq.push(['_setCustomVar',1,'Agency',agency]);
  }
  if (collection!==""){
    _gaq.push(['_trackEvent', 'Collection', collection]);
    _gaq.push(['_setCustomVar',2,'Collection',collection]);
  }  
  
  _gaq.push(['_trackPageview']); 
})