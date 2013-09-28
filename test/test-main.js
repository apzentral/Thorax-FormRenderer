var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/js',

    paths: {
        jquery: 'lib/jquery/jquery.min',
        underscore: 'lib/underscore/lodash.min',
        backbone: 'lib/backbone/backbone',
        localstorage: 'lib/backbone/localstorage',
        handlebars: 'lib/handlebars/handlebars.min',
        thorax: 'lib/thorax/thorax',
        text: 'lib/require/text'
    },

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

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});