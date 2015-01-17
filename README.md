Storage Tables
=============
[![Build Status](https://travis-ci.org/fassetar/StorageTables.svg?branch=master)](https://travis-ci.org/fassetar/StorageTables)
[![devDependency Status](https://david-dm.org/fassetar/storagetables/dev-status.svg)](https://david-dm.org/fassetar/storagetables#info=devDependencies)
<a href="https://www.gittip.com/fassetar/"><img src="http://img.shields.io/gittip/fassetar.png" alt="Gittip"></a>

>Lightweight editable storage tables.

Does not use this yet, its not ready :P
Requirements
=====
Grunt ~0.10<br/>
Jquery ~2.00

Getting Started
====
coming soon...

Things it does
=====
  This plugin will be attached to a element and look for any tables already inside of it. If no table inside a div not will pull in content 
for the table and build out that table. If a table is already provide (<b>Pre-rendered</b>) it will interprete that table and provide inputs for the user. Passing back and forward when need to the user for storaging data. Inspired by ng-grid and datatables.

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
 - tableTemplate: //html table tag and it's content.
 - titleTemplate: //header above the table tag. 
 - columnTemplate: 
 - inputBy: ['hori'||'vert'] || ['horizontal'||'vertical'] //order in which the next input will take focus.
 - focus: [true|| false] //default false
 - dataType: (json/csv) I won't be doing xml.
 - orderBy: ['height'||'width'] || ['wide'||'tall']
 - rotatable: [true||false] //default:false
 - editable: [true|| false] //default true, allowing users to edit
 - deletable: [true||false] //default false
 - columnNames: //n+1 or provided.
 - manualBox: //dialog/modal for manually inputting data.
 - autoSave: [true||false] //default false
 
API Documentation 
=====
coming soon, this will be the calls/events you can attach to.


Example
====
<pre>
$('.storage').StorageTable({
  inputBy: 'vert',
  rotatable: true,
  focus: false
});
</pre>

Release History
=============
> release version coming soon... 

 * 2015-01-05   v0.0.1   Started recording history notes.
