define([
    'jquery',
    'underscore',
    'backbone',
    'thorax',
    'collections/collection',
    'views/templatesloader',
    'text!templates/app.handlebars',
    'common'
], function($, _, Backbone, Thorax, Collection, TemplatesLoader, appTemplate, Common) {

    return Thorax.View.extend({
        // In a require.js application the name is primarily for
        // consistency and debugging purposes
        name: 'app',

        template: Handlebars.compile(appTemplate),

        // Delegated events
        events: {},

        // Setup app view
        initialize: function() {
            this.render();
            this.$form = this.$el.find('form#' + this.name);
            var that = this;
            if (!(this.fields instanceof Array)) {
                throw 'formSchema.Fields should be an array!';
            }
            _.each(this.fields, function(element) {
                element.attributes = element.attributes || {};
                element.options = element.options || {};
                var _htmlTemp, _data =
                        _.extend({
                            id: (element.attributes && element.attributes.id) ? element.attributes.id : ((element.name) ? element.name : ''),
                            attr: ""
                        }, element);
                // Parse Attributes
                _.each(element.attributes, function(value, key) {
                    _data.attr += key.toLowerCase() + '=' + value + ' ';
                });
                if (typeof element.type === 'undefined') {
                    throw 'Fields requires to have Type property!';
                }
                // Render Label
                if (TemplatesLoader.isRenderLabel(element.type)) {
                    _htmlTemp = TemplatesLoader.getTemplate('label');
                    that.$form.append(_htmlTemp(_data));
                }
                // Render Element
                _htmlTemp = TemplatesLoader.getTemplate(element.type, _data);
                that.$form.append(_htmlTemp(_data));
            });
        }

    });

});