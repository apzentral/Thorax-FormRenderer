/**
 * Helper Functions
 */
define(['jquery',
    'underscore',
    'datepicker'
], function($, _) {

    function setDatePicker(field) {
      $('#'+field.id).datepicker();
    }

    return {

        /**
         * If this field type need to activate JavaScript, will call here
         * @param  string str
         * @return string
         */
        attachedJavaScript: function(field) {
            if (!field.type) {
                throw 'Function attachedJavaScript, expected Type in an object parameter.';
            }
            switch (field.type) {
              case 'date':
                setDatePicker(field);
                break;
            }
        }
    };
});