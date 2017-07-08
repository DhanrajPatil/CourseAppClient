/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('courseApp.Student')

    .controller('studHomeController',[ '$scope', '$state', '$stateParams', 'studProfessorModel',
            'studentService', 'toastr',
        function($scope, $state, $stateParams, studProfessorModel, studentService, toastr){
            
            $scope.professors = [];
            $scope.courses = [];

            function initController(){
                // Extracting expensive 5 courses of student
                courses = studProfessorModel.getAllCourses();
                if(courses === null || courses.length === 0){
                    extractCourses();
                }
                else{
                    $scope.courses =  courses.slice(0,5);
                }

                //extracting 5 professors
                professors = studProfessorModel.getAllProfessors();
                if(professors === null || professors.length === 0){
                    extractProfessors(courses);
                }
                else{
                    $scope.professors = professors.slice(0, 5);
                }
            }
            
            function extractCourses(){
                studentService.getCourses({ studentId: $stateParams.userId}).$promise.then(
                    function(response){
                        response = modifyCourses(response);
                        response = _.sortBy(response, 'fees').reverse();
                        extractProfessors(response);
                        studProfessorModel.setCourses(response);
                        $scope.courses = response.slice(0,5);
                    },
                    function(){
                        toastr.error("Courses Extraction is Failed..!", "Student Module");
                    }
                );
            }
            
            function modifyCourses(studCourses){
                angular.forEach(studCourses, function(studCourse){
                    angular.extend(studCourse, studCourse.course);
                    delete studCourse.course;
                });
                return studCourses;
            }
            
            function extractProfessors(studCourses){
                $scope.professors = [];                
                angular.forEach(studCourses, function(studCourse){
                    studCourse.teacher.experience = moment(studCourse.teacher.careerStartDate).fromNow(true);
                    if( !_.contains($scope.professors, studCourse.teacher ) ){
                        $scope.professors.push(studCourse.teacher);
                    }
                });
                $scope.professors = _.sortBy($scope.professors, 'careerStartDate');
                studProfessorModel.setProfessors($scope.professors);
                $scope.professors = $scope.professors.slice(0, 5);
            }
            
            $scope.showCourseDetail = function(course){
                $state.go('student.viewCourse', { userId: $stateParams.userId, studCourseId: course.studCourseId});
            };
            
            initController();
        }
    ]);
