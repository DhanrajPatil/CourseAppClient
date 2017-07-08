/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.Student')
    .controller('allCoursesController', [ '$scope', 'toastr', '$uibModal', 'uiGridConstants', 
            'courseService', 'userModel', 'studentService', 'studProfessorModel', '$state',
        function($scope, toastr, $uibModal, uiGridConstants, courseService, userModel,
            studentService, studProfessorModel, $state){
            
            $scope.allCourses = [];                
            var columnDefinations = [
                {
                    field: 'courseName',
                    width: '13%',
                    minWidth: 135,
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 0
                    }
                },
                { 
                    field: 'courseType',
                    width: '13%',
                    minWidth: 135,
                    enableColumnResizing: true // to change inividual column resize property
                },
                { 
                    field: 'fees',
                    width: '10%',
                    minWidth: 100,                        
                    sort: {
                        direction: uiGridConstants.DESC,
                        priority: 1
                    }
                },
                { 
                    field: 'minAdvancedFee',
                    name:'Min Advanced',
                    width:'11%',
                    minWidth: 120                        
                },
                { 
                    field: 'maxStudents',
                    name: 'Capacity',
                    width: '8%',
                    minWidth: 90                        
                },
                { 
                    field: 'minMarksToApply',
                    name: 'Marks Criteria',
                    width: '10%',
                    minWidth: 120                       
                },
                { 
                    field: 'minPassingMarks',
                    name: 'Passing Marks',
                    width: '10%',
                    minWidth: 120                        
                },
                { 
                    field: 'startTime',
                    name:'Start Date',
                    width:'8%',
                    minWidth: 90                        
                },
                { 
                    field: 'endTime',
                    name:'End Date',
                    width:'8%',
                    minWidth: 90                        
                },
                {
                    name: 'Apply',
                    width:'8%',
                    minWidth: 80,
                    cellTemplate: '<div class="ui-grid-cell-contents" title="Apply to Course">' +
                            '<span ng-click="grid.appScope.openApplyToCourseModal(grid, row)">' +
                            '<i class="fa fa-check-square-o" aria-hidden="true"></i> </span>' +
                            '</div>'
                }
            ];
            
            $scope.openApplyToCourseModal = function(grid, row){
                console.log(grid);
                $scope.course = row.entity;
                
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'applyCourse.html',
                    controller: 'applyCourseModalCtrl',
                    resolve: {
                        modalModel:{
                            course: $scope.course.courseName,
                            minAdvancedFee: $scope.course.minAdvancedFee
                        }
                    }
                });

                modalInstance.result.then(
                    applyCourseWithFees,
                    function () {
                        toastr.error('Modal dismissed at: ' + new Date(), 'Modal Dissmis');
                    }
                );
            };
            
            function applyCourseWithFees(fees){
                var studCourse ={
                    joinedOn: new Date(),
                    feesPaid: fees,
                    student: userModel.getCurrentUser(),
                    course: $scope.course,
                    courseMarks: -1
                };
                studentService.applyCourse(studCourse).$promise.then(
                    function(response){
                        angular.extend(response, response.course);
                        delete response.course;
                        studProfessorModel.addCourse(response);
                        toastr.success('Payment Done Succesfully', "Applied to Course");
                    },
                    function(){
                        toastr.error('Error Occured while applying to course', "Apply COurse");
                    }
                );
            }
            
            function initController(){
                setPaginationConfig();
                getCoursesData();

                $scope.courseGridOptions = {
                    enableColumnResizing: false,// to making all columns unresizeable....
                    enableSorting: true, // to disable sorting of all columns 
                    columnDefs: columnDefinations,  // all columns defination
                    data: 'courses'
                };
            }
                        
            function setPaginationConfig(){
                $scope.itemPerPage = 5;
                $scope.pagination = {
                    currentPage: 1,
                    maxSize: 3
                };
            }
            
            function getCoursesData(){
                courseService.getAll().$promise.then(
                    function(response){
                        var oldCourses = $scope.allCourses;
                        angular.forEach(response, function(course){
                            course.startTime = moment(course.startDate).format('DD/MM/YYYY');
                            course.endTime = moment(course.endDate).format('DD/MM/YYYY');
                        });
                        response = _.sortBy(response, 'courseName');
                        $scope.allCourses = response;
                        if( oldCourses !== response){
                            $scope.totalCourses = response.length * 10 / $scope.itemPerPage;
                            $scope.courses = response.slice(($scope.pagination.currentPage - 1) * $scope.itemPerPage,
                                $scope.pagination.currentPage * $scope.itemPerPage);
                        }
                    },
                    function(){
                        $scope.courses = [];
                    }
                );
            }
            
            $scope.$watch('pagination.currentPage', function(newValue, oldValue){
                if( newValue && newValue !== oldValue){
                    $scope.courses = $scope.allCourses.slice((newValue - 1) * $scope.itemPerPage,
                                newValue * $scope.itemPerPage);
                }
            }, true);
             
            initController();
        }
    ]);
    
    