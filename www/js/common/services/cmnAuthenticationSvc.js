angular.module('ba.services').factory('cmnAuthenticationSvc', ['$http', 'cmnSessionSvc', 'cmnSettingsSvc', function($http, cmnSessionSvc, cmnSettingsSvc){
    'use strict';

    function login(credentials) {

        var settings = cmnSettingsSvc.get();
        var apiUrl = settings.apiUrl;

        if (!apiUrl && apiUrl === '') {
            return undefined;
        }

        credentials.workspace = 'Calcit';
        credentials.client = 'API-TEST';

        return $http
            .post(apiUrl + '/login', credentials)
            .then(function (response) {
                var userData = response.data;
                cmnSessionSvc.create(userData.accountId, userData.username, userData.sessionId );
            });
    }

    function logout() {

        var settings = cmnSettingsSvc.get();
        var apiUrl = settings.apiUrl;

        if (!apiUrl && apiUrl === '') {
            return undefined;
        }

        return $http
            .delete(apiUrl + '/login', { headers: { 'Authorization': cmnSessionSvc.sessionId }})
            .then(function () {
                cmnSessionSvc.destroy();
            });
    }

    function isAuthenticated () {
        return !!cmnSessionSvc.sessionId;
    }

    return {
        login: login,
        logout: logout,
        isAuthenticated: isAuthenticated
    };
}]);