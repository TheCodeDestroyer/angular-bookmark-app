angular.module('ba.controllers').controller('mnHomeCtrl', ['$scope', '$translate', function($scope, $translate) {
    'use strict';

    $scope.viewTitle = $translate.instant('tabs.main.HOME');
    $scope.homeMenuItems = [
    ];

}]);