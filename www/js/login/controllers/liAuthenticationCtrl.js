angular.module('ba.controllers')
    .controller('liAuthenticationCtrl', ['$scope', '$translate', 'cmnAuthenticationSvc', '$localStorage', '$cordovaToast', '$state',
        function($scope, $translate, cmnAuthenticationSvc, $localStorage, $cordovaToast, $state) {
            'use strict';

            $scope.viewTitle = $translate.instant('login.TITLE');
            $scope.settingsUri = 'js/settings/partials/setApplication.html';
            $scope.headerUri = 'js/common/partials/cmnHeader.html';
            $scope.user = {};
            $scope.previusUser = {};

            if ($localStorage.cachedCredentials) {
                $scope.user.username = $localStorage.cachedCredentials.username;
                $scope.user.warehouseCode = $localStorage.cachedCredentials.warehouseCode;
            }
            else {
                $localStorage.cachedCredentials = {};
            }

            $scope.login = function (user) {

                $localStorage.cachedCredentials.username = user.username;
                $localStorage.cachedCredentials.warehouseCode = user.warehouseCode;
                var loginPromise = cmnAuthenticationSvc.login(user);
                if (!loginPromise) {
                    if (window.device) {
                        $cordovaToast.show('You need to enter API URL before you can log in.', 'long', 'center');
                    }
                    return;
                }
                loginPromise.then(function () {
                    $state.go('main.home');
                }, function () {
                    if (window.device) {
                        $cordovaToast.show('Something went wrong during log in. Please try again in few moments.', 'long', 'center');
                    }
                });
            };

            $scope.settings = function () {
                $state.go('liApplicationSettings');
            };

            $scope.isUnchanged = function(user) {
                return angular.equals(user, $scope.previusUser);
            };
        }]);