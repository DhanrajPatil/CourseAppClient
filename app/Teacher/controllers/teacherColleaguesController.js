/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.Teacher')
        .controller('teacherColleaguesController', [ '$scope', '$state', 'studProfessorModel', 'userModel', 'uiGridConstants',
            function($scope, $state, studProfessorModel, userModel, uiGridConstants){
                
                var columnDefinations = [
                    { 
                        field: 'firstName',
                        width: '12%',
                        minWidth: 135,
                        sort: {
                            direction: uiGridConstants.ASC,
                            priority: 2
                        }
                    },
                    { 
                        field: 'lastName',
                        //name: 'Last Name',
                        width: '12%',
                        minWidth: 130
                    },
                    { 
                        field: 'city',
                        width: '10%',
                        minWidth: 100
                    },
                    { 
                        field: 'dob',
                        name:'Birth Date',
                        width:'12%',
                        minWidth: 130
                    },
                    { 
                        field: 'careerStartDate',
                        type: 'date',
                        name: 'Experience',
                        width: '12%',
                        minWidth: 130,
                        cellTemplate: '<div class="ui-grid-cell-contents">' +
                                '<span> {{row.entity.experience}} </span>' +
                                '</div>'
                    },
                    { 
                        field: 'education',
                        width: '12%',
                        minWidth: 130
                    },
                    { 
                        field: 'noOfCoursesThought',
                        name:'Courses Tought',
                        width:'13%',
                        minWidth: 130,
                        sort: {
                            direction: uiGridConstants.DESC,
                            priority: 1
                        }
                    }
                ];
                
                function initController(){
                    var colleagues  = studProfessorModel.getAllProfessors();
                    var me = userModel.getCurrentUser();
                    $scope.colleagues = _.filter(colleagues, function(colleague){
                        return colleague.userId !== me.userId;
                    });

                    $scope.gridOptions = {
                        enableColumnResizing: false, // to making all columns unresizeable....
                        enableSorting: true, // to disable sorting of all columns 
                        columnDefs: columnDefinations, // all columns defination
                        data: $scope.colleagues
                    };
                }
                initController();
            }
        ]);

