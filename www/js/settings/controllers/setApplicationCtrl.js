angular.module('ba.controllers').controller('setApplicationCtrl', ['$scope', '$translate', '$cordovaDevice', 'cmnSettingsSvc', '$state',
    function($scope, $translate, $cordovaDevice, cmnSettingsSvc, $state) {
        'use strict';

        $scope.viewTitle = $translate.instant('settings.application.TITLE');

        $scope.setAppModel = {};

        $scope.setAppModel.userSettings = cmnSettingsSvc.get();

        $scope.languages = [
            {name: $translate.instant('general.languages.SLOVENIAN'), value: 'sl-SI'},
            {name: $translate.instant('general.languages.ENGLISH'), value: 'en-US'}
        ];

        if (window.device) {
            $scope.deviceData = {
                device : $cordovaDevice.getDevice(),
                cordova : $cordovaDevice.getCordova(),
                model : $cordovaDevice.getModel(),
                platform : $cordovaDevice.getPlatform(),
                uuid : $cordovaDevice.getUUID(),
                version : $cordovaDevice.getVersion()
            };
        }
        else {
            $scope.deviceData = {
                device : 'device',
                cordova : 'cordova',
                model : 'model',
                platform : 'platform',
                uuid : 'uuid',
                version : 'version'
            };
        }

        $scope.saveSettings = function () {
            $translate.use($scope.setAppModel.selectedLanguage);
            cmnSettingsSvc.save($scope.setAppModel.userSettings);
            $state.go('main.grid');
        };

        $scope.setAppModel.selectedLanguage = $scope.languages.filter(function (object) {
            return object.value === $translate.use();
        })[0].value;


    }]);