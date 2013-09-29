define(['jquery', 'underscore', 'parser'], function($, _, Parser) {

    describe('Parser Function', function() {

        it('should change JS object key to lowercase (Parser.toLower)', function() {
            var obj = {
                "Action": "test/url",
                "Validation": {
                    "FieldName1": {
                        "required": true,
                    },
                    "FieldName2": {
                        "required": true,
                    }
                },
                "Fileds": [{
                    "Name": "FieldName1",
                    "Type": "TextBox",
                    "Description": "Text Box",
                    "Options": {
                        "VisibleOn": "FieldName2"
                    }
                }, {
                    "Name": "FieldName2",
                    "Type": "FullName",
                    "Description": "Full Name",
                    "Options": {
                        "MiddleName": false
                    }
                }]
            }, expectedObj = {
                    "action": "test/url",
                    "validation": {
                        "FieldName1": {
                            "required": true,
                        },
                        "FieldName2": {
                            "required": true,
                        }
                    },
                    "fileds": [{
                        "name": "FieldName1",
                        "type": "text",
                        "description": "Text Box",
                        "options": {
                            "visibleon": "FieldName2"
                        }
                    }, {
                        "name": "FieldName2",
                        "type": "fullname",
                        "description": "Full Name",
                        "options": {
                            "middlename": false
                        }
                    }]
                };

            Parser.toLower(obj);

            expect(obj).toEqual(expectedObj);
        });

        it('should change JS object key to lowercase but with filter turn on (Parser.toLower)', function() {
            var obj = {
                "Action": "test/url",
                "Validation": {
                    "FieldName1": {
                        "required": true,
                    },
                    "FieldName2": {
                        "required": true,
                    }
                },
                "Fileds": [{
                    "Name": "FieldName1",
                    "Type": "TextBox",
                    "Description": "Text Box",
                    "Options": {
                        "VisibleOn": "FieldName2"
                    }
                }, {
                    "Name": "FieldName2",
                    "Type": "FullName",
                    "Description": "Full Name",
                    "Options": {
                        "MiddleName": false
                    }
                }]
            }, expectedObj = {
                    "action": "test/url",
                    "validation": {
                        "FieldName1": {
                            "required": true,
                        },
                        "FieldName2": {
                            "required": true,
                        }
                    },
                    "Fileds": [{
                        "name": "FieldName1",
                        "type": "text",
                        "description": "Text Box",
                        "options": {
                            "visibleon": "FieldName2"
                        }
                    }, {
                        "name": "FieldName2",
                        "type": "fullname",
                        "description": "Full Name",
                        "options": {
                            "middlename": false
                        }
                    }]
                };

            Parser.toLower(obj, ['Fileds']);

            expect(obj).toEqual(expectedObj);
        });

    });

});