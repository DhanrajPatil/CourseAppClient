/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('courseApp.Student')
    .controller('applyCourseModalCtrl', [ 'modalModel', '$uibModalInstance', '$scope',
        function( modalModel, $uibModalInstance, $scope ){
            $scope.course = modalModel;
            $scope.inValidFees = false;
            $scope.feesPaid = $scope.course.minAdvancedFee;
            
            $scope.payFeesAndApply = function(){
                if( $scope.course.minAdvancedFee > $scope.feesPaid){
                    $scope.inValidFees = true;
                }else{
                    $uibModalInstance.close($scope.feesPaid);
                }
            };
            
            $scope.feesChanged = function(){
                $scope.inValidFees = $scope.course.minAdvancedFee > $scope.feesPaid ? true : false;
            };
            
            $scope.cancel = function(){
                $uibModalInstance.dismiss('cancel');
            };
        }
    ]);