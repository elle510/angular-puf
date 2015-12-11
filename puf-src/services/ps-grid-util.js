/**
 * ps-grid-util services
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/12/06
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 */

angular.module('ps.services.gridUtil', [])
.factory('psGridUtil', ['$window', '$location', function($window, $location) {
	var factory = {};
	
	// fieldChooser 에서 설정한 컬럼을 설정
	factory.setColumns = function(grid, sourceFields, destinationFields, multiselect) {
		
		var remapColumns = [], remapIndex = 0;
		if (multiselect === undefined) {
			// multi checkbox가 있으면 그 컬럼이 인덱스 0 이다.
			multiselect = true;
			remapColumns.push(0);
			remapIndex = 1;
	    }
		
		var showCol = [];
		$.each(destinationFields, function(index, value) { 
			showCol.push(value.value);
			remapColumns.push(parseInt(value.index) + remapIndex);
		});
		
		var hideCol = [];
		$.each(sourceFields, function(index, value) { 
			hideCol.push(value.value);
			remapColumns.push(parseInt(value.index) + remapIndex);
		});
//		console.log(remapColumns);
//		console.log(grid.jqGrid('getGridParam', 'remapColumns'));
		
		// remapColumns 을 원래대로 복원
		var restore = [], _remapColumns = grid.jqGrid('getGridParam', 'remapColumns');
		for(var i=0; i<_remapColumns.length; i++) {
			if(_remapColumns[i] == i) {
				restore[i] = i;
			}else {
				restore[_remapColumns[i]] = i;
			}
		}
		grid.jqGrid('remapColumns', restore, true, false);
		
		grid.jqGrid('showCol', showCol).jqGrid('hideCol', hideCol)
			.jqGrid('remapColumns', remapColumns/*[0,7,1,5,6,3,2,4]*/, true, false);
		
    };
    
    // colModel 로 부터 default show columns 설정
    factory.defaultColumns = function(colNames, colModel) {
    	var cols = [];
    	for(var i=0; i<colNames.length; i++) {
    		if(colModel[i].hasOwnProperty('hidden') && colModel[i]['hidden']) {
    			continue;
    		}
    		cols.push({index: i, name: colNames[i], value: colModel[i]['name']});
    	}
    	return cols;
    };
    
    return factory;
}]);
