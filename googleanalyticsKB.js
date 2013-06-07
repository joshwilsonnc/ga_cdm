/**
 * TODOs
 * 
 * Deal with length issue. field name plus data cannot exceed 128 chars. Example of breaking:
 * http://digital.ncdcr.gov/cdm/compoundobject/collection/p249901coll22/id/85451/rec/2
 * This limit applies to custom variables only, but let's just keep the events short, too, eh?
 * 
 * Break out multi-part agencies or collections into separate events/variables?
 * 
 * re-test whether the setDomainName nonsense is working across browsers, and with the events, etc.
 * 
 * plug-and-play version for sharing, plus a readme
 * minimized version
 * 
 */

//Standard GA initial calls
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-1152148-35']);

//Depending on referrer, visitors might have either of these two domain names
//Need to allow for either or GA will ignore tracking if domain name doesn't match code
if (location.host==='digital.ncdcr.gov') {
  _gaq.push(['_setDomainName', 'ncdcr.gov']);
} else if (location.host==='cdm16062.contentdm.oclc.org') {
  _gaq.push(['_setDomainName', 'cdm16062.contentdm.oclc.org']);
}
_gaq.push(['_setAllowLinker', true]);

//AddThis tracking
var pageTracker = [];
var addthis_config = [];
_gaq.push(function() {
  pageTracker = _gat._getTrackerByName('UA-1152148-35');
    addthis_config = {
      data_ga_tracker: pageTracker,
      data_track_clickback: true
    };
});

//Standard GA ga.js loading
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

/**
 * Use jQuery .ready() method to set the remainder to run after DOM is loaded
 * (jQuery is used by CONTENTdm, so it's available). Timing is important, CONTENTdm
 * pages can load slowly.
 * 
 * Basic idea is to grab all TR elements, look through them for desired metadata fields.
 * Once you find it, the actual value of the field is located nearby.
 * This is somewhat volatile and would probably need an update if anything changed in
 * CONTENTdm's page structure. There's probably a more clever way to do this. * 
 */
$(document).ready(function(){
  var agency="", collection="";  
  var rows=document.getElementsByTagName("tr");
  var done=0;
  for(var i=0;i<rows.length;i++){
    if (done===2) {
      //Try to reduce the amount of time spent looping through metadata elements
      //by flagging when the desired fields have been found and breaking.
      break;
    }
    else {     
      //Need to wrap element checks in try/catch structure to prevent the code from
      //failing badly when child elements don't exist
      //Most browsers
      try{if(rows[i].childNodes[1].textContent&&(/Agency/.test(rows[i].childNodes[1].textContent))){agency=rows[i].childNodes[3].textContent.trim();done++;}}catch(e){}
      try{if(rows[i].childNodes[1].textContent&&(/Digital Collection/.test(rows[i].childNodes[1].textContent))){collection=rows[i].childNodes[3].textContent.trim();done++;}}catch(e){}
      //IE8
      //- page structure renders slightly differently
      //- supports innerText instead of textContent
      //- doesn't support trim()
      try{if(rows[i].childNodes[0].innerText&&(/Agency/.test(rows[i].childNodes[0].innerText))){agency=$.trim(rows[i].childNodes[1].innerText);done++;}}catch(e){}
      try{if(rows[i].childNodes[0].innerText&&(/Digital Collection/.test(rows[i].childNodes[0].innerText))){collection=$.trim(rows[i].childNodes[1].innerText);done++;}}catch(e){}
    }    
  };
  //Record events
  if (agency!==""){
    _gaq.push(['_trackEvent', 'Agency', agency]);
  }
  if (collection!==""){
    _gaq.push(['_trackEvent', 'Collection', collection]);
  }  
  //Record variables - need to do this after events to avoid duplicated reporting
  if (agency!==""){
    _gaq.push(['_setCustomVar',1,'Agency',agency]);
  }
  if (collection!==""){
    _gaq.push(['_setCustomVar',2,'Collection',collection]);
  }  
  
  //Finally, add trackPageview to the gaq command queue
  //Needs to be in the .ready() block to ensure proper timing
  _gaq.push(['_trackPageview']); 
})