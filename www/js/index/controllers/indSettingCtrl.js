angular.module('ba.controllers').controller('indSettingCtrl', ['$scope', '$translate', function($scope, $translate) {
    'use strict';

    $scope.viewTitle = $translate.instant('tabs.main.SETTINGS');
    $scope.settingsMenuItems = [
        { title: 'menu.main.settings.APP', icon: 'flaticon-settings', stateUri: 'index.setApplication'},
        { title: 'menu.main.settings.SERVER_CONNECTION', icon: 'flaticon-settings', stateUri: 'index.settings'},
        { title: 'menu.main.settings.PRINTER_SETTINGS', icon: 'flaticon-settings', stateUri: 'index.settings'},
        { title: 'menu.main.settings.MILEAGE_ENTRY', icon: 'flaticon-settings', stateUri: 'index.settings'},
        { title: 'menu.main.settings.WORK_ORDER_SELECTION_METHOD', icon: 'flaticon-settings', stateUri: 'index.settings'},
        { title: 'menu.main.settings.ADD_ASSET_INVENTORY', icon: 'flaticon-settings', stateUri: 'index.settings'}
    ];

}]);