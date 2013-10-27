// Main Config

require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'thorax': {
            deps: [
                'underscore',
                'backbone',
                'jquery',
                'handlebars'
            ],
            exports: 'Thorax'
        }
    },
    paths: {
        jquery: 'lib/jquery/jquery.min',
        underscore: 'lib/underscore/lodash.min',
        backbone: 'lib/backbone/backbone',
        localstorage: 'lib/backbone/localstorage',
        handlebars: 'lib/handlebars/handlebars.min',
        thorax: 'lib/thorax/thorax',
        text: 'lib/require/text',
        datepicker: 'lib/helpers/bootstrap-datepicker'
    }
});

require([
    'views/app',
    'routers/approuter',
    'parser'
], function(AppView, AppRouter, Parser) {

    // Initialize routing and start Backbone.history()
    new AppRouter();

    if (!formSchema) {
        throw 'In order to use FormRenderer, need to pass formSchema object.';
    }

    // Parse Key to Lowercase
    Parser.toLower(formSchema);

    if (!formSchema.el) {
        formSchema.el = '#app-canvas';
    }

    // Initialize the application view
    var view = new AppView(formSchema);

    Backbone.history.start();

});