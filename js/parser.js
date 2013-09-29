define(['jquery', 'underscore'], function($, _) {

    /**
     * Parser Class
     */

    var Parser = {

        /**
         * toLower will convert key of JS Object to lowercase to prevent conflict with case
         * @param  {Object} obj
         * @param  {Array} skipKey
         * @return {Parser}
         */
        toLower: function(obj, skipKey) {
            skipKey = skipKey || [];
            if (!(skipKey instanceof Array)) {
                throw 'Parser.toLower need to pass skipKey as an Array!';
            }
            var that = this,
                _skipKeyLower = _.map(skipKey, function(key) {
                    return key.toLowerCase();
                });
            _.each(obj, function(value, key) {
                var _keyLowerCase = (key.toLowerCase) ? key.toLowerCase() : key;
                if (_keyLowerCase !== key) {
                    if (_.indexOf(_skipKeyLower, _keyLowerCase) === -1) {
                        obj[_keyLowerCase] = obj[key];
                        delete obj[key];
                    } else {
                        _keyLowerCase = key;
                    }
                }
                if (typeof obj[_keyLowerCase] === 'object' && !(_keyLowerCase === 'validation' || _keyLowerCase === 'values')) {
                    if (_.indexOf(_skipKeyLower, _keyLowerCase) === -1) {
                        that.toLower(obj[_keyLowerCase], skipKey);
                    }
                }
                if (_keyLowerCase === 'type') {
                    obj[_keyLowerCase] = obj[_keyLowerCase].toLowerCase();
                    switch (obj[_keyLowerCase]) {
                        case 'textbox':
                            obj[_keyLowerCase] = 'text';
                            break;
                    }
                }
            });
            return this;
        }

    };

    return Parser;
});