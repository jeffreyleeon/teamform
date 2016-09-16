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
      'unit_tests/*.js'	  
    ],
	exclude: [
	],
	preprocessors: {	 	
		 'assets/js/site.js' : ['coverage'],		
		 'assets/js/index.js' : ['coverage'],
		 'assets/js/admin.js' : ['coverage'],
		 'assets/js/team.js' : ['coverage'],
		 'assets/js/member.js' : ['coverage'],
		 'config/*.js': ['coverage']
	},
	reporters: ['progress', 'coverage'],
	coverageReporter: {
			type: 'html',
			dir: 'coverage/',
			subdir: '.'
	},
	port: 8080,
	colors: true,
    browsers: ['Firefox'],
	singleRun: true,
    plugins: [
      'karma-chrome-launcher',     
      'karma-firefox-launcher', 
      'karma-jasmine',
	  'karma-coverage'
    ]    

  });
};
