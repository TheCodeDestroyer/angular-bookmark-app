angular.module('ba.services').service('cmnSettingsSvc',['$localStorage', function ($localStorage) {

    function get() {
        if (!$localStorage.userSettings) {
            prepareDefaultSettings();
        }

        return $localStorage.userSettings;
    }

    function prepareDefaultSettings() {
        $localStorage.$default({
            userSettings: {
                apiUrl: 'http://195.246.16.232/api'
            }
        });
    }

    function save(settings) {
        $localStorage.userSettings = settings;
    }

    return {
        get: get,
        save: save
    };
}]);