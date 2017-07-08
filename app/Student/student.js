/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.Student', [
    'ui.router',
    'courseApp.AppServices',
    'ui.bootstrap',
    'ui.grid',
    'ngAnimate',
    'toastr'
])

    .config( [ '$stateProvider',
        function($stateProvider){
            $stateProvider
                .state('student', {
                    url: '/student/:userId',
                    views: {
                        'navBarView': {
                            templateUrl: 'AppServices/templates/navBar.html',
                            controller: 'navBarController'
                        },
                        'contentView': {
                            templateUrl: 'Student/templates/studContainer.html',
                            controller: 'studContainerController'
                        }
                    }
                })
                .state('student.dashboard', {
                    url: '/home',
                    templateUrl: 'Student/templates/studHome.html',
                    controller: 'studHomeController'
                })
                .state('student.allCourses', {
                    url: '/allCourses',
                    templateUrl: 'Student/templates/allCourses.html',
                    controller: 'allCoursesController'
                })
                .state('student.studCourses', {
                    url: '/myCourses',
                    templateUrl: 'Student/templates/studCourses.html',
                    controller: 'studCoursesController'
                })
                .state('student.viewCourse', {
                    url: '/studCourses/:studCourseId/view',
                    templateUrl: 'Student/templates/viewStudCourse.html',
                    controller: 'viewStudCourseController'
                });
        }
    ]);

