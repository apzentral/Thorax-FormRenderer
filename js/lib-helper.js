/**
 * Helper Functions
 */
define(['jquery',
    'underscore',
    'datepicker'
], function($, _) {

    var nowTemp = new Date(),
        now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);

    /**
     * Will Parse String (mm/dd/yyyy) to array
     * @param  string str
     * @return array
     */

    function parseDateStringToArray(str) {
        var reggie = /(\d{2})\/(\d{2})\/(\d{4})/;
        return reggie.exec(str);
    }

    function setDatePicker($form, field) {
        var $datepicker, _opts = {}, _dateParameter, _dateArray;
        if (field.validation.maxDate && field.validation.minDate) {
            _opts.onRender = function(date) {
                var _dateParameterMin = (field.validation.minDate === 'today') ? date.valueOf() : null,
                    _dateParameterMax = (field.validation.maxDate === 'today') ? date.valueOf() : null;

                if (!_dateParameterMin) {
                    _dateArray = parseDateStringToArray(field.validation.minDate);
                    _dateParameterMin = new Date(_dateArray[3], _dateArray[1] - 1, _dateArray[2]).valueOf();
                }
                if (!_dateParameterMax) {
                    _dateArray = parseDateStringToArray(field.validation.maxDate);
                    _dateParameterMax = new Date(_dateArray[3], _dateArray[1] - 1, _dateArray[2]).valueOf();
                }
                return (date.valueOf() < _dateParameterMin || _dateParameterMax > now.valueOf()) ? 'disabled' : '';
            };
        } else if (field.validation.maxDate) {
            _opts.onRender = function(date) {
                switch (field.validation.maxDate) {
                    case 'today':
                        _dateParameter = date.valueOf();
                        break;
                    default:
                        _dateArray = parseDateStringToArray(field.validation.maxDate);
                        _dateParameter = new Date(_dateArray[3], _dateArray[1] - 1, _dateArray[2]).valueOf();
                }
                return _dateParameter > now.valueOf() ? 'disabled' : '';
            };
        } else if (field.validation.minDate) {
            _opts.onRender = function(date) {
                switch (field.validation.minDate) {
                    case 'today':
                        _dateParameter = date.valueOf();
                        break;
                    default:
                        _dateArray = parseDateStringToArray(field.validation.minDate);
                        _dateParameter = new Date(_dateArray[3], _dateArray[1] - 1, _dateArray[2]).valueOf();
                }
                return date.valueOf() < _dateParameter ? 'disabled' : '';
            };
        }
        $datepicker = $('#' + field.id, $form).datepicker(_opts)
            .on('changeDate', function(e) {
                $datepicker.hide();
            })
            .data('datepicker');
    }

    return {

        /**
         * If this field type need to activate JavaScript, will call here
         * @param  string str
         * @return string
         */
        attachedJavaScript: function($form, field) {
            if (!field.type) {
                throw 'Function attachedJavaScript, expected Type in an object parameter.';
            }
            switch (field.type) {
                case 'date':
                    setDatePicker($form, field);
                    break;
            }
        },

        mergeValidationToField: function(field, validation) {
            if (!field.name) {
                throw 'Function mergeValidationToField, expected Name in a field parameter.';
            }
            field.validation = (validation[field.name]) ? validation[field.name] : {};
        }
    };
});