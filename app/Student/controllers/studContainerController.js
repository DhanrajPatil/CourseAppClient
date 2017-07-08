/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.Student')

    .controller('studContainerController', [ '$scope', '$state', 'userModel',
        function($scope, $state, userModel){
            /*var displayNames = {
                'dashboard':  'Your Dashboard',
                'courses': 'Your All Courses',
                'createCourse': 'Enter Course Details',
                'editCourse': 'Update Course Details',
                'viewCourse': 'Course Details',
                'colleagues': 'Your All Colleagues',
                'students': 'Your Students of '
            };*/
            function initController(){
                var currentState = $state.current.name;
//                    if( state === 'students'){
//                        var course = courseModel.fetchCurrentCourse();
//                        displayNames[state] = displayNames[state] + course.courseName + ' Course';
//                    }
                $scope.context = currentState.split('.')[1];
                $scope.firstName = userModel.getCurrentUser().firstName;
                $scope.lastName = userModel.getCurrentUser().lastName;
            }
            
            initController();
        }
    ]);