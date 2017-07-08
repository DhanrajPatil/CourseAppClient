/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('courseApp.Teacher')
        .controller('viewCourseController', [ '$scope', '$state', '$stateParams', 'studProfessorModel', 
                    'toastr', 'courseModel', 'userModel',
            function( $scope, $state, $stateParams, studProfessorModel, toastr, courseModel, userModel){
                
                function initController(){
                    if( userModel.getCurrentUser() === {} || userModel.getCurrentUser().userId === undefined){
                        userModel.setCurrentUser({});
                        studProfessorModel.resetModel();
                        $state.go('authenticate.logIn');
                    }
                    else{
                        courseId = parseInt($stateParams.courseId);
                        $scope.course = {};
                        fetchCourse(courseId);
                    }
                }
                
                function fetchCourse(courseId){
                    $scope.course = courseModel.fetchCurrentCourse(courseId);
                    $scope.startDate = moment($scope.course.startDate).format('DD/MM/YYYY');
                    $scope.endDate = moment($scope.course.endDate).format('DD/MM/YYYY');
                    
                    $scope.studentState = "teacher.students";
                    $scope.param = {
                        userId: $stateParams.userId,
                        courseId: courseId
                    };
                    
                    if( !$scope.course ){
                        toastr.error("Course not found for courseID", "Not Found");
                    }
                }
                
                $scope.edit = function(){
                    $state.go('teacher.editCourse', {userId: $stateParams.userId, courseId: $stateParams.courseId});
                };
                
                initController();
            }
        ]);


