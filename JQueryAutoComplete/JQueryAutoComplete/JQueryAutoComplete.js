/* Aspectize JQueryAutoComplete extension */

Aspectize.Extend("JQueryAutoComplete", {
    Properties: { Label: '', Value: null, MultiValue: false, MultiValueSeparator: ',', FillSelected: true, Custom: false },
    Events: ['OnItemSelected', 'OnNeedData', 'OnLabelChanged'],
    Init: function (elem) {

        var first = true;
        var labelPropertyName = 'Label';

        $(elem).autocomplete({
            minLength: 0,
            focus: function () {
                // prevent value inserted on focus
                return false;
            }
        });

        function buildSeparatorSplit(s) {

            var rx = new RegExp(s + '\\s*');

            return function (v) { return v.split(rx); };
        }

        var split = buildSeparatorSplit(',');

        function extractLast(term) {
            return split(term).pop();
        }


        Aspectize.UiExtensions.AddMergedPropertyChangeObserver(elem, function (sender, arg) {

            var multiValue = Aspectize.UiExtensions.GetProperty(elem, 'MultiValue');
            var fillSelected = Aspectize.UiExtensions.GetProperty(elem, 'FillSelected');
            var custom = Aspectize.UiExtensions.GetProperty(elem, 'Custom');


            var reInit = first ? true : false;
            first = false;
            for (var p in arg) {

                switch (p) {

                    case 'MultiValue':
                    case 'Custom':
                    case 'FillSelected': reInit = true; break;

                    case labelPropertyName: $(sender).val(arg[p]); break;

                    case 'MultiValueSeparator':

                        split = buildSeparatorSplit(arg[p]);
                        break;
                }
            }

            if (reInit) {

                var jqVersion = jQuery.fn.jquery;
                var attribute = "autocomplete";

                if (jqVersion >= "1.9") {
                    attribute = "uiAutocomplete"; //ui-autocomplete ?
                }               

                var options = {
                    delay:300,
                    source: function (request, response) {

                        var termValue = multiValue ? extractLast(request.term) : request.term;

                        var data = Aspectize.UiExtensions.ExecuteBoundCommand(elem, 'OnNeedData', { term: termValue });

                        response(data);
                    }
                };

                $(elem).on("blur keyup", function (e) {

                    if (e.type === 'keyup') {
                        if (e.keyCode === 13) {
                            $(elem).autocomplete('close');
                        } else return;
                    }

                    // blur or enter key (13)

                    var v = Aspectize.UiExtensions.GetProperty(elem, labelPropertyName);

                    if (elem.value !== v) {

                        if (custom || (!elem.value && fillSelected)) {

                            Aspectize.UiExtensions.ChangeProperty(elem, labelPropertyName, elem.value);
                            Aspectize.UiExtensions.ChangeProperty(elem, 'Value', null);
                            Aspectize.UiExtensions.Notify(elem, 'OnItemSelected', { IsCustom: true, Item: { label: elem.value, value: null } });

                            if (!fillSelected) elem.value = '';

                        } else elem.value = fillSelected ? v : '';
                    }

                });

                if (multiValue) {
                   
                    options.select = function (event, ui) {

                        if (fillSelected) {
                            var currentValue = Aspectize.UiExtensions.GetProperty(elem, labelPropertyName);
                            var terms = split(currentValue);
                            // remove the current input
                            terms.pop();
                            terms.push(ui.item.label);

                            // add placeholder to get the comma-and-space at the end
                            terms.push("");
                            var s = Aspectize.UiExtensions.GetProperty(elem, 'MultiValueSeparator') + ' ';

                            var newValue = terms.join(s);
                            Aspectize.UiExtensions.ChangeProperty(elem, labelPropertyName, newValue);
                            $(elem).val(newValue);
                            //event.preventDefault();
                            event.stopPropagation();
                        }
                        Aspectize.UiExtensions.Notify(elem, 'OnItemSelected', { IsCustom: false, Item: ui.item });
                        return false;
                    };

                } else {
                    
                    options.select = function (event, ui) {

                        Aspectize.UiExtensions.ChangeProperty(elem, labelPropertyName, ui.item.label);
                        Aspectize.UiExtensions.ChangeProperty(elem, 'Value', ui.item.value);

                        elem.value = fillSelected ? ui.item.label : '';

                        Aspectize.UiExtensions.Notify(elem, 'OnItemSelected', { IsCustom: false, Item: ui.item });
                        return false;
                    };
                }

                var ac = $(elem).autocomplete(options);

                if (jqVersion >= "1.9") {
                    ac.data(attribute)._renderItem = function (ul, item) {
                        var linkValue = '<a class="' + item.type + '">' + item.label + '</a>';

                        if (item.title) {
                            linkValue = '<a class="' + item.type + ' title="' + item.title + '">' + item.label + '</a>';
                        }
                        return $('<li class="ui-menu-item" role="presentation"></li>')
                            .data("item.autocomplete", item)
                            .append(linkValue)
                            .appendTo(ul);
                    };
                }
            }
        });
    }
});



