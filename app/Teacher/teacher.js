/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('courseApp.Teacher', [
    'ui.router',
    'courseApp.AppServices',
    'ngAnimate',
    'toastr',
    'ui.grid',
    'ui.bootstrap'
])
    .config( [ '$stateProvider', 'toastrConfig', 'toastrModelProvider',
        function( $stateProvider, toastrConfig, toastrModelProvider ){
            $stateProvider
                .state('teacher', {
                    url: '/teacher/:userId',
                    views: {
                        'navBarView': {
                            templateUrl: 'AppServices/templates/navBar.html',
                            controller: 'navBarController'
                        },
                        'contentView': {
                            templateUrl: 'Teacher/templates/teacherContainer.html',
                            controller: 'teacherContainerController'
                        }
                    }
                })
                .state('teacher.dashboard', {
                    url: '/home',
                    templateUrl: 'Teacher/templates/teacherHome.html',
                    controller: 'teacherHomeController'
                })
                .state('teacher.courses', {
                    url: '/courses',
                    templateUrl: 'Teacher/templates/teacherCourses.html',
                    controller: 'teacherCoursesController'
                })
                .state('teacher.createCourse', {
                    url:'/createCourse',
                    templateUrl: 'Teacher/templates/createEditCourse.html',
                    controller: 'createEditCourseController'
                })
                .state('teacher.editCourse', {
                    url:'/courses/:courseId/edit',
                    templateUrl: 'Teacher/templates/createEditCourse.html',
                    controller: 'createEditCourseController'
                })
                .state('teacher.viewCourse', {
                    url:'/courses/:courseId/view',
                    templateUrl: 'Teacher/templates/viewCourse.html',
                    controller: 'viewCourseController'
                })
                .state('teacher.colleagues', {
                    url:'/colleagues',
                    templateUrl: 'Teacher/templates/teacherColleagues.html',
                    controller: 'teacherColleaguesController'
                })
                .state('teacher.students', {
                    url:'/courses/:courseId/students',
                    templateUrl: 'Teacher/templates/studentsGrid.html',
                    controller: 'courseStudentsController'
                });
                
                
            angular.extend(toastrConfig, toastrModelProvider.getToastConfig());
        }
    ]);
