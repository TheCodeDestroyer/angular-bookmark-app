angular.module('ba.controllers').controller('indMainCtrl', ['$scope', '$translate', 'cmnSessionSvc',
    function($scope, $translate, cmnSessionSvc) {
        'use strict';

        $scope.tabsStyleClass = setTabsStyle();
        $scope.tabs = [
            { title: 'tabs.main.HOME', viewName: 'home-tab', htmlUri: 'index/home', icon: 'ion-home' },
            { title: 'tabs.main.SETTINGS', viewName: 'setting-tab', htmlUri: 'index/settings', icon: 'ion-settings' }
        ];
        $scope.homeTitle = $translate.instant('tabs.main.HOME');
        $scope.settingsTitle = $translate.instant('tabs.main.SETTINGS');


        $scope.logout = function () {
            cmnSessionSvc.destroy();
        };

        function setTabsStyle(){
            if (!window.device) {
                return 'tabs-dark';
            }
            else {
                return 'tabs-light';
            }
        }

    }
]);