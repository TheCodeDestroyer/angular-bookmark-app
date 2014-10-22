angular.module('ba.controllers')
    .controller('liAuthenticationCtrl', ['$scope', '$translate', 'cmnAuthenticationSvc', 'cmnIonicHelpersSvc', '$localStorage', '$cordovaToast', '$state',
        function($scope, $translate, cmnAuthenticationSvc, cmnIonicHelpersSvc, $localStorage, $cordovaToast, $state) {
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

                cmnIonicHelpersSvc.showLoading();
                $localStorage.cachedCredentials.username = user.username;
                $localStorage.cachedCredentials.warehouseCode = user.warehouseCode;
                var loginPromise = cmnAuthenticationSvc.login(user);
                if (!loginPromise) {
                    cmnIonicHelpersSvc.hideLoading();
                    cmnIonicHelpersSvc.alert($translate.instant('general.ERROR_TITLE'), $translate.instant('login.API_ERROR'));
                    return;
                }
                loginPromise.then(function () {
                    cmnIonicHelpersSvc.hideLoading();
                    $state.go('main.grid');
                }, function () {
                    cmnIonicHelpersSvc.hideLoading();
                    cmnIonicHelpersSvc.alert($translate.instant('general.ERROR_TITLE'), $translate.instant('general.ERROR_MESSAGE'));
                });
            };

            $scope.settings = function () {
                $state.go('liApplicationSettings');
            };

            $scope.close = function () {
                if (window.Cordova) {
                    navigator.app.exitApp();
                }
            };

            $scope.isUnchanged = function(user) {
                return angular.equals(user, $scope.previusUser);
            };
        }]);