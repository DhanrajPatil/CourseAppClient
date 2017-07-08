/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.AppServices')
        .controller('navBarController', ['$scope', '$state', '$timeout', '$stateParams', 'userModel', 'studProfessorModel',
            function($scope, $state, $timeout, $stateParams, userModel, studProfessorModel){
                var menus = {
                    'teacher': {
                        'leftMenu': [
                            {
                                text: "HOME",
                                state: "teacher.dashboard"
                            },
                            {
                                text: "Colleagues",
                                state: "teacher.colleagues"
                            },
                            {
                                text: "Courses",
                                items:[
                                    {
                                        text: "All Courses",
                                        state: "teacher.courses"
                                    },
                                    {
                                        text: "Create Course",
                                        state: "teacher.createCourse"
                                    }
                                ]
                            }
                        ],
                        'rightMenu': {
                            text: "USER",
                            items:[
                                {
                                    text: "Change Password",
                                    state: "teacher.passwordChange"
                                },
                                {
                                    text: "Profile",
                                    state: "teacher.profile"
                                },
                                {
                                    text: "Delete Profile",
                                    state: "teacher.deletProfile"
                                },
                                {
                                    text: "LogOut",
                                    state: "authenticate.logIn"
                                }
                            ]
                        }
                    },
                    'student': {
                        'leftMenu': [
                            {
                                text: "HOME",
                                state: "student.dashboard"
                            },
                            {
                                text: "Teachers",
                                items:[
                                    {
                                        text: "All Teachers",
                                        state: "student.allTeachers"
                                    },
                                    {
                                        text: "My Teachers",
                                        state: "student.myTeachers"
                                    }
                                ]
                            },
                            {
                                text: "Courses",
                                items:[
                                    {
                                        text: "All Courses",
                                        state: "student.allCourses"
                                    },
                                    {
                                        text: "My Courses",
                                        state: "student.studCourses"
                                    }
                                ]
                            }
                        ],
                        'rightMenu': {
                            text: "USER",
                            items:[
                                {
                                    text: "Change Password",
                                    state: "student.passwordChange"
                                },
                                {
                                    text: "Profile",
                                    state: "student.profiles"
                                },
                                {
                                    text: "Delete Profile",
                                    state: "teacher.deletProfile"
                                },
                                {
                                    text: "LogOut",
                                    state: "authenticate.logIn"
                                }
                            ]
                        }
                    },
                    'authenticate': {
                        'leftMenu':[
                            {
                                text: "LogIn",
                                state: "authenticate.logIn"
                            },
                            {
                                text: "SignUp",
                                state: "authenticate.signUp"
                            }
                        ]
                    }
                };

                (function initController(){
                    var currentState = $state.current.name;
                    $scope.currentState = currentState.split('.')[0];
                    $scope.menus = menus[$scope.currentState].leftMenu;
                    $scope.rightMenu = menus[$scope.currentState].rightMenu;
                    
                    if($scope.currentState !== 'authenticate' && (userModel.getCurrentUser() === {} || userModel.getCurrentUser().userId === undefined)){
                        userModel.setCurrentUser({});
                        studProfessorModel.resetModel();
                        $state.go('authenticate.logIn');
                    }else{
                        $scope.firstName = userModel.getCurrentUser().firstName;
                        $timeout(function(){
                            var nextState = $scope.menus[0].state;
                            var activeClass = '.' + $scope.menus[0].text;
                            $state.go(nextState, {userId: $stateParams.userId});
                            $(activeClass).addClass('active');
                        });
                    }
                })();

                $scope.stateChanged = function(menu){
                    if(menu.text === "LogOut"){
                        userModel.setCurrentUser({});
                        studProfessorModel.resetModel();
                        $state.go('authenticate.logIn');
                    }
                    else{
                        $('.active').removeClass('active');
                        var className = '.' + menu.text;
                        $(className).addClass('active');
                    }
                };
            }
        ]);