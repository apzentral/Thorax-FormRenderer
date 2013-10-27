/**
 * Note: HTML naming convention will be
 * 1. id
 * 2. name
 * 3. type
 * 4. class
 * 5. placeholder
 * 6. style
 * 7. other attributes
 */
define(['jquery', 'underscore', 'views/app', 'parser'], function($, _, App, Parser) {

    /**
     * Test to check normal HTML Mark Up
     */
    describe('Check Form Markup', function() {


        /**
         * Test Form Markup
         */
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


        /**
         * Test TextBox Markup
         */
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
            expect(app.$('div.TextBox-wrapper').html()).toEqual(result);
        });


        /**
         * Test Select Markup
         */
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
            expect(app.$('div.Select-wrapper').html()).toEqual(result);
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
            expect(app.$('div.Select-wrapper').html()).toEqual(result);
        });


        /**
         * Test Number Markup
         */
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
            expect(app.$('div.Number-wrapper').html()).toEqual(result);
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
            expect(app.$('div.Spinner-wrapper').html()).toEqual(result);
        });


        /**
         * Test FullName Markup
         */
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
            expect(app.$('div.FullName-wrapper').html()).toEqual(result);
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
            expect(app.$('div.FullName-wrapper').html()).toEqual(result);
        });


        /**
         * Test Address Markup
         */
        it('should render address type with label', function() {
            var formRender = {
                "Name": "formSchemaKitchenSink",
                "Fields": [{
                    "Name": "Address",
                    "Type": "Address",
                    "Description": "Address"
                }]
            },
                result = '<label for="Address">Address</label><div id="Address-address" class="address"></div>',
                resultCountry = '<select id="Address_address_country" name="Address_address_country" class="span12"><option value="">-- Please Select Country --</option><option value="US" selected="">United States</option><option value="AF">Afghanistan</option><option value="AX">Aland Islands</option><option value="AL">Albania</option><option value="DZ">Algeria</option><option value="AS">American Samoa</option><option value="AD">Andorra</option><option value="AO">Angola</option><option value="AI">Anguilla</option><option value="AQ">Antarctica</option><option value="AG">Antigua and Barbuda</option><option value="AR">Argentina</option><option value="AM">Armenia</option><option value="AW">Aruba</option><option value="AU">Australia</option><option value="AT">Austria</option><option value="AZ">Azerbaijan</option><option value="BS">Bahamas, The</option><option value="BH">Bahrain</option><option value="BD">Bangladesh</option><option value="BB">Barbados</option><option value="BY">Belarus</option><option value="BE">Belgium</option><option value="BZ">Belize</option><option value="BJ">Benin</option><option value="BM">Bermuda</option><option value="BT">Bhutan</option><option value="BO">Bolivia</option><option value="BA">Bosnia and Herzegovina</option><option value="BW">Botswana</option><option value="BV">Bouvet Island</option><option value="BR">Brazil</option><option value="IO">British Indian Ocean Territory</option><option value="BN">Brunei Darussalam</option><option value="BG">Bulgaria</option><option value="BF">Burkina Faso</option><option value="BI">Burundi</option><option value="KH">Cambodia</option><option value="CM">Cameroon</option><option value="CA">Canada</option><option value="CV">Cape Verde</option><option value="KY">Cayman Islands</option><option value="CF">Central African Republic</option><option value="TD">Chad</option><option value="CL">Chile</option><option value="CN">China</option><option value="CX">Christmas Island</option><option value="CC">Cocos (Keeling) Islands</option><option value="CO">Colombia</option><option value="KM">Comoros</option><option value="CG">Congo</option><option value="CD">Congo, The Democratic Republic Of The</option><option value="CK">Cook Islands</option><option value="CR">Costa Rica</option><option value="CI">Cote D\'ivoire</option><option value="HR">Croatia</option><option value="CY">Cyprus</option><option value="CZ">Czech Republic</option><option value="DK">Denmark</option><option value="DJ">Djibouti</option><option value="DM">Dominica</option><option value="DO">Dominican Republic</option><option value="EC">Ecuador</option><option value="EG">Egypt</option><option value="SV">El Salvador</option><option value="GQ">Equatorial Guinea</option><option value="ER">Eritrea</option><option value="EE">Estonia</option><option value="ET">Ethiopia</option><option value="FK">Falkland Islands (Malvinas)</option><option value="FO">Faroe Islands</option><option value="FJ">Fiji</option><option value="FI">Finland</option><option value="FR">France</option><option value="GF">French Guiana</option><option value="PF">French Polynesia</option><option value="TF">French Southern Territories</option><option value="GA">Gabon</option><option value="GM">Gambia, The</option><option value="GE">Georgia</option><option value="DE">Germany</option><option value="GH">Ghana</option><option value="GI">Gibraltar</option><option value="GR">Greece</option><option value="GL">Greenland</option><option value="GD">Grenada</option><option value="GP">Guadeloupe</option><option value="GU">Guam</option><option value="GT">Guatemala</option><option value="GG">Guernsey</option><option value="GN">Guinea</option><option value="GW">Guinea-Bissau</option><option value="GY">Guyana</option><option value="HT">Haiti</option><option value="HM">Heard Island and the McDonald Islands</option><option value="VA">Holy See</option><option value="HN">Honduras</option><option value="HK">Hong Kong</option><option value="HU">Hungary</option><option value="IS">Iceland</option><option value="IN">India</option><option value="ID">Indonesia</option><option value="IQ">Iraq</option><option value="IE">Ireland</option><option value="IM">Isle Of Man</option><option value="IL">Israel</option><option value="IT">Italy</option><option value="JM">Jamaica</option><option value="JP">Japan</option><option value="JE">Jersey</option><option value="JO">Jordan</option><option value="KZ">Kazakhstan</option><option value="KE">Kenya</option><option value="KI">Kiribati</option><option value="KR">Korea, Republic Of</option><option value="KW">Kuwait</option><option value="KG">Kyrgyzstan</option><option value="LA">Lao People\'s Democratic Republic</option><option value="LV">Latvia</option><option value="LB">Lebanon</option><option value="LS">Lesotho</option><option value="LR">Liberia</option><option value="LY">Libya</option><option value="LI">Liechtenstein</option><option value="LT">Lithuania</option><option value="LU">Luxembourg</option><option value="MO">Macao</option><option value="MK">Macedonia, The Former Yugoslav Republic Of</option><option value="MG">Madagascar</option><option value="MW">Malawi</option><option value="MY">Malaysia</option><option value="MV">Maldives</option><option value="ML">Mali</option><option value="MT">Malta</option><option value="MH">Marshall Islands</option><option value="MQ">Martinique</option><option value="MR">Mauritania</option><option value="MU">Mauritius</option><option value="YT">Mayotte</option><option value="MX">Mexico</option><option value="FM">Micronesia, Federated States Of</option><option value="MD">Moldova, Republic Of</option><option value="MC">Monaco</option><option value="MN">Mongolia</option><option value="ME">Montenegro</option><option value="MS">Montserrat</option><option value="MA">Morocco</option><option value="MZ">Mozambique</option><option value="MM">Myanmar</option><option value="NA">Namibia</option><option value="NR">Nauru</option><option value="NP">Nepal</option><option value="NL">Netherlands</option><option value="AN">Netherlands Antilles</option><option value="NC">New Caledonia</option><option value="NZ">New Zealand</option><option value="NI">Nicaragua</option><option value="NE">Niger</option><option value="NG">Nigeria</option><option value="NU">Niue</option><option value="NF">Norfolk Island</option><option value="MP">Northern Mariana Islands</option><option value="NO">Norway</option><option value="OM">Oman</option><option value="PK">Pakistan</option><option value="PW">Palau</option><option value="PS">Palestinian Territories</option><option value="PA">Panama</option><option value="PG">Papua New Guinea</option><option value="PY">Paraguay</option><option value="PE">Peru</option><option value="PH">Philippines</option><option value="PN">Pitcairn</option><option value="PL">Poland</option><option value="PT">Portugal</option><option value="PR">Puerto Rico</option><option value="QA">Qatar</option><option value="RE">Reunion</option><option value="RO">Romania</option><option value="RU">Russian Federation</option><option value="RW">Rwanda</option><option value="BL">Saint Barthelemy</option><option value="SH">Saint Helena</option><option value="KN">Saint Kitts and Nevis</option><option value="LC">Saint Lucia</option><option value="MF">Saint Martin</option><option value="PM">Saint Pierre and Miquelon</option><option value="VC">Saint Vincent and The Grenadines</option><option value="WS">Samoa</option><option value="SM">San Marino</option><option value="ST">Sao Tome and Principe</option><option value="SA">Saudi Arabia</option><option value="SN">Senegal</option><option value="RS">Serbia</option><option value="SC">Seychelles</option><option value="SL">Sierra Leone</option><option value="SG">Singapore</option><option value="SK">Slovakia</option><option value="SI">Slovenia</option><option value="SB">Solomon Islands</option><option value="SO">Somalia</option><option value="ZA">South Africa</option><option value="GS">South Georgia and the South Sandwich Islands</option><option value="ES">Spain</option><option value="LK">Sri Lanka</option><option value="SR">Suriname</option><option value="SJ">Svalbard and Jan Mayen</option><option value="SZ">Swaziland</option><option value="SE">Sweden</option><option value="CH">Switzerland</option><option value="TW">Taiwan</option><option value="TJ">Tajikistan</option><option value="TZ">Tanzania, United Republic Of</option><option value="TH">Thailand</option><option value="TL">Timor-leste</option><option value="TG">Togo</option><option value="TK">Tokelau</option><option value="TO">Tonga</option><option value="TT">Trinidad and Tobago</option><option value="TN">Tunisia</option><option value="TR">Turkey</option><option value="TM">Turkmenistan</option><option value="TC">Turks and Caicos Islands</option><option value="TV">Tuvalu</option><option value="UG">Uganda</option><option value="UA">Ukraine</option><option value="AE">United Arab Emirates</option><option value="GB">United Kingdom</option><option value="UM">United States Minor Outlying Islands</option><option value="UY">Uruguay</option><option value="UZ">Uzbekistan</option><option value="VU">Vanuatu</option><option value="VE">Venezuela</option><option value="VN">Vietnam</option><option value="VG">Virgin Islands, British</option><option value="VI">Virgin Islands, U.S.</option><option value="WF">Wallis and Futuna</option><option value="EH">Western Sahara</option><option value="YE">Yemen</option><option value="ZM">Zambia</option><option value="ZW">Zimbabwe</option></select>',
                resultStreet = '<input id="Address_address_street" name="Address_address_street" type="text" class="span12 tolowercase toucwords" placeholder="Street">',
                resultCityState = '<input id="Address_address_city" name="Address_address_city" type="text" class="span6 tolowercase toucwords" placeholder="City"><select id="Address_address_state_select" name="Address_address_state" class="span6"><option value="">--Select State--</option><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="DC">District of Columbia</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV" selected="">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select><input id="Address_address_state_input" name="Address_address_state" type="text" class="span6" placeholder="State/Province/Region" style="display:none" disabled="">',
                resultZip = '<input id="Address_address_zip" maxlength="5" name="Address_address_zip" type="text" class="span6" placeholder="ZIP/Postal Code">';

            Parser.toLower(formRender);

            var app = new App(formRender);
            expect(app.$('.address-country').html()).toEqual(resultCountry);
            expect(app.$('.address-street').html()).toEqual(resultStreet);
            expect(app.$('.address-city-state').html()).toEqual(resultCityState);
            expect(app.$('.address-zip').html()).toEqual(resultZip);
            app.$('#Address-address').empty();
            expect(app.$('div.Address-wrapper').html()).toEqual(result);
        });


        /**
         * Test Email Markup
         */
        it('should render email type with label', function() {
            var formRender = {
                "Name": "formSchemaKitchenSink",
                "Fields": [{
                    "Name": "YourEmail",
                    "Type": "Email",
                    "Description": "Your Email"
                }]
            },
                resultLabel = '<label for="YourEmail">Your Email</label>',
                resultInput = '<input id="YourEmail" name="YourEmail" type="email">';

            Parser.toLower(formRender);

            var app = new App(formRender);
            expect(app.$('div.YourEmail-wrapper').html()).toContain(resultLabel);
            expect(app.$('div.YourEmail-wrapper').html()).toContain(resultInput);
        });

        it('should render email type with label and Options AutoComplete to false', function() {
            var formRender = {
                "Name": "formSchemaKitchenSink",
                "Fields": [{
                    "Name": "YourEmail",
                    "Type": "Email",
                    "Description": "Your Email",
                    "Options": {
                        "AutoComplete": false
                    }
                }]
            },
                resultLabel = '<label for="YourEmail">Your Email</label>',
                resultInput = '<input id="YourEmail" name="YourEmail" type="email">';

            Parser.toLower(formRender);

            var app = new App(formRender);
            expect(app.$('div.YourEmail-wrapper').html()).toContain(resultLabel);
            expect(app.$('div.YourEmail-wrapper').html()).toContain(resultInput);
        });

        it('should render email type with label and Options AutoComplete to true', function() {
            /* - Example Markup
                <label for="YourEmail">Your Email</label>
                <div class="controls-row emailpicker">
                    <input id="YourEmail_username" name="YourEmail_username" type="text" class="not-sending emailpicker-username tolowercase" placeholder="username" style="width: 45%;">
                    <span class="add-on">@</span>
                    <input id="YourEmail_server" name="YourEmail_server" type="text" class="not-sending emailpicker-server tolowercase" placeholder="example.com" style="width:45%;" autocomplete="off" data-provide="typeahead">
                    <input id="YourEmail" name="YourEmail" type="hidden" class="tolowercase" value="">
                </div>
             */
            var formRender = {
                "Name": "formSchemaKitchenSink",
                "Fields": [{
                    "Name": "YourEmail",
                    "Type": "Email",
                    "Description": "Your Email",
                    "Options": {
                        "AutoComplete": true
                    }
                }]
            },
                resultContainer = '<div class="controls-row emailpicker"></div>',
                resultLabel = '<label for="YourEmail">Your Email</label>',
                resultInputUsername = '<input id="YourEmail_username" name="YourEmail_username" type="text" class="not-sending emailpicker-username tolowercase" placeholder="username" style="width: 45%;">',
                resultInputSpan = '<span class="add-on">@</span>',
                resultInputServer = '<input id="YourEmail_server" name="YourEmail_server" type="text" class="not-sending emailpicker-server tolowercase" placeholder="example.com" style="width:45%;" autocomplete="off" data-provide="typeahead">',
                resultInputHiddenInput = '<input id="YourEmail" name="YourEmail" type="hidden" class="tolowercase" value="">';

            Parser.toLower(formRender);

            var app = new App(formRender);
            // Check each elements
            expect(app.$('div.YourEmail-wrapper').html()).toContain(resultLabel);
            expect(app.$('div.YourEmail-wrapper').html()).toContain(resultInputUsername);
            expect(app.$('div.YourEmail-wrapper').html()).toContain(resultInputSpan);
            expect(app.$('div.YourEmail-wrapper').html()).toContain(resultInputServer);
            expect(app.$('div.YourEmail-wrapper').html()).toContain(resultInputHiddenInput);

            // Check Container
            app.$('div.controls-row.emailpicker').empty();
            expect(app.$('div.YourEmail-wrapper').html()).toContain(resultContainer);
        });

    });

});