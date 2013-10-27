/**
 * Helper Functions
 */
define(['jquery', 'underscore'], function($, _) {
    return {

      /**
       * remove all whitespace from given string
       * @param  string str
       * @return string
       */
      removeWhiteSpace: function (str) {
            if (typeof str !== 'string') {
                  throw 'Helper::removeWhiteSpace, must pass a string as a parameter.';
            }
            return str.replace(/(\r\n|\n|\r|\t)/gm, '');
      }
    };
});