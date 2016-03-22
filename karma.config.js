// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
          'App_Web/bower_components/jasmine-expect/dist/jasmine-matchers.js',
          'App_Web/bower_components/jquery/dist/jquery.js',
          'App_Web/bower_components/angular/angular.js',
          'App_Web/bower_components/angular-mocks/angular-mocks.js',
          'App_Web/bower_components/angular-resource/angular-resource.js',
          'App_Web/bower_components/angular-cookies/angular-cookies.js',
          'App_Web/bower_components/angular-sanitize/angular-sanitize.js',
          'App_Web/bower_components/lodash/dist/lodash.js',
          'App_Web/bower_components/angular-ui-router/release/angular-ui-router.js',
          'App_Web/bower_components/angular-resource/angular-resource.js',
          'App_Web/bower_components/angular-bootstrap/ui-bootstrap.js',
          'App_Web/bower_components/globalize/dist/globalize.js',
          'App_Web/bower_components/moment/moment.js',
          'App_Web/bower_components/underscore/underscore.js',

          'App_Web/app/app.js',
          'App_Web/app/**/*.js',
          'App_Web/components/**/*.js',
          'App_Web/app/**/*.html',
          'App_Web/components/**/*.html'
        ],

        preprocessors: {
            'App_Web/**/*.html': ['ng-html2js'],
            //Files to generate report coverage
            'App_Web/app/**/!(*spec)!(*spec.mock).js': ['coverage'],
            'App_Web/components/**/!(*spec)!(*spec.mock).js': ['coverage']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'App_Web/'
        },

        ngJade2JsPreprocessor: {
            stripPrefix: 'App_Web/'
        },

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8083,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['PhantomJS'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        //Custom repost configuration Oscar yepes
        reporters: ['progress', 'coverage', 'junit'],
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        junitReporter: {
            outputDir: 'karma-reports', // results will be saved as $outputDir/$browserName.xml
            outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
            suite: '' // suite will become the package name attribute in xml testsuite element
        }
    });
};
