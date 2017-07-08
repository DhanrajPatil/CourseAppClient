/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        package: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: '\n' // define a string to put between each file in the concatenated output
            },
            dist: {
                // the files to concatenate
                src: [
                    'app/app.js',
                    'app/AppServices/*.js',
                    'app/AppServices/controllers/*.js',
                    'app/AppServices/directives/*.js',
                    'app/AppServices/filters/*.js',
                    'app/AppServices/services/*.js',
                    'app/Authenticate/*.js',
                    'app/Authenticate/controllers/*.js',
                    'app/Student/*.js',
                    'app/Student/controllers/*.js',
                    'app/Teacher/*.js',
                    'app/Teacher/controllers/*.js',
                    'app/Teacher/services/*.js'
                ],
                // the location of the resulting JS file
                dest: 'dist/<%= package.name %>.js'
            }
        },

        uglify: {
            options: {
                // the banner is inserted at the top of the output
                banner: '/*! <%= package.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= package.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },

        jshint: {
            // define the files to lint
            files: [
                'Gruntfile.js',
                'app/app.js',
                'app/AppServices/*.js',
                'app/AppServices/controllers/*.js',
                'app/AppServices/directives/*.js',
                'app/AppServices/filters/*.js',
                'app/AppServices/services/*.js',
                'app/Authenticate/*.js',
                'app/Authenticate/controllers/*.js',
                'app/Student/*.js',
                'app/Student/controllers/*.js',
                'app/Teacher/*.js',
                'app/Teacher/controllers/*.js',
                'app/Teacher/services/*.js',
                '!app/**/**/*.spec.js',
            ],
            // configure JSHint (documented at http://www.jshint.com/docs/)
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('build', ['jshint', 'concat', 'uglify']);
};
