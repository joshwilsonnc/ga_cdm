<h4>A custom implementation of Google Analytics for CONTENTdm 6 users 
that enables recording metadata field values as GA events.</h4>

<em>Updated September 2014: improved jQuery integration for better cross-browser
compatibility. Set Version to 2.0. Full best compatibility across browsers, be
sure to use this code version.</em>


<h5>ga.js (classic analytics)</h5>
<p>To configure, edit the ga_cdm.js file</p>

<ul>
<li>Add the metadata field names you want to record usage of in the trackTheseFields array</li>
<li>Edit gaAccount so that it contains your GA account number</li>
<li>Edit digitalCollectionsDomain so that it contains your site's domain</li>
<li>Optionally edit hostedAliasDomain if you have a hosted instance URL</li>
</ul>

<h5>analytics.js (universal analytics)</h5>
<p>To configure, edit the analyticsjs_cdm.js file</p>

<ul>
<li>Ensure that analytics is enabled in CONTENTdm's Website Configuration Tool</li>
<li>Add the metadata field names you want to record usage of in the trackTheseFields array</li>
</ul>