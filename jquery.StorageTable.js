var editedsamples = new Array(); //Locations of the samples to be saved.
var currentSaved = new Array();
var inputList = new Array(); //Manual Input of sample ids from the dialog box.
Array.prototype.clean = function (deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};
/******  Input Handlers ******/
$("#ListInputDialog").dialog({
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
                    $('#MaxFree').text('Warning You have '+(inputList.length - $('.editable').length)+' more items than free space available!');
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
    close: function () {//Works for both buttons
        $('#NoValues').hide();
        $('#MaxFree').hide();
        $('#ManualInput').val("");
    }
});
/****** List Input Button ******/
$('#btnListInput').click(function () {
    $('#pageAlertsSection').empty();
    $('#ListInputDialog').dialog('open');
    $('#EditableLength').show().text("Free Space(s): " + $('.editable').length);
});
/****** Back/Previous Page Button ******/
$('#bntBack').click(function () {
    if (editedsamples != 0) {
        if (!confirm("You have edits that are not saved are you sure?"))
        { event.preventDefault(); }
    }
});
/****** Save Button ******/
$("#btnSave").click(function (event) {
    event.preventDefault();
    if (editedsamples == 0) {
        alert("You have made no changes!");
    }
    else {
        if (confirm("Are you sure you want to save?")) {
            var edited = new Array();
            var values = new Array();
            var failedvalues = new Array();
            for (var i = 0; i < editedsamples.length; i++) {
                edited.push(editedsamples[i][1]);
            }
            for (var i = 0; i < editedsamples.length; i++) {
                values.push(editedsamples[i][0]);
            }
            var storageItems = {
                "type": $('#UnitType').val(),
                "id": edited,
                "sample": values
            };
            $.ajax({
                type: "POST",
                url: '/Storage/InsertStorageUnitID',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(storageItems),
                cache: false,
                beforeSend: function () { showStandardProcessingDialog(); },
                complete: function (data) {
                    $.unblockUI();
                    $.each(data.responseJSON, function (index, value) {
                        if (value.charAt(0) != 'E') {
                            //Green
                            $('#' + editedsamples[index][1]).css("background-color", "#2DB12D").css("color", "black");
                            $('#' + editedsamples[index][1]).empty().text(value);
                        } else {
                            //Yellow                            
                            $('#' + editedsamples[index][1]).css("background-color", "#EBFF00").css("color", "black");
                            $('#' + editedsamples[index][1]).children('input').val("");
                            failedvalues.push(editedsamples[index][1]);
                            console.error(failedvalues);
                        }
                    });
                    if (failedvalues.length != 0) {
                        addPageAlert('info', 'Warning sample(s)' + failedvalues.toString());
                        console.log(failedvalues);
                        failedvalues = [];
                    }
                    editedsamples = [];
                    GetID();
                }
            });
        }
    }
});
/****** Next Item Button ******/
$('#btnNextItem').click(function () {
    GetID('/Storage/FindNextStorageId/');
    editedsamples = [];
    inputList = [];
});
/****** Start Over/Clear table Button ******/
$('#btnStartOver').click(function () {
    GetID();
    editedsamples = [];
    inputsplit = [];
});
/****** Get Table Data Method ******/
function GetID(URL) {
    $('#pageAlertsSection').empty();
    if (typeof (URL) === 'undefined') {
        URL = '/Storage/GetStorageUnitId/';
    }
    inputList = [];
    $.ajax(
        {
            type: "POST",
            url: URL,
            dataType: 'json',
            cache: false,
            data: { type: $("#UnitType").val(), id: $('#SelectedValue').val() },
            beforeSend: function () { showStandardProcessingDialog(); },
            success: function (data) {
                $.each(data.unitItem, function (key, value) {
                    if (data.unitItem[key].sampleid)
                        currentSaved.push([data.unitItem[key].sampleid, data.unitItem[key].storageunitid]);
                });
                $('#DisplayString').text(data.displayLabel); //Display String for Sample Location
                $('thead').not('tr:first').empty();//Placed here for short appearance change.
                $('tbody').empty();//Shorting the time a Table is Empty.                
                try {
                    $("#SelectedValue").val(data.unitItem[0].parentid);
                } catch (e) {
                    $("#SelectedValue").val("Error");
                }
                if ($('#PrintLabel').attr('href')) {
                    var printurl = $('#PrintLabel').attr('href').substring(0, 53);
                    printurl += $("#SelectedValue").val();
                    $('#PrintLabel').attr('href', printurl);
                }
                var row = '';
                var thead = '<tr><th>&#8195;</th>';
                var column = 8;//minimum number of columns
                if (data.unitItem.length == 72)
                    column = 12;
                else if (data.unitItem.length == 81)
                    column = 9;
                else if (data.unitItem.length == 100)
                    column = 10;
                else if ($("#UnitType").val() == "Tank") {
                    column = 2;
                }
                if ($("#UnitType").val() == "Plate") {
                    column = 12;
                    for (var i = 1; i <= column; i++) {
                        if (data.unitItem[i - 1].storageunitlabel)
                            thead += '<th>' + data.unitItem[i - 1].storageunitlabel + '</th>';
                        else 
                            thead += '<th>' + i + '</th>';
                    }
                } else {
                    for (var i = 1; i <= column; i++) {
                        try{
                            thead += '<th>' + data.unitItem[i - 1].storageunitlabel + '</th>';
                        }
                        catch (ex) {
                            thead += '<th>' + i + '</th>';
                        }
                    }
                }
                thead += '</tr>';
                $('thead').append(thead);

                $.each(data.unitItem, function (key, value) {
                    if (key % column == 0) {
                        if ($("#UnitType").val() == "Plate") {
                            var letter = String.fromCharCode('A'.charCodeAt() + (key / column));
                            row += '<tr><td data-avail="Y">' + data.unitItem[key].storageunitlabel + '</td>';
                        } else
                            row += '<tr><td data-avail="Y">' + data.unitItem[key].storageunitlabel + '</td>';
                    }

                    if (value.sampleid)//case for editable samples!
                        row += '<td data-avail="N" id="' + value.storageunitid + '">' + value.sampleid + '</td>';
                    else {
                        row += '<td data-avail="Y" id="' + value.storageunitid + '">&#8195;<input class="editable" col="' + ((key) % column + 1) + '" type="text" maxlength="11" /></td>';
                        }

                    if ((key + 1) % column == 0) {
                        row += '</tr>';
                    }
                });
                $('table tbody').append(row);
                EditBoxes();
            },
            complete: function () {
                $.unblockUI();
                try {
                    $('.editable').get(0).focus();//Gets focus on page load only.
                } catch (error) {
                    console.log("this table is full!");
                }
            },
            error: function () {
                $.unblockUI();
                alert("There was an error retrieving this sample id!");
            }
        });
};
/****** Edit Box Listener ******/
function EditBoxes() {
    $('.editable').on('focus', function () {
        $(this).parent().css("background-color", "#2DB12D");
        var x = inputList.length;
        if (x == 0) {           
            $(this).one("blur", (function () {
                CheckforDups($(this).val());
                if (/\S/.test($(this).val())) {//This is not Space!!
                   editedsamples.push([$(this).val(), $(this).parent().attr('id')]);
                }
                else {
                    for (var i = 0; i < editedsamples.length; i++) {
                        if ($(this).parent().attr('id') == editedsamples[i][1]) {
                            console.log("NULL", editedsamples[i][1]);
                            editedsamples[i][0] = $(this).val();
                        } else 
                            $(this).parent().css("background-color", "#FFF");
                    }                    
                }
            }));
        } else {
            var currentinput = this;
            $('#pageAlertsSection').empty();
            (function ManualList(x) {
                if (x == 0) {
                    return;
                }
                if ($('#UnitType').val() != "Plate") {
                    $(currentinput).parent().css("background-color", "#2DB12D");
                    $(currentinput).val(inputList[0]);
                   editedsamples.push($(currentinput).parent().attr('id'));
                   var nextinput = inputs.get(inputs.index(currentinput) + 1);
                   if ($(nextinput).attr('class') == 'editable') {
                       inputList.shift();
                       currentinput = nextinput;
                   } 
                } else {
                    $(currentinput).parent().css("background-color", "#2DB12D");
                    $(currentinput).val(inputList[0]);
                    editedsamples.push($(currentinput).parent().attr('id'));

                    var list = $('input[col="' + $(currentinput).attr("col") + '"]');
                    var nextinput = list.get(list.index(currentinput) + 1);
                    inputList.shift();
                    if (typeof nextinput === 'undefined') {
                        list = $('input[col="' + (parseInt($(currentinput).attr("col")) + 1 )+ '"]');
                        nextinput = list[0];
                        currentinput = nextinput;
                    } else {
                        currentinput = nextinput;
                    }
                }
                ManualList(--x);
            })(x);
            EditBoxes();
        }
    });
    var inputs = $(':input').keypress(function (e) {
        if ((e.which == 13) && (!$('#ManualInput').is(":focus"))) {
            e.preventDefault();
            var nextInput = inputs.get(inputs.index(this) + 1);
            if (nextInput) {
                nextInput.focus();
            }
        } else if (e.which == 32 && ($('#ManualInput').is(":focus"))) {
            e.preventDefault();
            $('#ManualInput').get(0).value += '\n';
        }
    });
}
function CheckforDups(insertValue) {
    currentSaved.filter(function (el) {
        if (!!~el.indexOf(String(insertValue))) {
            $('#' + el[1]).css({ "background-color": "#EBFF00", "color": "black" });
        }
    });
    editedsamples.filter(function (el) {
        var temptArray = new Array();
        if (!!~el.indexOf(String(insertValue))) {
            //Check if place isnt the same!
            console.log(el);
            $('#' + el[1]).css({ "background-color": "#EBFF00", "color": "black" }).children("input").val("");
            for (var i = 0; i < editedsamples.length; i++) {
                //Removing Dups in a different places.
                if (editedsamples[i][0] != String(el[0])) {
                    temptArray.push(editedsamples[i]);
                }
            }
            editedsamples = temptArray;
        }
    });
}
