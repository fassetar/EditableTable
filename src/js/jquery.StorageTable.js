/* StorageTables v0.0.1
* Copyrights 2015 by Anthony Fassett */
(function ($) {
	"use strict";
	$.fn.storageTable = function (options) {
	    var settings = $.extend({
	        // These are the defaults.
	        dataType: "json",
	        editable: false,
	        deletable: false,	        
	        inputBy: true,
	        focus: false,
	        columns: []
	    }, options);
	    var opts = $.extend({}, options);	    
	    	    
	    //var editedsamples = [], currentSaved = [];
		if ($(this).is(':empty')) {
		    $(this).append(_fnTableTemplate());
		} else {
		    //_fnTableTemplate(); Look for all table elements.
		    //TODO: attack handlers for ajax calls and other stuff.
		    //Add Inputs on clicks or &nbsp;
		}
	};

	//Editable Templates
	function _fnTableTemplate(title, head, body) {
	    title = typeof title !== 'undefined' ? '<caption>' + title + '</caption>' : "";

	    head = typeof head !== 'undefined' ? head : _fnCreateHeader();

	    body = typeof body !== 'undefined' ? body : _fnCreateColumn();

		return '<table>' + title + head + body + '</table>';
	}

	$.fn.storageTable.columns = function (template) {
	    template = typeof template !== 'undefined' ? template : "";
	    _fnCreateColumn();
	};

	function _fnCreateHeader() {
	    var colNum = 10;
	    var thead = '<thead><tr>';
	    for (var i = 1; i <= colNum; i++) {
	        thead += '<th>' + i + '</th>';
	    }
	    return thead + '</tr></thead>';
	}

	function _fnCreateColumn() {
	    var colNum = 10, tbody = "<tbody><tr>"        
	    //NOTES: Chrome by default wrapping with tbody.
	    for (var t = 1; t <= colNum; t++) {
	        tbody += '<td>' + t + '</td>';
	    }
	    return tbody + '</tr></tbody>';
	}			
}( jQuery));