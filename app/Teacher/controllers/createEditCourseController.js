/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.Teacher')
        .controller('createEditCourseController', [ '$scope', '$state', '$stateParams', 'studProfessorModel', 'toastr',
                'courseService', 'userModel', 'courseModel',
            function( $scope, $state, $stateParams, studProfessorModel, toastr, courseService, userModel, courseModel ){

                var courseObj = {
                    id: 1,
                    headingName: "Course1",
                    courseName: "Course1",
                    courseType: "EDUCATION",
                    fees: ""
                };

                var numberOfCourses = 0;
                
                function initController(){
                    $scope.courses = [];
                    setEditCreateConfig(); //  set configuration for edit course screen          
                    setDateConfig();  // Date configs

                    $scope.courseTypes = userModel.getCourseTypes();
                    $scope.teacher = userModel.getCurrentUser();
                }

                $scope.setTabClass = function(courseId){
                    if( $scope.selectedCourse.id === courseId ){
                        return 'in active';
                    }else{
                        return '';
                    }
                };
                
                $scope.setSelectedCourse = function(courseId){
                    _.filter($scope.courses, function(course){
                        if(course.id === courseId){
                            $scope.selectedCourse = course;
                            $scope.startDate = course.startDate;
                            $scope.endDate = course.endDate;
                        }
                    });
                };

                $scope.closeTab = function(id){
                    var courses = _.filter($scope.courses, function(course){
                        return course.id !== id;
                    });
                    $scope.courses = [];
                    angular.copy(courses, $scope.courses);
                    console.log('courses', courses);
                    console.log('scope-courses', $scope.courses);
                };

                $scope.addTab = function(){
                    numberOfCourses++;
                    courseObj.id = numberOfCourses;
                    courseObj.courseName = 'Course' + numberOfCourses;
                    courseObj.headingName = courseObj.courseName;
                    $scope.courses.push( angular.copy(courseObj) );
                };
                
                $scope.clearAllCourses = function(){
                    numberOfCourses = 0;
                    $scope.courses = $scope.courses.map(
                        function(){
                            numberOfCourses++;
                            courseObj.id = numberOfCourses;
                            courseObj.courseName = 'Course' + numberOfCourses;
                            courseObj.headingName = courseObj.courseName;
                            return angular.copy(courseObj);
                        }
                    );
                };
                
                $scope.clearCourse = function(){
                    
                };
                
                $scope.saveAllCourses = function(){                    
                    if( validateAllCourses() ){
                        courseService.saveAll($scope.coursesToSave).$promise.then(
                            function(response){
                                console.log(response);
                                response.forEach(
                                    function(course){
                                        delete course.teacher;
                                        studProfessorModel.addCourse(course);
                                    }
                                );
                                toastr.success("Saved Successfully", "Courses");
                                $state.go('teacher.courses');
                            },
                            function(){
                                toastr.error("Something went wrong while creating Course", "Course");
                            }
                        );
                    }else{
                        $scope.teacher.noOfCoursesThought = $scope.noOfCoursesThought;
                    }
                };
                
                $scope.editCourse = function(){
                    if(validate()){
                        $scope.course.startDate = new Date($scope.startDate);
                        $scope.course.endDate = new Date($scope.endDate);
                        
                        $scope.course.teacher = $scope.teacher;

                        courseService.update($scope.course).$promise.then(
                            function(response){
                                $scope.course.courseId = response.courseId;
                                studProfessorModel.updateCourse($scope.course);
                                toastr.success("Updated Successfully", "Course");
                                $state.go('teacher.viewCourse', { userId: $stateParams.userId,
                                    courseId: $stateParams.courseId});
                            },
                            function(){
                                toastr.error("Something went wrong while updating Course", "Course");
                            }
                        );
                    }
                };
                
                $scope.openEndDatePopUp = function(){
                    $scope.endDatePopUp = true;
                };
                
                $scope.openStartDatePopUp = function(){
                    $scope.startDatePopUp = true;
                };
                
                $scope.$watch('startDate', function(newValue, oldValue){
                    if(newValue && newValue !== oldValue){
                        $scope.selectedCourse.startDate = $scope.startDate;
                        if($scope.endDate){
                            if(newValue > $scope.endDate){
                                $scope.endDate = "";
                            }
                        }
                        var initDate = new Date(newValue);
                        initDate.setDate(newValue.getDate() + 1);
                        $scope.endDateOptions.initDate = $scope.endDateOptions.minDate = initDate;
                    }
                });
                
                $scope.$watch('endDate', function(newValue, oldValue){
                    if(newValue && newValue !== oldValue){
                        $scope.selectedCourse.endDate = $scope.endDate;
                    }
                });
                
                function validateAllCourses() {
                    $scope.noOfCoursesThought = $scope.teacher.noOfCoursesThought;
                    $scope.teacher.noOfCoursesThought += $scope.courses.length;
                    $scope.coursesToSave = [];
                    var notValid = $scope.courses.some( function(course){
                        var tempCourse = {};
                        angular.copy(course, tempCourse);
                        delete tempCourse.headingName;
                        tempCourse.teacher = $scope.teacher;
                        $scope.coursesToSave.push(tempCourse);
                        return !validateCourse(tempCourse);
                    });
                    return !notValid;
                }
                
                function validateCourse(course){
                    var title = "Create Course",
                        isValid = true,
                        msg = "",
                        count = 0;
                    angular.forEach(course, function(value, key){
                        if(value === undefined || value === null || value === ""){
                            count ++;
                            isValid = false;
                            msg = (count === 1) ? key : (msg + ", " + key);
                        }
                    });
                    if(!isValid){
                        msg = (count > 1) ? (msg + " are Empty") : (msg + "is Empty");
                        toastr.error(msg, title);
                    }
                    return isValid;
                }
                
                function setDateConfig(){
                    var minDate = new Date();
                    minDate.setDate(minDate.getDate() + 1);
                    $scope.startDateOptions = {
                        minDate: minDate,
                        startingDay: 1,
                        formatYear: 'yyyy',
                        initDate: minDate
                    };
                    $scope.endDateOptions = {
                        minDate: minDate,
                        startingDay: 1,
                        formatYear: 'yyyy',
                        initDate: minDate
                    };
                    $scope.format = 'dd-MM-yyyy';
                    $scope.endDatePopUp = false;
                    $scope.startDatePopUp = false;
                    $scope.altInputFormats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'dd-MM-yyyy'];
                }
                
                function setEditCreateConfig(){
                    var context = $state.href($state.current.name, $state.params, {absolute: true});
                    if(context.includes('edit')){
                        var courseId = parseInt($stateParams.courseId);
                        $scope.course = {};
                        fetchCourse(courseId);
                        $scope.context = 'EDIT';
                        var currentDate = new Date();
                        $scope.isStudentsApplied = $scope.course.noOfStudents > 0;
                        $scope.isCourseStarted = $scope.course.startDate < currentDate;
                        $scope.isCourseEnded = $scope.course.endDate < currentDate;
                    }else{
                        $scope.courses.push( angular.copy(courseObj) );
                        $scope.context = 'CREATE';
                        $scope.isCourseStarted = false;
                        $scope.isCourseEnded = false;
                    }
                    $scope.selectedCourse = $scope.courses[0];
                    numberOfCourses++;
                }
                
                function fetchCourse(courseId){
                    var course = courseModel.fetchCurrentCourse(courseId);
                    if( !course ){
                        toastr.error("Course not found for courseID", "Not Found");
                    }else{
                        course.headingName = course.courseName;
                        $scope.course = course;                    
                        $scope.courses.push( course );
                        $scope.startDate = new Date(course.startDate);
                        $scope.endDate = new Date(course.endDate);
                    }
                }
                
                initController();
            }
        ]);