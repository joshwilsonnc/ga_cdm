<h4>A custom implementation of Google Analytics for CONTENTdm 6 users 
that enables recording metadata field values as GA events</h4>

<em>Updated September 2014: set Version to 2.0 - improved jQuery integration for
better cross-browser compatibility. <strong>It is very important to upgrade to this 
version to ensure events are tracked across all browsers.</strong> Previous code
versions have been discovered to miss data in some browsers for recent versions 
of CONTENTdm.</em>

<h5>About</h5>
<p>This code evolved from our interest in tracking pageviews of specific items in our digital
collections. We wanted a useful way to record metadata field values as part of the data. For
example, in our state publications collections, we utilize an "Agency-Current" field which
contains the name of the state agency that published the item. This code enables us
to specify which fields we wanted to track, and they are recorded as events.</p>

![Metadata in CONTENTdm](http://joshwilson.net/imgs/ga_cdm_metadata.jpg)

<p>In this example, if I was tracking the "Agency-Current" field, when an item with 
that field was viewed, an event would be recorded:</p>

![How metadata is recorded in Google Analytics](http://joshwilson.net/imgs/ga_cdm_analytics.jpg)

<p>By default, the event category will be "Pageview by metadata field". The field name will
be recorded as the event action, and the field value as the event label.</p>

<h5>analytics.js (universal analytics)</h5>
<p>To configure, edit the analyticsjs_cdm.js file</p>

<ul>
<li>Ensure that analytics is enabled in CONTENTdm's Website Configuration Tool</li>
<li>Add the metadata field names you want to record usage of in the trackTheseFields array</li>
</ul>

<h5>ga.js (classic analytics)</h5>
<p>To configure, edit the ga_cdm.js file</p>

<ul>
<li>Add the metadata field names you want to record usage of in the trackTheseFields array</li>
<li>Edit gaAccount so that it contains your GA account number</li>
<li>Edit digitalCollectionsDomain so that it contains your site's domain</li>
<li>Optionally edit hostedAliasDomain if you have a hosted instance URL</li>
</ul>