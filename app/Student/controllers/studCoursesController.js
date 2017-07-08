/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.Student')
    .controller('studCoursesController', [ '$scope', '$state', '$stateParams', 'studProfessorModel', 'uiGridConstants',
        function(  $scope, $state, $stateParams, studProfessorModel, uiGridConstants ){
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
                    field: 'feesPaid',
                    width:'10%',
                    minWidth: 110                        
                },
                { 
                    field: 'remainingFees',
                    width: '8%',
                    minWidth: 90,                        
                    sort: {
                        direction: uiGridConstants.DESC,
                        priority: 0
                    }
                },
                { 
                    field: 'minPassingMarks',
                    name: 'Passing Marks',
                    width: '10%',
                    minWidth: 120                   
                },
                { 
                    field: 'courseMarks',
                    name: 'Marks Obtained',
                    width: '10%',
                    minWidth: 120
                },
                { 
                    field: 'resultStatus',
                    name: 'Result',
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
                    name: 'View',
                    width:'5%',
                    minWidth: 50,
                    cellTemplate: '<div class="ui-grid-cell-contents" title="Edit the Course">' +
                            '<span ng-click="grid.appScope.viewCourse(grid, row)" class="hand-cursor">' +
                                '<i class="fa fa-eye" aria-hidden="true"></i> </span>' +
                            '</div>'
                },
                {
                    name: 'De-Register',
                    width:'5%',
                    minWidth: 50,
                    cellTemplate: '<div class="ui-grid-cell-contents" title="Delete the Course">' +
                            '<span ng-click="grid.appScope.deleteCourse(grid, row)" class="hand-cursor">' +
                                '<i class="fa fa-trash" aria-hidden="true"></i> </span>' +
                            '</div>'
                }
            ];

            $scope.viewCourse = function(grid, row){
                $state.go("student.viewCourse", {userId: $stateParams.userId, studCourseId: row.entity.studCourseId});
            };

            function initController(){
                var courses = [];
                angular.copy(studProfessorModel.getAllCourses(), courses);

                angular.forEach(courses, function(studCourse){
                    studCourse.startTime = moment(studCourse.startDate).format('DD/MM/YYYY');
                    studCourse.endTime = moment(studCourse.endDate).format('DD/MM/YYYY');
                    studCourse.remainingFees = studCourse.fees - studCourse.feesPaid;
                    if( studCourse.courseMarks === -1){
                        studCourse.courseMarks = 'Yet To Complete';
                        studCourse.resultStatus = 'Yet To Complete';
                    }
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