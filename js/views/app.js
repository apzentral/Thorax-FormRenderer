define([
    'jquery',
    'underscore',
    'backbone',
    'thorax',
    'collections/collection',
    'views/templatesloader',
    'text!templates/app.handlebars',
    'common',
    'helper',
    'lib-helper'
], function($, _, Backbone, Thorax, Collection, TemplatesLoader, appTemplate, Common, Helper, LibHelper) {

    return Thorax.View.extend({
        // In a require.js application the name is primarily for
        // consistency and debugging purposes
        name: 'app',

        template: Handlebars.compile(appTemplate),

        // Delegated events
        events: {},

        // Setup app view
        initialize: function() {
            if (this.name === 'app') {
                throw 'formSchema.Name is not found.';
            }
            // Render Bootstrap version 2 or 3
            if (!this.bootstrap) {
                this.bootstrap = 2;
            } else if (!(this.bootstrap === 2 || this.bootstrap === 3)) {
                throw 'Bootstrap Option can only be version 2 or 3.';
            }
            this.validation = this.validation || {};
            this.render();
            this.$form = this.$el.find('form#' + this.name);
            var that = this;
            if (!(this.fields instanceof Array)) {
                throw 'formSchema.Fields should be an array!';
            }
            _.each(this.fields, function(element) {
                if (typeof element.name === 'undefined') {
                    throw 'Fields requires to have Name property!';
                }
                if (typeof element.type === 'undefined') {
                    throw 'Fields requires to have Type property!';
                }
                element.attributes = element.attributes || {};
                element.options = element.options || {};
                var _htmlTemp, _currentHtml,
                    _data = _.extend({
                        id: (element.attributes && element.attributes.id) ? element.attributes.id : ((element.name) ? element.name : ''),
                        attr: ""
                    }, element),
                    $currentHtml = $('<div>', {
                        'class': _data.id + '-wrapper'
                    });
                // Merge Validation to Field
                LibHelper.mergeValidationToField(_data, that.validation);
                // Parse Attributes
                _.each(element.attributes, function(value, key) {
                    _data.attr += key.toLowerCase() + '=' + value + ' ';
                });
                // Render Label
                if (TemplatesLoader.isRenderLabel(element.type)) {
                    _htmlTemp = TemplatesLoader.getTemplate('label');
                    _currentHtml = Helper.removeWhiteSpace(_htmlTemp(_data));
                    $currentHtml.append(_currentHtml);
                }
                // Render Element
                _htmlTemp = TemplatesLoader.getTemplate(element.type, _data);
                _currentHtml = Helper.removeWhiteSpace(_htmlTemp(_data));
                $currentHtml.append(_currentHtml);

                // Add Input Class for either bootstrap 2 or 3
                Helper.addCssClassForInput($('#' + _data.id, $currentHtml), _data, that.bootstrap);

                // Append jQuery Object to Form
                that.$form.append($currentHtml);
                // Attached JavaScripts to the field
                LibHelper.attachedJavaScript(that.$form, _data);
            });
        }

    });

});