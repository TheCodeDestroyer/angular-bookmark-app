angular.module('ba.controllers').controller('mnMainCtrl', ['$scope', '$translate', 'mnBookmarkSvc', 'cmnParseDataSvc', '$ionicSideMenuDelegate', '$cordovaToast',
    function($scope, $translate, mnBookmarkSvc, cmnParseDataSvc, $ionicSideMenuDelegate, $cordovaToast) {
        'use strict';

        $scope.bookmarkItems = [];

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
                        setupGrid(gridModel);
                    })
                }
            })
        };

        function setupGrid(gridModel) {

            $scope.gridData = gridModel.data;

            $scope.gridOptions = {
                data: 'gridData',
                multiSelect: false,
                showColumnMenu: true,
                showFilter: true,
                selectedItems: [],
                filterOptions: { filterText: '', useExternalFilter: false },
                columnDefs: [
                    { field: 'id', visible:false , displayName: $translate.instant('fixed_asset.inventory_and_review.grid.ID') },
                    { field: 'serial', displayName: $translate.instant('fixed_asset.inventory_and_review.grid.SERIAL'), width: 120 },
                    { field: 'code', displayName: $translate.instant('fixed_asset.inventory_and_review.grid.CODE'), width: 120 },
                    { field: 'title', displayName: $translate.instant('fixed_asset.inventory_and_review.grid.TITLE'), width: 120 },
                    { field: 'inventoryNumber', displayName: $translate.instant('fixed_asset.inventory_and_review.grid.INVENTORY_NUMBER'), width: 120 },
                    { field: 'recipientCode', displayName: $translate.instant('fixed_asset.inventory_and_review.grid.RECIPIENT_CODE'), width: 120 },
                    { field: 'recipient', displayName: $translate.instant('fixed_asset.inventory_and_review.grid.RECIPIENT'), width: 120 }
                ]
            };
        }

        $scope.checkIfParent = function (bookmark) {
            return bookmark.parent ? 'item-divider' : '';
        };

        $scope.toggleLeft = function() {
            $ionicSideMenuDelegate.toggleLeft();
        };

    }
]);