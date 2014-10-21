angular.module('ba.controllers').controller('cmnMetaCtrl', ['$scope', function($scope) {
    'use strict';

    $scope.stylesheets = [
        {href: 'lib/ionic/css/ionic.css', type:'text/css'},
        {href: 'lib/ng-grid/ng-grid.css', type:'text/css'},
        {href: 'css/overrides.css', type:'text/css'},
        {href: 'css/style.css', type:'text/css'}
    ];

}]);