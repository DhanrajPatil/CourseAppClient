/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.AppServices')
    .directive('inputPassword', [function() {
        return {
            restrict: 'E',
            scope: {
                inputmodel: '=',
                placeholder: '@',
                iconcolor: '@'
            },
            controller: ['$scope', function($scope) {
                $scope.inputType = "password";
                $scope.eyeClass = "fa fa-eye-slash";
                $scope.iconStyle = { 'color':$scope.iconcolor};
                
                $scope.showHidePassword = function(){
                    if($scope.inputType === "password"){
                        $scope.inputType = "text";
                        $scope.eyeClass = "fa fa-eye";
                    }else{
                        $scope.inputType = "password";
                        $scope.eyeClass = "fa fa-eye-slash"; 
                    }
                };
            }],
            link: function(scope, element){
                
            },
            templateUrl: 'AppServices/templates/input-password.html'
        };
    }]);