angular.module('ba.services').factory('cmnAuthenticationSvc', ['$http', 'cmnSessionSvc', 'cmnSettingsSvc', function($http, cmnSessionSvc, cmnSettingsSvc){
    'use strict';

    function login(credentials) {

        var settings = cmnSettingsSvc.get();
        var apiUrl = settings.apiUrl;

        if (!apiUrl && apiUrl === '') {
            return undefined;
        }

        return $http
            .post(apiUrl + '/login', credentials)
            .then(function (response) {
                var userData = response.data;
                cmnSessionSvc.create(userData.id, userData.username, userData.sessionId );
            });
    }

    function isAuthenticated () {
        return !!cmnSessionSvc.userId;
    }

    function isAuthorized (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (isAuthenticated() && authorizedRoles.indexOf(cmnSessionSvc.userRole) !== -1);
    }

    return {
        login: login,
        isAuthenticated: isAuthenticated,
        isAuthorized: isAuthorized
    };
}]);