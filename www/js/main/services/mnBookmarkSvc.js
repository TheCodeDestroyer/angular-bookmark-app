angular.module('ba.services').factory('mnBookmarkSvc', ['$http', 'cmnSessionSvc', 'cmnSettingsSvc', function($http, cmnSessionSvc, cmnSettingsSvc){
    'use strict';

    function getBookmarks() {

        var settings = cmnSettingsSvc.get();
        var apiUrl = settings.apiUrl;

        if (!apiUrl && apiUrl === '') {
            return undefined;
        }


        return $http.get(apiUrl + '/olap/bookmark', { headers: { 'Authorization': cmnSessionSvc.sessionId }, params: { structureOnly: false, mobileOnly: false }});
    }

    function setBookmark(bookmarkId){
        var settings = cmnSettingsSvc.get();
        var apiUrl = settings.apiUrl;

        if (!apiUrl && apiUrl === '') {
            return undefined;
        }


        return $http.post(apiUrl + '/olap/use/bookmark/'.concat(bookmarkId), {}, { headers: { 'Authorization': cmnSessionSvc.sessionId }});
    }

    function getBookMarkModel() {
        var settings = cmnSettingsSvc.get();
        var apiUrl = settings.apiUrl;

        if (!apiUrl && apiUrl === '') {
            return undefined;
        }


        return $http.get(apiUrl + '/olap/use/model', { headers: { 'Authorization': cmnSessionSvc.sessionId }});
    }

    return {
        getBookmarks: getBookmarks,
        setBookmark: setBookmark,
        getBookMarkModel: getBookMarkModel

    };
}]);