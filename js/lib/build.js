({
  appDir: '../',
  baseUrl: ".",
  dir: '../../dist'
  , modules: [
    { name: 'main' }
  ]
  , shim: {
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
  }
  , paths: {
	jquery: 'lib/jquery/jquery.min',
	underscore: 'lib/underscore/lodash.min',
	backbone: 'lib/backbone/backbone',
	localstorage: 'lib/backbone/localstorage',
	handlebars: 'lib/handlebars/handlebars.min',
	thorax: 'lib/thorax/thorax',
	fuelux: 'lib/fuelux',
	text: 'lib/require/text',
	datepicker: 'lib/helpers/bootstrap-datepicker'
  }
})
