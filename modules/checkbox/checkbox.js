'use strict';

angular.module('bbc.checkbox', [])
    /**
     * @ngdoc directive
     * @name bbc.checkbox.directive:bbcCheckbox
     * @restrict EA
     *
     * @description
     * Creates a checkbox with same look and feel on all browser.
     *
     * For more information look at the [guide](/checkbox).
     *
     * @param {string} ng-model The binding to a value in scope.
     * @param {string=} ng-checked Checks or unchecks the checkbox element.
     * @param {object=} disabled Set the checkbox element as disabled.
     *
     */
    .directive('bbcCheckbox', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngModel: '=',
                ngChecked: '=',
                disabled: '@'
            },
            template: '<div class="bbc-checkbox" ng-class="{\'disabled\': disabled}">' +
                '<span class="glyphicon"></span>' +
                '</div>',
            link: function (scope, element) {


                scope.$watch('ngChecked', function () {
                    if(scope.ngChecked!==undefined) {
                        element.children('span').toggleClass('glyphicon-ok', scope.ngChecked);
                        scope.ngModel = scope.ngChecked;
                    }
                });

                scope.$watch('ngModel', function () {
                    element.children('span').toggleClass('glyphicon-ok', scope.ngModel);
                });

                if(!scope.disabled) {
                    element.bind('click', function() {
                        element.children('span').toggleClass('glyphicon-ok ', scope.ngModel);
                        if(scope.ngModel!==undefined){
                            scope.ngModel = !scope.ngModel;
                            scope.$apply();
                        }
                    });
                }
            }
        };
    });
