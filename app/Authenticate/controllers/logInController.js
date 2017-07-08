/**
 * Created by Dhanraj Patil on 9/16/2016.
 */

angular.module('courseApp.Authenticate')

    .controller('logInController',[ '$scope', '$state', 'userModel', 'authService', 'toastr',
        function ($scope, $state, userModel, authService, toastr) {
            $scope.context = "LOGIN";
            $scope.user = {
                firstName: "",
                lastName: "",
                emailId: "",
                password: "",
                userRole: "",
                isValidEmail: true
            };
            
            $scope.logIn = function(){                
                if( validate() ){
                    delete $scope.user.isValidEmail;
                    var emailId = $scope.user.emailId;
                    var password = $scope.user.password;
                    userModel.setCurrentUser($scope.user);

                    authService.logIn().$promise.then(
                        function(response){
                            toastr.success(window.navigator.userAgent, 'Authorized');
                            angular.extend( $scope.user, response, { emailId:emailId, password:password } );
                            userModel.setCurrentUser($scope.user);
                            if(response.userRole === "STUDENT"){
                                $state.go('student', {userId: response.userId});
                            }else{
                                $state.go('teacher', {userId: response.userId});
                            }                        
                        },
                        function(){
                            toastr.error('Please Enter Valid Details..!', 'UnAuthorised');
                        }
                    );
                }
            };
            
            function validate(){
                var isValid = true;
                var emailId = $scope.user.emailId;
                var password = $scope.user.password;
                if( emailId === "" || emailId === null){
                    isValid = false;
                    toastr.error('It is mandatory Field!', 'EmailId');
                }
                if( password === "" || password === null){
                    isValid = false;
                    toastr.error('It is mandatory Field!', 'Password');
                }
                if( !$scope.user.isValidEmail ){
                    isValid = false;
                    toastr.error("EmailId does not exist", "Invalid EmailId");
                }
                return isValid;
            }
        }
    ]);
