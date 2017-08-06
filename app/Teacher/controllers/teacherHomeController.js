/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('courseApp.Teacher')

    .controller('teacherHomeController',[ '$scope', '$state', 'studProfessorModel', 'teacherService', 'toastr',
                '$stateParams', 'userModel', 'courseModel',
        function($scope, $state, studProfessorModel , teacherService, toastr, $stateParams, userModel, courseModel){
            $scope.courses = [];
            $scope.colleagues = [];
            
            function initController(){
                var colleagues = studProfessorModel.getAllProfessors();
                if( colleagues === null || colleagues.length === 0 ){
                    extractMyColleagues();
                }
                else{
                    modifyColleaguesArray(colleagues);
                }

                //Extracting Courses
                var courses = studProfessorModel.getAllCourses();
                if( courses === null || courses.length === 0){
                    extractMyCourses();
                }
                else{
                    var teacher = courses[0].teacher;
                    if(teacher.userId !== parseInt($stateParams.userId)){
                        $scope.courses = [];
                        extractMyCourses();
                    }else{
                        $scope.courses = courses.slice(0,5);
                    }
                }
            }
            
            function extractMyCourses(){
                teacherService.getCourses({teacherId: $stateParams.userId}).$promise.then(
                    function(response){
                        response = _.sortBy(response, 'fees').reverse();
                        studProfessorModel.setCourses(response);
                        $scope.courses = response.slice(0,5);
                        toastr.info("Courses Extraction is Done..!", "Teachers Module");
                    },
                    function(){
                        toastr.error("Error Occured during fetching courses", "Teachers Module");
                    }
                );
            }

            function extractMyColleagues(){
                teacherService.getAll().$promise.then(
                    function( colleaguesResponse ){
                        colleaguesResponse = _.sortBy(colleaguesResponse, 'careerStartDate');
                        angular.forEach(colleaguesResponse, function(colleague){
                            colleague.experience = moment(colleague.careerStartDate).fromNow(true);
                        });
                        modifyColleaguesArray(colleaguesResponse);
                        studProfessorModel.setProfessors( colleaguesResponse );
                        toastr.info("Colleagues Extraction is Done..!", "Teachers Module");
                    },
                    function(){
                        toastr.error("Error Occured during fetching colleagues", "Teachers Module");
                    }
                );
            }
            
            function modifyColleaguesArray(colleagues){
                $scope.colleagues = colleagues.slice(0,6);
                $scope.colleagues = _.filter($scope.colleagues, function(colleague){
                    return colleague.userId !== parseInt($stateParams.userId);
                });
                if($scope.colleagues.length === 6){
                    $scope.colleagues = colleagues.slice(0,5);
                }
            }
            
            $scope.showCourseDetail = function(course){
                courseModel.setCurrentCourse(course);
                $state.go('teacher.viewCourse', { userId: $stateParams.userId, courseId: course.courseId});
            };
            
            initController();
        }
    ]);
