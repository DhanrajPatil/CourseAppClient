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
                    courseName: "Course1",
                    courseType: "EDUCATION",
                    fees: ""
                };

                var numberOfCourses = 0;
                
                function initController(){
                    if( userModel.getCurrentUser() === {} || userModel.getCurrentUser().userId === undefined){
                        userModel.setCurrentUser({});
                        studProfessorModel.resetModel();
                        $state.go('authenticate.logIn');
                    }
                    else{
                        $scope.courses =[
                            {
                                id: 1,
                                courseName: "Course1",
                                courseType: "EDUCATION",
                                fees: ""
                            }
                        ];
                        numberOfCourses = 1;
                        $scope.selectedCourse = $scope.courses[0];
                        
                        setEditCreateConfig(); //  set configuration for edit course screen          
                        setDateConfig();  // Date configs
                        
                        $scope.courseTypes = userModel.getCourseTypes();
                        $scope.teacher = userModel.getCurrentUser();
                    }
                }

                $scope.setTabClass = function(courseId){
                    if( $scope.selectedCourse.id === courseId ){
                        return 'in active';
                    }else{
                        return '';
                    }
                };

                $scope.closeTab = function(id){
                    $scope.courses = _.filter($scope.courses, function(course){
                        return course.id !== id;
                    });
                };

                $scope.addTab = function(){
                    numberOfCourses++;
                    courseObj.id = $scope.courses.length;
                    courseObj.courseName = 'Course' + numberOfCourses;
                    $scope.courses.push( angular.copy(courseObj) );
                };
                
                $scope.createCourse = function(){
                    if(validate()){                        
                        $scope.course.startDate = new Date($scope.startDate);
                        $scope.course.endDate = new Date($scope.endDate);
                        
                        $scope.teacher.noOfCoursesThought += 1;
                        $scope.course.teacher = $scope.teacher;

                        courseService.create($scope.course).$promise.then(
                            function(response){
                                $scope.course.courseId = response.courseId;
                                studProfessorModel.addCourse($scope.course);
                                toastr.success("Created Successfully", "Course");
                                $state.go('teacher.viewCourse', { userId: $stateParams.userId, 
                                    courseId: response.courseId});                 
                            },
                            function(){
                                toastr.error("Something went wrong while creating Course", "Course");
                            }
                        );
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
                
                function validate(){
                    var title = "Create Course",
                        isValid = true,
                        msg = "",
                        count = 0;
                    angular.forEach($scope.course, function(value, key){
                        if(value === undefined || value === null || value === ""){
                            count ++;
                            isValid = false;
                            msg = (count === 1) ? key : (msg + ", " + key);
                        }
                    });
                    if( !$scope.startDate ){
                        count++;
                        isValid = false;
                        msg = (count === 1) ? "startDate" : (msg + ", " + "startDate");
                    }
                    if( !$scope.endDate ){
                        count++;
                        isValid = false;
                        msg = (count === 1) ? "endDate" : (msg + ", " + "endDate");
                    }
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
                        $scope.context = 'CREATE';
                        $scope.isCourseStarted = false;
                        $scope.isCourseEnded = false;
                    }
                }
                
                function fetchCourse(courseId){
                    $scope.course = courseModel.fetchCurrentCourse(courseId);
                    if( !$scope.course ){
                        toastr.error("Course not found for courseID", "Not Found");
                    }else{
                        $scope.startDate = new Date($scope.course.startDate);
                        $scope.endDate = new Date($scope.course.endDate);
                    }
                }
                
                initController();
            }
        ]);