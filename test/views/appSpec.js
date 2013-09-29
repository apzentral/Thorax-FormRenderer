define(['jquery', 'underscore', 'views/app', 'parser'], function($, _, App, Parser) {

    describe('Check Form Markup', function() {

        it('should run with simple form markup', function() {
            var formRender = {
                "Name": "formSchemaKitchenSink",
                "Fields": [{
                    "Name": "TextBox",
                    "Type": "TextBox",
                    "Description": "TextBox"
                }, {
                    "Name": "Hidden",
                    "Type": "Hidden",
                    "Description": "Hidden"
                }, {
                    "Name": "Number",
                    "Type": "Number",
                    "Description": "Number"
                }, {
                    "Name": "Password",
                    "Type": "Password",
                    "Description": "Password"
                }]
            };

            Parser.toLower(formRender);

            var app = new App(formRender);
            expect(app.$el.html()).toEqual('<form id="formSchemaKitchenSink" name="formSchemaKitchenSink" class="form-render" method="post" novalidate=""><input id="TextBox" name="TextBox" type="text"><input id="Hidden" name="Hidden" type="hidden"><input id="Number" name="Number" type="number"><input id="Password" name="Password" type="password"></form>');
        });

        it('should run with simple form markup with attributes', function() {
            var formRender = {
                "Name": "formSchemaKitchenSink",
                "Fields": [{
                    "Name": "TextBox",
                    "Type": "TextBox",
                    "Description": "TextBox",
                    "Attributes": {
                        "class": "span5",
                        "data-text": "test"
                    }
                }]
            };

            Parser.toLower(formRender);

            var app = new App(formRender);
            expect(app.$el.html()).toEqual('<form id="formSchemaKitchenSink" name="formSchemaKitchenSink" class="form-render" method="post" novalidate=""><input id="TextBox" name="TextBox" type="text" class="span5" data-text="test"></form>');
        });

    });

});