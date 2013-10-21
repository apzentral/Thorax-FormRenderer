define(['jquery', 'underscore', 'backbone', 'thorax',
    'text!templates/fields/label.handlebars',
    'text!templates/fields/select.handlebars',
    'text!templates/fields/number.handlebars',
    'text!templates/fields/default.handlebars',
], function($, _, Backbone, Thorax, labelTmpl, selectTmpl, numberTmpl, defaultTmpl) {

    /**
     * TemplatesLoader Class
     */

    var templateCaches = [],
        notRenderLabel = ['button'],
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
                    case 'select':
                        if (!data.values || typeof data.values !== 'object') {
                            throw 'Select requires to have Values property!';
                        }
                        if (data.values instanceof Array) {
                            data.optionsIsArray = true;
                        }
                        _template = selectTmpl;
                        break;
                    case 'label':
                        _template = labelTmpl;
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

            isRenderLabel: function(type) {
                return (_.indexOf(notRenderLabel, type) === -1);
            }

        };

    return TemplatesLoader;
});