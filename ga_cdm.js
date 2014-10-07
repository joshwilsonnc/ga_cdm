/**
 * GOOGLE ANALYTICS METADATA TRACKING FOR CONTENTDM 6
 * Josh Wilson, State Library of North Carolina, josh.wilson@ncdcr.gov
 * 
 * Version: 2.0
 * 
 * Updates this version: greatly simplified, cross-browser compatible code via
 * more thorough jQuery integration.
 * 
 * This script allows you do define CONTENTdm 6 metadata fields you want tracked in
 * Google Analytics. For example, you might have a field that contains the Agency
 * responsible for the document, and you'd like to get usage data by Agency. 
 * 
 * Uses ga.js (classic analytics) code. Be sure to set the metadata fields you 
 * wish to track by editing the trackTheseFields array below. Also set your GA
 * account information, domain, and (if applicable) domain alias below.
 * 
 * See analyticsjs_cdm.js for newer Universal Analytics version.
 * 
 * Fields are tracked as Events:
 *  - Event Category default is defined below, but you can change it
 *  - Field name will be recorded as an Event Action 
 *  - Field value will be recorded as Event Label
 *    --(you can drill down from Category on the GA Top Events report)
 *    
 * For simplified cross-browser support and syntax, uses jQuery 1.x, which is
 * loaded in CONTENTdm and is supported in IE 6+.
 *  
 */

////////////////////////////////////////////////////////////////////////////////////
// ADD METADATA FIELDS YOU WANT TO TRACK HERE
// 
// Add metadata fields you wish to track to the trackTheseFields array. 
// 'Agency' and 'Digital Collection' are set in the array as examples.
// Field names will be matched exactly.
// 
// You can optionally change the Category text here as well.
////////////////////////////////////////////////////////////////////////////////////
var category = 'Pageview by metadata field';
var trackTheseFields = [
  'Agency',
  'Digital Collection'
];
////////////////////////////////////////////////////////////////////////////////////
// SET YOUR GOOGLE ANALYTICS ACCOUNT AND DOMAIN(S) HERE
// gaAccount corresponds to your GA account and property number. 
//    Looks like 'UA-X-Y' (where X is specific to your account and Y is a property number)
// digitalCollectionsDomain is wherever your digital collections are set up
// Hosted instances may have an additional alias URL like cdm######.contentdm.oclc.org
//    Updated the value for hostedAliasDomain with the correct URL if this 
//    applies to your institution. Ignore this line otherwise.
////////////////////////////////////////////////////////////////////////////////////
var gaAccount = 'UA-1-1';
var digitalCollectionsDomain = 'my.site.com';
var hostedAliasDomain = 'change.if.applicable.otherwise.ignore';
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
// No changes necessary below this point.
////////////////////////////////////////////////////////////////////////////////////

var trackedFieldIndex;
var label;

//Standard GA initial calls
var _gaq = _gaq || [];
_gaq.push(['_setAccount', gaAccount]);

//Set domain name correctly for hosted instances, depending on location
if (hostedAliasDomain !== 'change.if.applicable.otherwise.ignore') {
  //Depending on referrer, visitors might have either of these two domain names
  //Need to allow for either or GA will ignore tracking if domain name doesn't match code
  if (location.host===hostedAliasDomain) {
    //if the specified hostedAliasDomain matches the current domain, set it
    //otherwise use the default domain
    _gaq.push(['_setDomainName', hostedAliasDomain]);
  } else {
    _gaq.push(['_setDomainName', digitalCollectionsDomain]);
  }
  _gaq.push(['_setAllowLinker', true]);
}
//Standard GA ga.js loading
(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

/**
 * Grab all "description_col1"-class elements, which represent metadata field names, 
 * then check for desired fields. Once you find them, the actual value of the field 
 * is located nearby. This is potentially volatile and will need an update when 
 * anything changes in CONTENTdm's page structure.
 * 
 * The analytics.js library is assumed to be loaded when this is run. It will be 
 * available if you've enabled Google Analytics via CONTENTdm's Website Configuration
 * tool.
 */
$(document).ready(function(){
  var done = 0;

  //loop through all the metadata field elements
  $(".description_col1").each(function() {
    //Try to reduce the amount of time spent looping through metadata elements
    //by breaking when the number of desired fields have been found. 
    if (done === trackTheseFields.length) {
      return false;
    }
    else {      
      fieldOfInterest = $.trim($(this).text());
      
      if ($.inArray(fieldOfInterest, trackTheseFields) >= 0) {
        label = $.trim($(this).next().text());
        _gaq.push(['_trackEvent', category, trackTheseFields[trackedFieldIndex], label]);
        done++;
        //Uncomment the following line for exciting debugging action:
        //console.log("category, action, label:" + category + ", " + fieldOfInterest + ", " + label);
      }
    }    
  });
  
  //Finally, add trackPageview to the gaq command queue
  //Needs to be in the .ready() block to ensure proper timing
  _gaq.push(['_trackPageview']); 
});