(function ($) {	
	"use strict";
	$.fn.storageTable = function (options) {
		//#region core
		var opts = $.extend({}, options);		
		var editedsamples = [], currentSaved = [];
	    $(this).append($.fn.storageTable.tableTemplate("Example #1"));	    

		function url(URL) {
			var inputList = [];
			$.ajax({
					type: "GET",
					url: URL,
					dataType: $.fn.storageTable.dataType,
					cache: false,
					data: { 
						type: options.key, id: options.value
					},
					//beforeSend: function () { showStandardProcessingDialog(); },
					success: function (data) {
						$.each(data.unitItem, function (key, value) {
							if (data.unitItem[key].sampleid)
								currentSaved.push([data.unitItem[key].sampleid, data.unitItem[key].storageunitid]);
						});
						$('#DisplayString').text(data.displayLabel);						
					},
					complete: function () {
						$('.editable').get(0).focus();						
					},
					error: function () {
						alert("There was an error retrieving this sample id!");
					}
				});
		}
		//#end region
	};

	//Editable Templates
	$.fn.storageTable.tableTemplate = function (title, head, body) {		
		var table = '<table><caption>'+ title +'</caption>', tbody = '<tr>', thead = '<thead><tr>';
		//TODO: Find column length.
		for(var i=0; i< 10; i++){
			thead += '<th>'+ i+ '</th>';
		}
		//NOTES: Chrome by default wrapping with tbody.
		for (var t = 0; t < 10; t++) {
			tbody += '<td>' + t + '</td>';
		}
		table += thead + '</tr></thead>' + tbody + '</tr></table>';
		 return table;
	};
	$.fn.storageTable.columnTemplate = "";
	$.fn.storageTable.columnNames = function () { };
	
	$.fn.storageTable.dataType = "json";

	//Users Perferences
	$.fn.storageTable.inputHorizontal = function (val) {
	    return val;
	};

	$.fn.storageTable.rotatable = function () { };

	$.fn.storageTable.focus = function () { };

	$.fn.storageTable.manualBox = function () {
		var inputList = [];		
		$('.btnListInput').click(function () {		
			$('#ListInputDialog').dialog('open');		
		});
		$(".ListInputDialog").dialog({
			autoOpen: false,
			height: 450,
			show: {
				effect: "fade",
				duration: 300
			},
			hide: {
				effect: "fade",
				duration: 300
			},
			buttons: {
				"Save": function () {
					inputList = $('#ManualInput').val().split('\n');
					inputList.clean("");
					if (inputList.length > 0) {
						if (inputList.length <= $('.editable').length) {
							if (inputList) {
								addPageAlert('info', "Please make a selection of a available space to start pasting.");
							}
							if (inputList.length === $('.editable').length)
								$('.editable')[0].focus();
							$(this).dialog("close");
						} else {
							$('#NoValues').hide();
							$('#MaxFree').text('Warning You have ' + (inputList.length - $('.editable').length) + ' more items than free space available!');
							$('#MaxFree').fadeIn();
						}
					} else {
						$('#MaxFree').hide();
						$('#NoValues').fadeIn();
					}
				},
				"Cancel": function () {
					$(this).dialog("close");
				}
			},
			close: function () {
				$('#MaxFree, #NoValues').hide();		        
				$('#ManualInput').val("");
			}
		});
	};

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


	//TODO:only when you have permissions
	//NOTES: deletable will be the same thing.
	$.fn.storageTable.editable = function () {	    
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