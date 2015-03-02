/* StorageTables v0.0.2 - Copyright 2015 by Anthony Fassett */
(function ($) {
    "use strict";
    $.fn.storageTable = function (options) {
        var settings = $.extend({
            // These are the defaults.
            dataType: "json",
            data: [],
            editable: false,
            deletable: false,
            inputBy: true,
            focus: false,
            columns: [],
            title: "test"
        }, options);

        if (this.is(':empty') && this.is(':not(table)')) {
             _fnclickListern();
            return this.append(_fnTableTemplate());            
        } else {
            //TODO: attack handlers for ajax calls and other stuff.//Add Inputs on clicks or &nbsp;            
            console.log("It already is a table!");            
            _fnclickListern();
            return this;
        }

        //Editable Templates
        function _fnTableTemplate(head, body) {
            settings.title = typeof settings.title !== 'undefined' ? '<caption>' + settings.title + '</caption>' : "";

            head = typeof head !== 'undefined' ? head : _fnCreateHeader();

            body = typeof body !== 'undefined' ? body : _fnCreateColumn();
            return '<table>' + settings.title + head + body + '</table>';
        }

        $.fn.storageTable.columns = function (template) {
            template = typeof template !== 'undefined' ? template : "";
            _fnCreateColumn();
        };

        function _fnclickListern() {
            //TODO: Make this better!
            $('td:empty').append('<input type="text"/>');
            $(':input').change(function () {

            });
            
        }

        function _fnCreateHeader() {
            var colNum = 10;
            var thead = '<thead><tr>';
            for (var i = 1; i <= colNum; i++) {
                thead += '<th>' + i + '</th>';
            }
            return thead + '</tr></thead>';
        }

        function _fnCreateColumn() {
            var colNum = 10, tbody = '<tbody><tr>';
            //NOTES: Chrome by default wrapping with tbody.
            for (var t = 1; t <= colNum; t++) {
                if (t === 5) {
                    tbody += '<td></td>';
                }                    
                else { 
                    tbody += '<td>' + t + '</td>';
                }
            }
            return tbody + '</tr></tbody>';
        }
    };
}(jQuery));