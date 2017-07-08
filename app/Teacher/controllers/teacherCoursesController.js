/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('courseApp.Teacher')

        .controller('teacherCoursesController', [ '$scope', 'studProfessorModel', '$state', 'uiGridConstants', '$stateParams',
            function( $scope, studProfessorModel, $state, uiGridConstants, $stateParams){
                $scope.courses = [];
                
                var columnDefinations = [
                    {
                        field: 'courseName',
                        width: '11%',
                        minWidth: 120,
                        sort: {
                            direction: uiGridConstants.ASC,
                            priority: 1
                        }
                    },
                    { 
                        field: 'courseType',
                        width: '10%',
                        minWidth: 120,
                        enableColumnResizing: true // to change inividual column resize property
                    },
                    { 
                        field: 'fees',
                        width: '8%',
                        minWidth: 90,                        
                        sort: {
                            direction: uiGridConstants.DESC,
                            priority: 0
                        }
                    },
                    { 
                        field: 'minAdvancedFee',
                        name:'Min Advanced',
                        width:'10%',
                        minWidth: 110                        
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
                        type: 'date',
                        width:'8%',
                        minWidth: 90                        
                    },
                    { 
                        field: 'endTime',
                        name:'End Date',
                        type: 'date',
                        width:'8%',
                        minWidth: 90                        
                    },
                    {
                        name: 'Edit',
                        width:'5%',
                        minWidth: 50,
                        cellTemplate: '<div class="ui-grid-cell-contents" title="Edit the Course">' +
                                '<span ng-click="grid.appScope.editCourse(grid, row)" class="hand-cursor">' +
                                    '<i class="fa fa-pencil-square-o" aria-hidden="true"></i> </span>' +
                                '</div>'
                    },
                    {
                        name: 'Delete',
                        width:'5%',
                        minWidth: 50,
                        cellTemplate: '<div class="ui-grid-cell-contents" title="Delete the Course">' +
                                '<span ng-click="grid.appScope.deleteCourse(grid, row)" class="hand-cursor">' +
                                    '<i class="fa fa-trash" aria-hidden="true"></i> </span>' +
                                '</div>'
                    }
                ];
                
                $scope.editCourse = function(grid, row){
                    $state.go("teacher.editCourse", {userId: $stateParams.userId, courseId: row.entity.courseId});
                };
                
                function initController(){
                    var courses = [];
                    angular.copy(studProfessorModel.getAllCourses(), courses);
                    
                    angular.forEach(courses, function(course){
                        course.startTime = moment(course.startDate).format('DD/MM/YYYY');
                        course.endTime = moment(course.endDate).format('DD/MM/YYYY');
                    });
                    
                    $scope.gridOptions = {
                        enableColumnResizing: false, // to making all columns unresizeable....
                        enableSorting: true, // to disable sorting of all columns 
                        columnDefs: columnDefinations,  // all columns defination
                        data: courses
                    };
                }
                
                initController();
            }
        ]);