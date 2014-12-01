Storage Tables
=============
[![Build Status](https://travis-ci.org/fassetar/StorageTables.svg?branch=master)](https://travis-ci.org/fassetar/StorageTables)
<a href="https://www.gittip.com/fassetar/"><img src="http://img.shields.io/gittip/fassetar.png" alt="Gittip"></a>

>Lightweight editable storage tables for users.

Requirements
=====
Grunt ~0.10
Jquery ~2.00

Getting Started
====
coming soon...

Things it is not
===== 
 - Does not sort columns
 - Does not filter columns

Things it does
=====
  This plugin will be attached to a element and look for any tables already inside of it. If no table inside a div not will pull in content 
for the table and build out that table. If a table is already provide (<b>Pre-rendered</b>) it will interprete that table and provide inputs for the user. Passing back and forward when need to the user for storaging data. Inspired by ng-grid and datatables.

Template Layout
====
coming soon...

Options
====
>defaults, coming soon...

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
 - manuelOver: //dialog/modal for manually inputting data.
 
API Documentation 
=====
coming soon, this will be the calls/events you can attach to.


Example
====
<pre>
$('.storage').storageTable({
  inputBy: 'vert',
  rotatable: true,
  focus: false
});
</pre>

