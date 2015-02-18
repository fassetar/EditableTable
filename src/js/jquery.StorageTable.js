/* StorageTables v0.0.1
* Copyrights 2015 by Anthony Fassett */
(function ($) {
	"use strict";
	$.fn.storageTable = function (options) {
	    var settings = $.extend({
	        // These are the defaults.
	        dataType: "json",
	        editable: false,
	        deletable: false
	    }, options);
	    var opts = $.extend({}, options);	    
	    	    
	    //var editedsamples = [], currentSaved = [];
		if ($(this).is(':empty')) {
		    $(this).append($.fn.storageTable.tableTemplate());
		} else {
            //TODO: attack handlers for ajax calls and other stuff.
		}
	};

	//Editable Templates
	$.fn.storageTable.tableTemplate = function (title, head, body) {		
	    var caption = (title) ?  ('<caption>'+ title +  '</caption>') : "";
		var table = '<table>'+ caption;
		table += $.fn.storageTable.columnTemplate();
		table += '</table>';
		return table;
	};

	$.fn.storageTable.columnTemplate = function (colNum) {
	    //TODO: Find column length.
	    colNum = typeof colNum !== 'undefined' ? colNum : 10;
	    var tbody = '<tr>', thead = '<thead><tr>';
	    for (var i = 1; i <= colNum; i++) {
	        thead += '<th>' + i + '</th>';
	    }
	    //NOTES: Chrome by default wrapping with tbody.
	    for (var t = 1; t <= colNum; t++) {
	        tbody += '<td>' + t + '</td>';
	    }
	    return thead + '</tr></thead>' + tbody + '</tr></tbody>';
	};

	$.fn.storageTable.columnNames = function () {

	};
	
	//Users Perferences
	$.fn.storageTable.inputHorizontal = function (val) {
	    return val;
	};

	$.fn.storageTable.rotatable = function () { };

	$.fn.storageTable.focus = function () {
	    //TODO: Look for the first available free space.
	};

	$.fn.storageTable.manualBox = function () {};

	$.fn.storageTable.autoSave = function () {
		//#region autoSave function
		if(!options.autoSave) {
			$(".btn-save").click(function (event) {		        
				if (editedsamples === 0) {
					alert("You have made no changes!");
				}
				else {
					if (confirm("Are you sure you want to save?")) {
						var edited = [], values = [], failedvalues =[];
						for (var z = 0; z < editedsamples.length; z++) {
							edited.push(editedsamples[z][1]);
						}
						for (var i = 0; i < editedsamples.length; i++) {
							values.push(editedsamples[i][0]);
						}

						var storageItems = {
							"type": option.val,
							"id": edited,
							"sample": values		                    
						};
					}
				}
			});
		}     
		//#end region
	};

	$.fn.storageTable.clearButton = function () {	    
		if (!options.autoSave) {
			//TODO: change editedsamples to edites.
			$('.edites').val("");
		}
	};

	//TODO: working progress, and needs requirements.
	//NOTES: keep in mind a post page will ask this.
	$.fn.storageTable.pagination = function () {	
		$('#btnPrevItem, #bntBack, #btnNextItem').click(function () {		    
			if (editedsamples !== 0) {
				if (!confirm("You have edits that are not saved are you sure?"))
				{ event.preventDefault(); }
			}
			editedsamples = [];
			inputList = [];
		});
	};		
	//API Methods/event listener
	$.fn.storageTable.beforeData = function (err) {        
		$('.pageAlertsSection').empty();
		if (typeof (URL) === 'undefined') {
			URL = '/Storage/GetStorageUnitId/';
		}
	};
	$.fn.storageTable.afterData = function (err) {	    
		$('.pageAlertsSection').empty();
		if (typeof (URL) === 'undefined') {
			URL = '/Storage/GetStorageUnitId/';
		}
	};    
}( jQuery));