angular.module('ba.controllers').controller('mnMainCtrl', ['$scope', '$translate', '$state', 'mnBookmarkSvc', 'cmnIonicHelpersSvc', 'cmnParseDataSvc', 'cmnAuthenticationSvc',
    '$ionicSideMenuDelegate', '$cordovaToast', '$ionicActionSheet',
    function($scope, $translate, $state, mnBookmarkSvc, cmnIonicHelpersSvc, cmnParseDataSvc, cmnAuthenticationSvc, $ionicSideMenuDelegate, $cordovaToast, $ionicActionSheet) {
        'use strict';

        $scope.viewTitle = $translate.instant('home.TITLE');
        var gridFlexibleHeightPlugin = new window.ngGridFlexibleHeightPlugin();
        $scope.bookmarkItems = [];
        $scope.gridData = {};
        $scope.columns = [];
        $scope.gridOptions = {
            data: 'gridData',
            multiSelect: false,
            showColumnMenu: true,
            showFilter: true,
            selectedItems: [],
            plugins: [gridFlexibleHeightPlugin],
            filterOptions: { filterText: '', useExternalFilter: false },
            columnDefs: 'columns'
        };

        var coreHighchartsConfig = {
            options: {
                chart: {
                    type: 'columns'
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            }
        };

        mnBookmarkSvc.getBookmarks().then(function (response) {
            cmnParseDataSvc.parseBookmarkList(response.data, function (parsedData){
                $scope.bookmarkItems = parsedData;
                $scope.setBookmark(parsedData[6].id);
            });
        });

        $scope.setBookmark = function (bookmarkId) {
            if (!bookmarkId){
                return false;
            }

            cmnIonicHelpersSvc.showLoading();

            mnBookmarkSvc.setBookmark(bookmarkId).then(function (reponse) {
                var valid = reponse.data.valid;
                if (!valid) {
                    cmnIonicHelpersSvc.hideLoading();
                    cmnIonicHelpersSvc.alert($translate.instant('general.WARNING_TITLE'), $translate.instant('home.BOOKMARK_VALID_ERROR'));

                }
                else {
                    mnBookmarkSvc.getBookMarkModel().then(function (response) {
                        var gridModel = cmnParseDataSvc.parseBookmarkModel(response.data);
                        if (gridModel) {
                            setupGridAndChart(gridModel);
                        }
                        else {
                            cmnIonicHelpersSvc.alert($translate.instant('general.WARNING_TITLE'), $translate.instant('home.BOOKMARK_DATA_ERROR'));
                            cmnIonicHelpersSvc.hideLoading();
                        }
                    });
                }
            });
        };

        function setupGridAndChart(gridModel) {

            $scope.gridData = gridModel.data;

            $scope.columns = gridModel.columnModel;


            //TODO: Mind rape in 3, 2 ,1 ...
            var categories = [];

            for (var j = 0; j < gridModel.data.length; j++ ) {
                categories.push(gridModel.data[j].cell0);
            }

            var config = coreHighchartsConfig;
            config.series = [];
            config.xAxis = { categories: categories };

            var series = [];
            for (var i = 0; i < gridModel.data.length; i++) {
                var k = 0;
                for (var prop in gridModel.data[i]) {
                    if (k > 0) {
                        if (!series[k-1]) {
                            series[k-1] = {name: gridModel.columnModel[k].displayName, data: []};
                        }
                        series[k-1].data.push(parseFloat(gridModel.data[i][prop]));
                    }
                    k++;
                }
            }

            config.series = series;

            $scope.highchartsConfig = config;

            cmnIonicHelpersSvc.hideLoading();

            if(!$scope.$$phase) {
                $scope.$apply();
            }
        }

        $scope.checkIfParent = function (bookmark) {
            return bookmark.parent ? 'item-divider' : '';
        };

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

        $scope.logout = function () {
            var confirmPopup = cmnIonicHelpersSvc.confirm($translate.instant('login.LOGOUT'), $translate.instant('login.LOGOUT_TEXT'));
            confirmPopup.then(function () {
                cmnAuthenticationSvc.logout().then(function () {
                    $state.go('login');
                });
            });
        };

        $scope.showActionSheet = function () {

            // Show the action sheet
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: $translate.instant('action_sheet.SHOW_GRID') },
                    { text: $translate.instant('action_sheet.SHOW_COLUMN_CHART') },
                    { text: $translate.instant('action_sheet.SHOW_BAR_CHART') },
                    { text: $translate.instant('action_sheet.SHOW_LINE_CHART') }
                ],
                titleText: 'Actions',
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    if (index === 0) {
                        $state.go('main.grid');
                    }
                    else {
                        var chartType = '';
                        switch(index) {
                            case 1:
                                chartType = 'column';
                                break;
                            case 2:
                                chartType = 'bar';
                                break;
                            case 3:
                                chartType = 'line';
                                break;
                            default:
                                chartType = 'column';
                        }

                        coreHighchartsConfig.options.chart.type = chartType;
                        $state.go('main.chart');
                    }
                    hideSheet();
                }
            });
        };
    }
]);