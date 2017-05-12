/* Aspectize JQueryAutoComplete extension */

Aspectize.Extend("JQueryAutoComplete", {
    Properties: { Value: null },
    Events: ['OnValueChanged'],
    Init: function (elem) {

	// Call UI widget initialisation        

        Aspectize.UiExtensions.AddMergedPropertyChangeObserver(elem, function (sender, arg) {

            if ('Value' in arg) {
                // Update value in UI widget
            }

        });

        
    }
});


