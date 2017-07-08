/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('courseApp.Teacher')
        .service('courseModel', ['studProfessorModel', 'courseService', 'toastr',
            function(studProfessorModel, courseService, toastr){
                
                var course = null;
                
                function fetchCourse(courseId){
                    var courses = studProfessorModel.getAllCourses();
                    course = _.find(courses, {'courseId':courseId});
                    
                    if( !course ){
                        toastr.error("Course not found for courseID", "Not Found");
                    }else{
                        var students = studProfessorModel.getCourseStudents(courseId);
                        if( !students || students.length === 0){
                            fetchStudentsOfCourse(courseId);
                        }else{
                            course.noOfStudents = students.length;
                        }
                    }
                }
                
                function fetchStudentsOfCourse(courseId){
                    courseService.getStudents( {'courseId':courseId} ).$promise.then( 
                        function(response){
                            course.noOfStudents = response.length;
                            studProfessorModel.setCourseStudents(courseId, response);
                        },
                        function(){
                            toastr.error("Sorry, Unable to Find Students for for this course", "Not Found");
                            course.noOfStudents = "Sorry Error in finding Students for this course";
                        }
                    );
                }
                
                function fetchCurrentCourse(courseId){
                    if(course === null || course.courseId !== parseInt(courseId)){
                        fetchCourse(courseId);
                    }
                    return course;
                }
                
                function setCurrentCourse(myCourse) {
                    angular.copy(myCourse, course);
                }
                
                return {
                    fetchCurrentCourse: fetchCurrentCourse,
                    setCurrentCourse: setCurrentCourse
                };
            }
        ]);
