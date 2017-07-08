/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.AppServices')
        .service( 'studProfessorModel', [  
            function (){
                
                var professors = null,
                    courses = null,
                    students = {};
                
                function addCourse(course){
                    courses = (courses !== null && courses !== undefined && Array.isArray(courses)) ? courses : [];
                    courses.push(course);
                }
                
                function updateCourse(courseToUpdate){
                    angular.forEach(courses, function(course, index){
                        if(course.courseId === courseToUpdate.courseId){
                            courses[index] = courseToUpdate;
                        }
                    });
                }
                
                function setCourses(myCourses){
                    courses = [];
                    angular.copy(myCourses, courses);
                    angular.equals(myCourses, courses);
                }
                
                function setProfessors(myProfessors){
                    professors = [];
                    angular.copy(myProfessors, professors);
                }
                
                var getAllProfessors = function(){
                    return professors;
                };
                
                var getAllCourses = function(){
                    return courses;
                };
                
                var resetModel = function(){
                    courses = null;
                    professors = null;
                    students = {};
                };
                
                var getCourseStudents = function(courseId){
                    return students[courseId];
                };
                
                var setCourseStudents = function(courseId, myStudents){
                    angular.copy(students[courseId], myStudents);
                };

                return {
                    setProfessors: setProfessors,
                    setCourses: setCourses,
                    addCourse: addCourse,
                    updateCourse: updateCourse,
                    getAllProfessors: getAllProfessors,
                    getAllCourses: getAllCourses,
                    getCourseStudents: getCourseStudents,
                    setCourseStudents: setCourseStudents,
                    resetModel: resetModel
                };
            }
        ]);