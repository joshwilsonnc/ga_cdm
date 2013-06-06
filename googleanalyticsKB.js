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
  else {
    console.log("IE debug: agency not set");
  }
  if (collection!==""){
    var collStr=''; var patt = /[a-z][A-Z]/g; var bp; var strIndex=0;
    while ((bp = patt.exec(collection)) != null) {
      collStr += collection.substring(strIndex, bp.index+1) + ';';
      strIndex = bp.index+1;
    } 
    collStr += collection.substring(strIndex, collection.length);
    _gaq.push(['_setCustomVar',2,'Collection',collStr]);
  }  
  
  _gaq.push(['_trackPageview']); 
})