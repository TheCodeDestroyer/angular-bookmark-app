angular.module('ba.controllers').controller('mnMainCtrl', ['$scope', '$translate', '$state', 'mnBookmarkSvc', 'cmnParseDataSvc', '$ionicSideMenuDelegate', '$cordovaToast', '$ionicActionSheet',
    function($scope, $translate, $state, mnBookmarkSvc, cmnParseDataSvc, $ionicSideMenuDelegate, $cordovaToast, $ionicActionSheet) {
        'use strict';

        $scope.viewTitle = $translate.instant('home.TITLE');
        var gridFlexibleHeightPlugin = new ngGridFlexibleHeightPlugin();
        $scope.bookmarkItems = [];
        $scope.gridData = {};
        $scope.columns = {};
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
                    type: 'column'
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            }
        };

        var bookmarkPromise = mnBookmarkSvc.getBookmarks();
        if (!bookmarkPromise) {
            if (window.device) {
                $cordovaToast.show('', 'long', 'center');
            }
            return;
        }
        bookmarkPromise.then(function (response) {
            cmnParseDataSvc.parseBookmarkList(response.data, function (parsedData){
                $scope.bookmarkItems = parsedData;
                $scope.setBookmark(parsedData[4].id);
            });
        }, function () {
            if (window.device) {
                $cordovaToast.show('', 'long', 'center');
            }
        });

        $scope.setBookmark = function (bookmarkId) {
            if (!bookmarkId) return false;

            var setBookmarkPromise = mnBookmarkSvc.setBookmark(bookmarkId);
            if (!setBookmarkPromise) {
                if (window.device) {
                    $cordovaToast.show('', 'long', 'center');
                }
                return false;
            }

            setBookmarkPromise.then(function(reponse) {
                var valid = reponse.data.valid;
                if (!valid) {
                    if (window.device) {
                        $cordovaToast.show('This is not a valid bookmark.', 'long', 'center');
                    }
                }
                else {
                    var bookmarkModelPromise = mnBookmarkSvc.getBookMarkModel();
                    if (!bookmarkModelPromise) {
                        if (window.device) {
                            $cordovaToast.show('', 'long', 'center');
                        }
                        return false;
                    }
                    bookmarkModelPromise.then(function(response){
                        var gridModel = cmnParseDataSvc.parseBookmarkModel(response.data);
                        if (gridModel) {
                            setupGridAndChart(gridModel);
                        }
                    })
                }
            })
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

        $scope.showActionSheet = function () {

            // Show the action sheet
            $ionicActionSheet.show({
                buttons: [
                    { text: 'Show Chart' },
                    { text: 'Show Grid' }
                ],
                titleText: 'Actions',
                cancelText: 'Cancel',
                cancel: function () {
                    // add cancel code..
                },
                buttonClicked: function (index) {
                    if (this.buttons[index].text === "Show Chart") {
                        $state.go('main.chart');
                    }
                    else if(this.buttons[index].text === "Show Grid") {
                        $state.go('main.grid');
                    }
                }
            });
        };

    }
]);