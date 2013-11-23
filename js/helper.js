/**
 * Helper Functions
 */
define(['jquery', 'underscore'], function($, _) {

    var notAddCssClassForInput = ['fullname', 'address', 'number', 'action'];

    /**
     * Adding Bootstrap Version Two in a current field
     * @param object $input
     * @param object field
     */

    function addBootstrapTwoClass($input, field) {
        switch (field.type) {
            case 'button':
                $input.addClass('btn');
                break;
            default:
                $input.addClass('span12');
        }
    }

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

        /**
         * Adding current CSS class for current input
         * @param object $input
         * @param object field
         * @param integer bootstrapVersion
         */
        addCssClassForInput: function($input, field, bootstrapVersion) {
            if (_.indexOf(notAddCssClassForInput, field.type) !== -1 || $input.attr('type') === 'hidden') {
                if (field.type === 'number' && !field.options.spinner) {} else {
                    return false;
                }
            }
            switch (bootstrapVersion) {
                case 3: // Version 3
                    break;
                default: // Version 2
                    addBootstrapTwoClass($input, field);
            }
        }
    };
});