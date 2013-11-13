/*global angular*/
angular.module('lx.auth', ['lx.auth.services','lx.auth.directives','lx/auth/tpls/register.html','lx/auth/tpls/forget.html'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/auth/register', {templateUrl: 'lx/auth/tpls/register.html', controller: 'lxAuthRegisterCtrl'});
        $routeProvider.when('/auth/forget', {templateUrl: 'lx/auth/tpls/forget.html', controller: 'lxAuthForgotCtrl'});
        $routeProvider.when('/auth/login', {templateUrl: 'lx/auth/tpls/auth_view.html', controller: 'lxAuthLoginCtrl'});
    }])
    .controller('lxAuthLoginCtrl', ['$scope', '$window', 'lxAuth', '$http', function ($scope, $window, lxAuth, $http) {
        var window = angular.element($window);

        $scope.isAuth = false;
        $scope.user = '';

        $http.get('/api/v1/auth/getAuthData').success(function (data) {
            $scope.user = data.username;
            $scope.isAuth = data.isAuth;
        });

        $scope.$watch('openMenu', function (newval) {
            if (newval) {
                window.bind('keydown', function (ev) {
                    if (ev.which === 27) { //ESC Key
                        $scope.$apply(function () {
                            $scope.openMenu = false;
                        });
                    }
                });
            } else {
                window.unbind('keydown');
            }
        });

        $scope.authFailed = false;
        $scope.serverError = false;
        $scope.openMenu = false;

        $scope.login = function () {

            lxAuth.login($scope.username, $scope.password, function (err, res) {
                if (res && !err) {
                    $window.location.reload();
                }
                else {
                    if (err.status === 403 || err.status === 401) {
                        $scope.authFailed = true;
                    }
                    else {
                        $scope.serverError = true;
                    }
                }
            });
        };

        $scope.$watch('username', function () {
            if ($scope.authFailed) {
                $scope.authFailed = false;
            }
        });

        $scope.$watch('password', function () {
            if ($scope.authFailed) {
                $scope.authFailed = false;
            }
        });
    }])
//    .controller('lxAuthLoginCtrl', ['$scope', 'lxAuth', '$http', function ($scope, $window, lxAuth, $http) {
//
//    }])
    .controller('lxAuthRegisterCtrl', ['$scope', 'lxAuth', '$http', function ($scope, $window, lxAuth, $http) {

        $scope.user = {};

        $scope.register = function() {
            console.log($scope.user);
        };
    }])
    .controller('lxAuthForgotCtrl', ['$scope', 'lxAuth', '$http', function ($scope, $window, lxAuth, $http) {

    }]);
