define([
    'jquery',
    'underscore',
    'backbone',
    'thorax',
    'collections/collection',
    'views/templatesloader',
    'text!templates/app.handlebars',
    'common',
    'languages',
    'helper',
    'lib-helper'
], function($, _, Backbone, Thorax, Collection, TemplatesLoader, appTemplate, Common, Languages, Helper, LibHelper) {

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
            // Check default language
            if (!this.language) {
                this.language = 'en';
            }
            this.validation = this.validation || {};
            this.render();
            this.$form = this.$el.find('form#' + this.name);
            var that = this;
            if (!(this.fields instanceof Array)) {
                throw 'formSchema.Fields should be an array!';
            }

            // Logic Flags
            this.initViewLogicFlag();

            _.each(this.fields, function(element) {

                that.checkViewLogicFlag(element);

                if (_.indexOf(Common.fieldNotRequireName, element.type) === -1 && typeof element.name === 'undefined') {
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
                        attr: "",
                        language: Languages[that.language]
                    }, element),
                    $currentHtml = $('<div>', {
                        'class': _data.id + '-wrapper'
                    });
                // Merge Validation to Field
                LibHelper.mergeValidationToField(_data, that.validation);

                // Parse Attributes
                if (element.attributes) {
                    _.each(element.attributes, function(value, key) {
                        _data.attr += key.toLowerCase() + '="' + value + '" ';
                    });
                }

                // Render Label
                if (TemplatesLoader.isRenderLabel(element.type)) {
                    _htmlTemp = TemplatesLoader.getTemplate('label');
                    _currentHtml = Helper.removeWhiteSpace(_htmlTemp(_data));
                    $currentHtml.append(_currentHtml);
                }

                // Render Element
                _htmlTemp = TemplatesLoader.getTemplate(element.type, _data);
                _currentHtml = Helper.removeWhiteSpace(_htmlTemp(_data));

                // Check to make sure to insert to correct location
                that.injectHtmlMarkUp(element, $currentHtml, _currentHtml);

                // Add Input Class for either bootstrap 2 or 3
                if (_data.id) {
                    Helper.addCssClassForInput($('#' + _data.id, $currentHtml), _data, that.bootstrap);
                } else {
                    $currentHtml.removeClass('-wrapper').addClass(_data.type + '-wrapper');
                }

                // Attached JavaScripts to the field
                LibHelper.attachedJavaScript(that.$form, _data);
            });
        },

        /**
         * Init Logic View Variables
         * @return
         */
        initViewLogicFlag: function() {
            this._renderButtonsInAction = false; // If Type "Action" is rendered, all other subsequence buttons will be render in Action container
        },

        /**
         * Check Field Type and update logic view variables
         * @param  {Object} field
         * @return
         */
        checkViewLogicFlag: function(field) {

            switch (field.type) {
                case 'action':
                    this._renderButtonsInAction = true;
                    break;
            }

        },

        injectHtmlMarkUp: function(field, $currentField, htmlString) {
            var $renderElement;
            switch (field.type) {
                case 'button':
                    if (this._renderButtonsInAction) {
                        $renderElement = $('#form-render-actions', this.$el);
                    }
                    break;
            }
            $currentField.append(htmlString);
            if ($renderElement) {
                $currentField.appendTo($renderElement);
            } else {
                this.$form.append($currentField);
            }
        }

    });

});