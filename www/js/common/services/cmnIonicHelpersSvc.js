angular.module('ba.services').service('cmnIonicHelpersSvc', ['$ionicPopup', '$ionicLoading', '$translate', function ($ionicPopup, $ionicLoading, $translate) {

    function alert (title, text) {
        return $ionicPopup.alert({
            title: title,
            template: text
        });
    }

    function confirm (title, text) {
        return $ionicPopup.confirm({
            title: title,
            template: text,
            cancelText: $translate.instant('general.CANCEL'),
            okText: $translate.instant('general.YES')
        });
    }

    function showLoading () {
        $ionicLoading.show({
            template: $translate.instant('general.LOADING')
        });
    }

    function hideLoading () {
        $ionicLoading.hide();
    }

    return {
        alert: alert,
        confirm: confirm,
        showLoading: showLoading,
        hideLoading: hideLoading
    };
}]);