define(['jquery', 'underscore', 'backbone', 'thorax',
    'text!templates/fields/default.handlebars'
], function($, _, Backbone, Thorax, defaultTmpl) {

    /**
     * TemplatesLoader Class
     */

    var templateCaches = [],
        TemplatesLoader = {

            loadTemplate: function(templateName) {
                var _template;
                switch (templateName) {
                    default: templateName = 'default';
                    _template = defaultTmpl;
                }
                if (typeof templateCaches[templateName] === 'undefined') {
                    templateCaches[templateName] = Handlebars.compile(_template);
                }
                return templateCaches[templateName];
            }

        };

    return TemplatesLoader;
});