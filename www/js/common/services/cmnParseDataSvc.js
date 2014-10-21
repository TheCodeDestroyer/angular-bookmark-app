angular.module('ba.services').service('cmnParseDataSvc', function () {

    function parseBookmarkList(rootElement, success) {
        var bookmarkArray = [];

        loopItems(bookmarkArray, rootElement, function(parsedData){
            success(parsedData);
        });
    }

    function loopItems(bookmarkArray, item, callback) {
        for (var i = 0; i < item.items.length; i++ ) {
            var bookmark = item.items[i];
            if (bookmark.items.length > 0) {
                bookmarkArray.push({ displayName: bookmark.name, parent: true});
                loopItems(bookmarkArray, bookmark);
            }
            else {
                bookmarkArray.push({ id: bookmark.serverId, displayName: bookmark.name, parent: false})
            }
            if (callback && i === item.items.length - 1){
                callback(bookmarkArray);
            }
        }
    }

    function parseBookmarkModel(model){

        var columns = [];
        var columnModel = model.rows.shift();
        for (var i = 0; i < columnModel.length; i++ ) {
            var column = columnModel[i];
            columns.push({displayName: column.stringValue, field: 'cell' + i, width: 250 });
        }

        var rowData = [];
        var dataModel = model.rows;
        for (var j = 0; j < dataModel.length; j++ ) {
            var rowDataModel = dataModel[j];
            var cellData = {};
            for (var k = 0; k < rowDataModel.length; k++ ) {
                var cellModel = rowDataModel[k];
                cellData["cell" + k] = cellModel.stringValue;
            }
            rowData.push(cellData)
        }

        return {columnModel: columns, data: rowData};
    }

    return {
        parseBookmarkList: parseBookmarkList,
        parseBookmarkModel: parseBookmarkModel
    };
});