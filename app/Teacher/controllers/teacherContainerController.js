/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.Teacher')

    .controller('teacherContainerController', [ '$scope', '$state', 'courseModel', 'userModel', 'studProfessorModel',
        function($scope, $state, courseModel, userModel, studProfessorModel){
            
            var displayNames = {
                'dashboard':  'Your Dashboard',
                'courses': 'Your All Courses',
                'createCourse': 'Enter Course Details',
                'editCourse': 'Update Course Details',
                'viewCourse': 'Course Details',
                'colleagues': 'Your All Colleagues',
                'students': 'Your Students of '
            };
            function initController(){
//                if( userModel.getCurrentUser() === {} || userModel.getCurrentUser().userId === undefined){
//                    userModel.setCurrentUser({});
//                    studProfessorModel.resetModel();
//                    $state.go('authenticate.logIn');
//                }
//                else{
                    var currentState = $state.current.name;
                    var state = currentState.split('.')[1];
                    if( state === 'students'){
                        var course = courseModel.fetchCurrentCourse();
                        displayNames[state] = displayNames[state] + course.courseName + ' Course';
                    }
                    $scope.context = state;
                    $scope.firstName = userModel.getCurrentUser().firstName;
                    $scope.lastName = userModel.getCurrentUser().lastName;
                //}
            }
            
            initController();
        }
    ]);