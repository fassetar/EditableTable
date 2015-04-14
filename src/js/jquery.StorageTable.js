/* StorageTables v0.0.2 - Copyright 2015 by Anthony Fassett */
(function ($) {
    "use strict";
    $.fn.storageTable = function (options) {
        var settings = $.extend({
            // These are the defaults.            
            data: [],
            editable: false,
            inputBy: true,
            focus: false,
            columns: [],
            title: "",
            get: ""
        }, options);

        if (this.is(':empty') && this.find(':not(table)')) {
            console.log("Building a Table.");
            if (settings.get)
                _fnPullData(settings.get, function () {                    
                    this.append(_fnTableTemplate());
                    _fnClickListern(this);
                });
            return this;
        } else {
            //TODO: attack handlers for ajax calls and other stuff. 
            //Add Inputs on clicks or &nbsp;
            console.log("It already is a table!");
            _fnClickListern(this);
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

        function _fnPullData(uri) {
            $.getJSON(uri, function (json) {
                settings.data = json;
                console.log(settings.data);
            });
        }

        function _fnClickListern(Obj) {
            //TODO: Make this better!
            $('td:empty').append('<input type="text" data-capture />');
            $(Obj).find('[data-capture]').focus(function () {
                $(this).attr("data-focused", true);
                $(this).change(function () {
                    if (this.value !== "")
                        console.log(this);
                });
            }).blur(function () {
                $(this).removeAttr("data-focused");
            });
        }

        function _fnCreateHeader() {
            var colNum = settings.data.length;
            console.log(colNum);
            var thead = '<thead><tr>';
            for (var i = 1; i <= colNum; i++) {
                thead += '<th>' + settings.data[i] + '</th>';
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