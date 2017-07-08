    /**
     * Created by Dhanraj Patil on 9/16/2016.
     */

    angular.module('courseApp.Authenticate')

    .controller('signUpController',[ '$scope', '$state', 'userModel', 'authService', 'toastr',
        function ($scope, $state, userModel, authService, toastr) {
            $scope.context = "SIGNUP";
            $scope.user = {
                firstName : '',
                lastName : '',
                emailId : '',
                password : '',
                userRole : 'STUDENT',
                isValidEmail: true
            };
            $scope.confirmPassword = "";
            
            $scope.signUp = function(){       
                if( validateUser() ){ 
                    delete $scope.user.isValidEmail;
                    var emailId = $scope.user.emailId;
                    var password = $scope.user.password;
                    userModel.setCurrentUser($scope.user);
                    $scope.user.emailId = "";
                    $scope.user.password = "";
                    
                    authService.signUp($scope.user).$promise.then(
                        function(response){
                            toastr.success("Account Created Successfully", "USER");
                            angular.extend( $scope.user, response, { emailId:emailId, password:password } );
                            userModel.setCurrentUser($scope.user);
                            if($scope.user.userRole === "STUDENT"){
                                $state.go('student', {userId: response.userId});
                            }else{
                                $state.go('teacher', {userId: response.userId});
                            }                        
                        },
                        function(){
                            toastr.error("Server Got Error while creating Account. Try Again..!", "Sign Up");
                        }
                    );
                }
            };
            
            function validateUser(){
                var isValid = true,
                   title = "Fill Mandatory Feilds",
                   msg = "",
                   count = 0;
                angular.forEach($scope.user, function(val, key){
                    if(val === null || val === undefined || val === ""){
                        count++;
                        msg = (count === 1) ? key : (msg + ", " +key);
                        isValid = false;
                    }
                });
                
                if( $scope.confirmPassword !== $scope.user.password){
                    toastr.error("Both Password must be same", "Confirm Password");
                }
                if( !$scope.user.isValidEmail ){
                    toastr.error("EmailId is already Exit..! Please Try Other..! ", "Invalid EmailId");
                }
                if(!isValid){
                    msg = (count > 1) ? (msg + " are Empty") : (msg + "is Empty");
                    toastr.error(msg, title);
                }
                return isValid;
            }
            
            $scope.userRoles = userModel.getUserTypes($scope.context);
        }
    ]);