angular.module('ba.controllers').controller('indHomeCtrl', ['$scope', '$translate', function($scope, $translate) {
    'use strict';

    $scope.viewTitle = $translate.instant('tabs.main.HOME');
    $scope.homeMenuItems = [
    ];

}]);