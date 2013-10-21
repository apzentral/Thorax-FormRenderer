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
            },
                result = '<form id="formSchemaKitchenSink" name="formSchemaKitchenSink" class="form-render" method="post" novalidate=""></form>';

            Parser.toLower(formRender);

            var app = new App(formRender);
            app.$('#formSchemaKitchenSink').empty(); // Only Checking for form tag
            expect(app.$el.html()).toEqual(result);
        });

        it('should run with simple textbox field markup with attributes', function() {
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
            },
                result = '<label for="TextBox">TextBox</label><input id="TextBox" name="TextBox" type="text" class="span5" data-text="test">';

            Parser.toLower(formRender);

            var app = new App(formRender);
            expect(app.$('#formSchemaKitchenSink').html()).toEqual(result);
        });

        it('should render select with array values', function() {
            var formRender = {
                "Name": "formSchemaKitchenSink",
                "Fields": [{
                    "Name": "Select",
                    "Type": "Select",
                    "Values": ['Option 1', 'Option 2'],
                    "Description": "Select"
                }]
            },
                result = '<label for="Select">Select</label><select id="Select" name="Select"><option value="Option 1">Option 1</option><option value="Option 2">Option 2</option></select>';

            Parser.toLower(formRender);

            var app = new App(formRender);
            expect(app.$('#formSchemaKitchenSink').html()).toEqual(result);
        });

        // it('should render select with object values', function() {
        //     var formRender = {
        //         "Name": "formSchemaKitchenSink",
        //         "Fields": [{
        //             "Name": "Select",
        //             "Type": "Select",
        //             "Values": {
        //                 "Option 1 Key": "Option 1",
        //                 "Option 2 Key": "Option 2"
        //             },
        //             "Description": "Select"
        //         }]
        //     },
        //     result = '';

        //     Parser.toLower(formRender);

        //     var app = new App(formRender);
        //     expect(app.$el.html()).toEqual(result);
        // });

    });

});