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
 * Uses analytics.js (Universal Analytics) code. To use this script, enable 
 * Google Analytics via CONTENTdm's Website Configuration tool. (This establishes
 * your GA account information and brings in the analytics.js library.) Then set the 
 * metadata fields you wish to track by editing the trackTheseFields array below.
 * 
 * See ga_cdm.js for ga.js (classic analytics) version.
 * 
 * Fields are tracked as Events:
 *  - Event Category default is defined below, you can optionally change it
 *  - Field name will be recorded as Event's Action 
 *  - Field value will be recorded as Event's Label
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
// No changes necessary below this point.
////////////////////////////////////////////////////////////////////////////////////
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
var label;
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
        ga('send', 'event', category, fieldOfInterest, label);
        done++;
        //Uncomment the following line for exciting debugging action:
        //console.log("category, action, label:" + category + ", " + fieldOfInterest + ", " + label);
      }
    }    
  });
});