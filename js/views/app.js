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
            this.$form = this.$el.find('form#'+this.name);
            var that = this;
            if (!(this.fields instanceof Array)) {
                throw 'formSchema.Fields should be an array!';
            }
            _.each(this.fields, function(element) {
                element.attributes = element.attributes || {};
                element.options = element.options || {};
                var _htmlTemp, _id = {
                        id: (element.attributes && element.attributes.id) ? element.attributes.id : ((element.name) ? element.name : '')
                    };
                if (typeof element.type === 'undefined') {
                    throw 'Fields requires to have Type property!';
                }
                _htmlTemp = TemplatesLoader.loadTemplate(element.type);
                that.$form.append(_htmlTemp(_.extend(_id, element)));
            });
        }

    });

});