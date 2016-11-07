//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',
	frameworks: ['jasmine'],
    files: [
	  'assets/lib/jquery.min.js',
      'assets/lib/angular.min.js',
      'assets/lib/angular-route.min.js',
      'assets/lib/angular-mocks.js',
	  'assets/lib/firebase.js',
	  'assets/lib/angularfire.min.js',	  
	  'assets/js/*.js',
	  'config/*.js',
      'unit_tests/*.js',
      'components/*.js',
      'components/*/*.js',
      'shared/*/*.js',
      'https://cdnjs.cloudflare.com/ajax/libs/ngStorage/0.3.6/ngStorage.js',
    ],
	exclude: [
	],
	preprocessors: {	 	
		 'assets/js/site.js' : ['coverage'],		
		 'assets/js/team.js' : ['coverage'],
		 'config/*.js': ['coverage'],
		 'components/**/!(*spec).js': ['coverage'],
		 'shared/**/!(*spec).js': ['coverage'],
	},
	reporters: ['dots', 'coverage'],
	coverageReporter: {
			type: 'html',
			dir: 'coverage/',
			subdir: '.'
	},
	port: 8080,
	colors: true,
    browsers: ['Firefox'],
	browserNoActivityTimeout: 100000,
	singleRun: true,
	autoWatch: false,
    plugins: [
      'karma-chrome-launcher',     
      'karma-firefox-launcher', 
      'karma-jasmine',
	  'karma-coverage'
    ]    

  });
};
