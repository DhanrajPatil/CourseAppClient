/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('courseApp.AppServices')
    .directive('inputEmail', [
        function(){
            return{
                restrict: 'E',
                scope: {
                    emailModel: '=',
                    isValidEmail: '=',
                    placeholder: '@',
                    context: '@',
                    errorMessage: '@'
                },
                controller: [ 'authService', '$scope', function(authService, $scope){
                        
                    $scope.colorClass = '';
                    $scope.green = false;
                    $scope.red = false;
                    
                    $scope.checkEmailId = function(){
                        if($scope.emailModel){
                            authService.emailIdCheck({
                                emailId: $scope.emailModel,
                                context: $scope.context
                            }).$promise.then( function(){
                                $scope.isValidEmail = true;
                                $scope.green = true;
                                $scope.red = false;
                            }, function(){
                                $scope.isValidEmail = false;
                                $scope.green = false;
                                $scope.red = true;
                            });
                        }else{
                            $scope.isValidEmail = false;
                            $scope.green = false;
                            $scope.red = false;
                        }
                    };
                    
                }],
                link: function(scope, element, controller){
                    
                },
                templateUrl: 'AppServices/templates/input-email.html'
            };
        }    
    ]);
