Storage Tables - <i>Jquery Plugin</i>
=============
[![GitHub release](https://img.shields.io/badge/Alpha-0.0.2-red.svg)]()
[![Build Status](https://travis-ci.org/fassetar/StorageTables.svg?branch=master)](https://travis-ci.org/fassetar/StorageTables)
[![devDependency Status](https://david-dm.org/fassetar/storagetables/dev-status.svg)](https://david-dm.org/fassetar/storagetables#info=devDependencies)
<a href="https://www.gittip.com/fassetar/"><img src="http://img.shields.io/gittip/fassetar.svg" alt="Gittip"></a><br/>

Requirements
=============
Grunt ~0.10<br/>
Jquery ~2.00

Getting Started
=============
<pre>
$('.storage').StorageTable({
  inputBy: 'vert',
  focus: false
});
</pre>

Things it does
=============
  This plugin will be attached to a element and look for any tables already inside of it. If no table inside a div not will pull in content 
for the table and build out that table. If a table is already provide (<b>Pre-rendered</b>) it will interpret that table and provide inputs for the user. Passing back and forward when need to the user for storaging data. Inspired by ng-grid and datatables.

Things it does not
===== 
 - Does not sort columns
 - Does not filter columns
 - Pagination

Template Layout
====
coming soon...

Options
====
 - inputBy: ['hori'||'vert'] || ['horizontal'||'vertical'] //order in which the next input will take focus.
 - focus: [true|| false] //default false
 - ajax: (json/csv) I won't be doing xml.
 - orderBy: ['height'||'width'] || ['wide'||'tall']
 - rotatable: [true||false] //default:false
 - editable: [true|| false] //default true, allowing users to edit
 - deletable: [true||false] //default false
 - columnNames: //n+1 or provided.
 
API Documentation 
=====
coming soon, this will be the calls/events you can attach to.

Release History
=============

 * 2015-01-05   v0.0.1   Started recording history notes.

License
=============
For more information about the license, Apache License
