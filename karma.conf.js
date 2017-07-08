//jshint strict: false
module.exports = function (config) {
    config.set({

        basePath: './app',

        files: [
            './bower_components/angular/angular.js',
            './bower_components/angular-route/angular-route.js',
            './bower_components/angular-resource/angular-resource.min.js',
            './bower_components/angular-base64/angular-base64.min.js',
            './bower_components/angular-mocks/angular-mocks.js',
            './app.js',
            './AppServices/AppServices.js',
            './AppServices/services/userModel.js',
            './AppServices/services/studProfessorModel.js',
            './AppServices/services/test/studProfessorModel.spec.js',
            './AppServices/controllers/*.spec.js',
            './AppServices/directives/*.spec.js',
            './AppServices/filters/*.spec.js',
            './Authenticate/controllers/*.spec.js',
            './Student/controllers/*.spec.js',
            './Teacher/controllers/*.spec.js',
            './Teacher/services/*.spec.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        singleRun: false,

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
