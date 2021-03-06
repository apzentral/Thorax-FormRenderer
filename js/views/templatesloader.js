define(['jquery', 'underscore', 'backbone', 'thorax', 'common',
    'text!templates/fields/label.handlebars',
    'text!templates/fields/action.handlebars',
    'text!templates/fields/button.handlebars',
    'text!templates/fields/address.handlebars',
    'text!templates/fields/email.handlebars',
    'text!templates/fields/select.handlebars',
    'text!templates/fields/textarea.handlebars',
    'text!templates/fields/fullname.handlebars',
    'text!templates/fields/number.handlebars',
    'text!templates/fields/default.handlebars'
], function($, _, Backbone, Thorax, Common, labelTmpl, actionTmpl, buttonTmpl, addressTmpl, emailTmpl, selectTmpl, textareaTmpl, fullnameTmpl, numberTmpl, defaultTmpl) {

    /**
     * TemplatesLoader Class
     */

    var templateCaches = [],
        notRenderLabel = ['button', 'action'],
        TemplatesLoader = {

            /**
             * getTemplate will return the correct template to the view
             * @param  {string} templateName
             * @return {function}
             */
            getTemplate: function(templateName, data) {
                data = data || null;
                var _template;
                switch (templateName) {
                    case 'label':
                        _template = labelTmpl;
                        break;
                    case 'action':
                        _template = actionTmpl;
                        break;
                    case 'button':
                        _template = buttonTmpl;
                        break;
                    case 'address':
                        _template = addressTmpl;
                        break;
                    case 'email':
                        _template = emailTmpl;
                        break;
                    case 'select':
                        if (!data.values || typeof data.values !== 'object') {
                            throw 'Select requires to have Values property!';
                        }
                        if (data.values instanceof Array) {
                            data.optionsIsArray = true;
                        }
                        _template = selectTmpl;
                        break;
                    case 'textarea':
                        _template = textareaTmpl;
                        break;
                    case 'fullname':
                        _template = fullnameTmpl;
                        if (typeof data.options.middlename === 'undefined') {
                            data.options.middlename = true;
                        }
                        break;
                    case 'number':
                        _template = numberTmpl;
                        break;
                    default:
                        templateName = 'default';
                        _template = defaultTmpl;
                }
                if (typeof templateCaches[templateName] === 'undefined') {
                    templateCaches[templateName] = Handlebars.compile(_template);
                }
                return templateCaches[templateName];
            },

            /**
             * Check to see if this fields type need to render the label?
             * @param  {String}  type
             * @return {Boolean}
             */
            isRenderLabel: function(type) {
                return (_.indexOf(notRenderLabel, type) === -1);
            }

        };

    return TemplatesLoader;
});