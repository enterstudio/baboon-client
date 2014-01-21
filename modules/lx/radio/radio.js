/*global angular*/
angular.module('lx.radio', ['lx.radio.directives'])
    .controller('lxRadioCtrl', ['$scope', '$window', 'lxTransport', '$routeParams', '$location','$element', function ($scope, $window, transport, $routeParams, $location,$element) {

        $scope.isChecked = false;
        $scope.hasValue = '';
        $scope.isDisabled = false;

        $scope.$watch('hasValue',function(){
            $scope.hasValue = $scope.value
        });

        $scope.$watch('disabled',function(val){
            if(val){
                $scope.isDisabled = true;
            } else {
                $scope.isDisabled = false;
            }
        });

        $scope.$watch('ngModel',function(){
            if($scope.ngModel === $scope.hasValue){
                $scope.isChecked = true;
            } else {
                $scope.isChecked = false;
            }
        });

        $scope.changeState = function(){
            if(!$scope.isDisabled){
                $scope.isChecked=!$scope.isChecked;
                if($scope.isChecked){
                    $scope.ngModel = $scope.hasValue;
                }
            }
        };
    }]);

