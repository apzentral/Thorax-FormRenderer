/**
 * Helper Functions
 */
define(['jquery', 'underscore'], function($, _) {

    var notAddCssClassForInput = ['button', 'fullname', 'address', 'number'];

    return {

        /**
         * remove all whitespace from given string
         * @param  string str
         * @return string
         */
        removeWhiteSpace: function(str) {
            if (typeof str !== 'string') {
                throw 'Helper::removeWhiteSpace, must pass a string as a parameter.';
            }
            return str.replace(/(\r\n|\n|\r|\t)/gm, '');
        },

        addCssClassForInput: function($input, field, bootstrapVersion) {
            if (_.indexOf(notAddCssClassForInput, field.type) !== -1 || $input.attr('type') === 'hidden') {
                if (field.type === 'number' && !field.options.spinner) {} else {
                    return false;
                }
            }
            switch (bootstrapVersion) {
                case 3: // Version 2
                    break;
                default: // Version 2
                    $input.addClass('span12');
            }
        }
    };
});