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

        it('should change JS object key to lowercase except Select type with Values that is object (Parser.toLower)', function() {
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
                "Fields": [{
                    "Name": "Select",
                    "Type": "Select",
                    "Values": {
                        "Option 1 Key": "Option 1",
                        "Option 2 Key": "Option 2"
                    },
                    "Description": "Select"
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
                    "fields": [{
                        "name": "Select",
                        "type": "select",
                        "values": {
                            "Option 1 Key": "Option 1",
                            "Option 2 Key": "Option 2"
                        },
                        "description": "Select"
                    }]
                };

            Parser.toLower(obj);

            expect(obj).toEqual(expectedObj);
        });

    });

});