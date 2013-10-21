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

        it('should render select with object values', function() {
            var formRender = {
                "Name": "formSchemaKitchenSink",
                "Fields": [{
                    "Name": "Select",
                    "Type": "Select",
                    "Values": {
                        "Option 1 Key": "Option 1",
                        "Option 2 Key": "Option 2"
                    },
                    "Description": "Select"
                }]
            },
                result = '<label for="Select">Select</label><select id="Select" name="Select"><option value="Option 1 Key">Option 1</option><option value="Option 2 Key">Option 2</option></select>';

            Parser.toLower(formRender);

            var app = new App(formRender);
            expect(app.$('#formSchemaKitchenSink').html()).toEqual(result);
        });

        it('should render number type with label', function() {
            var formRender = {
                "Name": "formSchemaKitchenSink",
                "Fields": [{
                    "Name": "Number",
                    "Type": "Number",
                    "Description": "Number"
                }]
            },
                result = '<label for="Number">Number</label><input id="Number" name="Number" type="number">';

            Parser.toLower(formRender);

            var app = new App(formRender);
            expect(app.$('#formSchemaKitchenSink').html()).toEqual(result);
        });

        it('should render number type with label using spinner view', function() {
            // We are using FuelUX for Spinner
            // http://exacttarget.github.io/fuelux/#spinner
            //
            /* Example Mark Up
            <div id="MySpinner" class="spinner">
				<input type="text" class="input-mini spinner-input">
					<div class="spinner-buttons btn-group btn-group-vertical">
						<button type="button" class="btn spinner-up">
							<i class="icon-chevron-up"></i>
						</button>
						<button type="button" class="btn spinner-down">
							<i class="icon-chevron-down"></i>
						</button>
				</div>
			</div>
             */
            var formRender = {
                "Name": "formSchemaKitchenSink",
                "Fields": [{
                    "Name": "Spinner",
                    "Type": "Number",
                    "Description": "Spinner",
                    "Options": {
                        "Spinner": true
                    }
                }]
            },
                result = '<label for="Spinner">Spinner</label><div id="Spinner-spinner" class="spinner"><input id="Spinner" name="Spinner" type="number" class="input-mini spinner-input"><div class="spinner-buttons btn-group btn-group-vertical"><button type="button" class="btn spinner-up"><i class="icon-chevron-up"></i></button><button type="button" class="btn spinner-down"><i class="icon-chevron-down"></i></button></div></div>';

            Parser.toLower(formRender);

            var app = new App(formRender);
            expect(app.$('#formSchemaKitchenSink').html()).toEqual(result);
        });

        it('should render fullname type with label', function() {
            var formRender = {
                "Name": "formSchemaKitchenSink",
                "Fields": [{
                    "Name": "FullName",
                    "Type": "FullName",
                    "Description": "FullName"
                }]
            },
                result = '<label for="FullName">FullName</label><div id="FullName-fullname" class="controls-row"><input id="FullName_fullname_first_name" name="FullName_fullname_first_name" type="text" class="span4 tolowercase toucwords" placeholder="First Name"><input id="FullName_fullname_middle_name" name="FullName_fullname_middle_name" type="text" class="span3 tolowercase toucwords" placeholder="Middle Initial"><input id="FullName_fullname_last_name" name="FullName_fullname_last_name" type="text" class="span5 tolowercase toucwords" placeholder="Last Name"></div>';

            Parser.toLower(formRender);

            var app = new App(formRender);
            expect(app.$('#formSchemaKitchenSink').html()).toEqual(result);
        });

        it('should render fullname type with label without middle name', function() {
            var formRender = {
                "Name": "formSchemaKitchenSink",
                "Fields": [{
                    "Name": "FullName",
                    "Type": "FullName",
                    "Description": "FullName",
                    "Options": {
                        "MiddleName": false
                    }
                }]
            },
                result = '<label for="FullName">FullName</label><div id="FullName-fullname" class="controls-row"><input id="FullName_fullname_first_name" name="FullName_fullname_first_name" type="text" class="span6 tolowercase toucwords" placeholder="First Name"><input id="FullName_fullname_last_name" name="FullName_fullname_last_name" type="text" class="span6 tolowercase toucwords" placeholder="Last Name"></div>';

            Parser.toLower(formRender);

            var app = new App(formRender);
            expect(app.$('#formSchemaKitchenSink').html()).toEqual(result);
        });
    });

});