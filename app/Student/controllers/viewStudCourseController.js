/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.Student')
    .controller('viewStudCourseController', [ '$scope', '$state', '$stateParams',
            'studProfessorModel', 'toastr',
        function($scope, $state, $stateParams, studProfessorModel, toastr){
            
            function initController(){
                studCourseId = parseInt($stateParams.studCourseId);
                $scope.studCourse = {};
                fetchCourse(studCourseId);
            }
            
            function fetchCourse(studCourseId){
                var courses = studProfessorModel.getAllCourses();
                var studCourse = {};
                angular.copy(_.find(courses, {'studCourseId':studCourseId}), studCourse);
                
                if( !studCourse ){
                    toastr.error("Course not found for" + studCourseId, "Not Found");
                }else{
                    $scope.startDate = moment(studCourse.startDate).format('DD/MM/YYYY');
                    $scope.endDate = moment(studCourse.endDate).format('DD/MM/YYYY');
                    studCourse.remainingFees = studCourse.fees - studCourse.feesPaid;
                    if( studCourse.courseMarks === -1){
                        studCourse.courseMarks = 'Course Yet To Complete';
                        studCourse.resultStatus = 'Course Yet To Complete';
                    }
                    $scope.studCourse = studCourse;
                }
            }
            
            $scope.go = function( context ){
                if(context === 'all'){
                    $state.go('student.allCourses', {userId: $stateParams.userId});
                }
                else{
                    $state.go('student.studCourses', {userId: $stateParams.userId});
                }
            };
            
            initController();
        }    
    ]);