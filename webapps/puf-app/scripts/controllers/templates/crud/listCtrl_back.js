'use strict';

define(['app', 'moment'], function(app, moment) {
	
	var controller = function ($scope, $location, psUtil, psStorage, psGridUtil) {
        
		$scope.pageTitle = "CRUD";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		$scope.expand = true;
		
		console.log('listCtrl Start');
		
		/***********************
		 * 그리드 컬럼
		 */
		/*function detailViewLink(cellvalue, options, rowObject) {
			return '<a href="#/crud-view?uid=' + rowObject.bulletinID + '" >' + cellvalue + '</a>';
		}*/
	
		function detailViewLink(cellvalue, options, rowObject) {
			return '<a ui-sref="crud-view({uid: ' + rowObject.id + '})" href="#/crud/view/' + rowObject.id + '">' + cellvalue + '</a>';
	
			// 결과적으로 ui-sref 이 파싱되어 href를 만들어줘서 href가 실행되는 것임
			// angular의 문법이 모두 적용안됨, 순수 javascript 코드로 해야 함
//			return '<a href="#/crud/view/' + rowObject.id + '">' + cellvalue + '</a>';
//			return '<a ui-sref="crud-save" href="#/crud/create">' + cellvalue + '</a>';
		}
		
		var colNames = ['Inv No', 'h1', 'h2', 'Date', 'Client', 'Amount', 'Tax', 'Total', 'Notes'],
		colModel = [
		    {name: 'id', index: 'id', width: 60, sorttype: 'int'},
		    {name: 'h1', index: 'h1', hidden: true},
		    {name: 'h2', index: 'h2', hidden: true},
		    {name: 'invdate', index: 'invdate', width: 120, align: 'center', sorttype: 'date', formatter: 'date', formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
		    {name: 'name', index: 'name', width: 100, formatter: detailViewLink},
		    {name: 'amount', index: 'amount', width: 80, align: 'right', sorttype: 'float', formatter: 'number'},
		    {name: 'tax', index: 'tax', width: 80, align: 'right', sorttype: 'float'},
		    {name: 'total', index: 'total', width: 80, align: 'right', sorttype: 'float'},
		    {name: 'note', index: 'note', width: 150, sortable: false}
		];
		
		var rootPath = psUtil.getRootPath();
		if(rootPath == '/puf-app') {	// context root 가 / 라는 의미
			rootPath = '';
		}
		
		/***********************
		 * 검색
		 */ 
		// select
		$scope.colors = [
		    			 {name:'black', code:'1', shade:'dark'},
		    		     {name:'white', code:'2', shade:'light'},
		    		     {name:'red', code:'3', shade:'dark'},
		    		     {name:'blue', code:'4', shade:'dark'},
		    		     {name:'yellow', code:'5', shade:'light'}
		    		];
		$scope.myColor = $scope.colors[2]; 	// red
		
		$scope.companies = [
		    			 {name:'Google', code:'1'},
		    		     {name:'Apple', code:'2'},
		    		     {name:'MS', code:'3'}
		    		];
		$scope.myCompany = $scope.companies[2]; 	// Apple
		
		// 일시
		$scope.datetime = true;
		$scope.selectCombo = true;
		$scope.selectCombo1 = true;
		
		// checkbox
		$scope.checkValue1 = true;
		$scope.checkValue2 = false;
		$scope.checkValue3 = true;
		$scope.checkValue4 = false;
		
		// radio
		$scope.radioValue1 = 'blue';
		$scope.radioValue2 = 'seoul';
		$scope.specialValue = {
			"id": "12345",
			"value": "green"
	    };
		
		// stepper
		$scope.stepperValue = 10;
		$scope.stepperValue1 = 20;
		
		// date
		$scope.toDate_options = {
			useCurrent: false //Important! See issue #1075
		};
		
		$scope.daterange_option = {
			singleDatePicker: true
		};
//		$scope.api_single_range.getStartDate();
//		$scope.api_range.getStartDate();
		
		$scope.daterange_predefined_ranges = {
			'금일': [moment(), moment()],
			'전일': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
			'일주일전': [moment().subtract(6, 'days'), moment()],
			'한달전': [moment().subtract(29, 'days'), moment()],
			'이번달': [moment().startOf('month'), moment().endOf('month')],
			'지난달': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		};
//		$scope.api_predefined_range.getStartDate();
		
		/***********************
		 * 옵션
		 */
		// 컬럼
		// 컬럼을 스토리지에 저장하고 읽어오는 api 제공(pageid, gridid, destFields data)
		var defaultSourceFields = [];
		var defaultDestFields = psGridUtil.defaultColumns(colNames, colModel);/*[
		    {index: 0,	name: 'Inv No', value: 'id'},
            {index: 1, 	name: 'Date', 	value: 'invdate'}, 
            {index: 2, 	name: 'Client', value: 'name'}, 
            {index: 3, 	name: 'Amount', value: 'amount'}, 
            {index: 4, 	name: 'Tax', 	value: 'tax'}, 
            {index: 5, 	name: 'Total', 	value: 'total'}, 
            {index: 6, 	name: 'Notes', 	value: 'note'}
        ];*/
		console.log(defaultDestFields);
		
		var key = 'key';//$location.path();
		//psStorage.removeLocalStorage(key);
		//psStorage.setLocalStorage(key, {a: 'a', b: 'b'});
		var fields = psStorage.getLocalStorage(key);
//		console.log(fields instanceof Object);
//		console.log(fields);
		if(fields != psStorage.NotSupport) {
			if(fields == null) {
				// default columns
				$scope.sourceFields = defaultSourceFields;
				$scope.destFields = defaultDestFields;
				
			}else {
				// saved columns
				$scope.sourceFields = fields.sourceFields;
				$scope.destFields = fields.destFields;
			}
				
		}
		
		// 스토리지에 저장하고 컬럼 show/hide하는 api 만들자
		$scope.onLoadComplete = function(e, data) {
			console.log('onLoadComplete: ' + key);
			
			// storage 에 columns 저장
			//saveGridColumn();
			
			// columns 설정
			//psGridUtil.setColumns($scope.gridApi.grid(), $scope.dualListApi.getSourceFields(), $scope.dualListApi.getDestinationFields());
			
		};
		
		function saveGridColumn() {
			var f = {
				sourceFields: $scope.dualListApi.getSourceFields(),//$scope.sourceFields,
				destFields: $scope.dualListApi.getDestinationFields()//$scope.destFields
			};
//			console.log(f);
			psStorage.setLocalStorage(key, f);
		}
		
		// 조회결과 기준
		$scope.gridGroupings = [
		    {name: '선택안함', 	value: ''},
            {name: 'Date', 		value: 'invdate'}, 
            {name: 'Client', 	value: 'name'}, 
            {name: 'Amount', 	value: 'amount'}, 
            {name: 'Tax', 		value: 'tax'}, 
            {name: 'Total', 	value: 'total'}, 
            {name: 'Notes', 	value: 'note'}
        ];
		$scope.selectedGridGrouping = '';
		
		// groupingGroupBy 서버호출하므로 단독으로 사용할 경우만 아래처럼 사용
		$scope.selectChange = function() {
//			console.log('selectChange: ' + $scope.selectedGridGrouping);
//			if($scope.selectedGridGrouping === '') {
//				$scope.gridApi.grid().jqGrid('groupingRemove', true);
//			}else {
//				$scope.gridApi.grid().jqGrid('groupingGroupBy', $scope.selectedGridGrouping/*, { groupText: ['<b>Product(s): "{0}" - {1} item(s)</b>'] }*/);
//			}
		};
		
		// 조회
		$scope.search = function() {
			var setGridParam = {},
			searchOptions = {};
			setGridParam.postData = searchOptions;
			
			// 조회결과 기준
			if($scope.selectedGridGrouping === '') {
				setGridParam.grouping = false;
			}else {
				setGridParam.grouping = true;
				setGridParam.groupingView = {groupField : [$scope.selectedGridGrouping]};
			}
			
			// storage 에 columns 저장
			saveGridColumn();
			
			// columns 설정
			psGridUtil.setColumns($scope.gridApi.grid(), $scope.dualListApi.getSourceFields(), $scope.dualListApi.getDestinationFields());
			
//			/*$("#grid")*/$scope.gridApi.grid().jqGrid('setGridParam', {postData: searchOptions}).trigger('reloadGrid');
			$scope.gridApi.grid().jqGrid('setGridParam', setGridParam).trigger('reloadGrid');
		};
		
		$scope.options = {
			url: rootPath + '/puf-app/json/grid.json',
			postData: {index: "20130613", type: "FLOWS"},	// 검색
			jsonReader: {
				page: 'page',
				total: 'total',
				root: 'rows',
				records: 'records',
				repeatitems: false,
				//id: 'id',
				cell: 'cell'
			},
			sortname: 'name',
			sortorder: 'desc',
			colNames: colNames,
			colModel: colModel,
			//autowidth: false,
			//shrinkToFit: true
			onSelectRow: function(rowid, row, event) {    //row 선택시 처리. ids는 선택한 row
				//alert('row 선택시 rowid: ' + rowid);
				/*console.log(row);
		   		console.log(event);*/
			}
//	   		onRightClickRow: function (rowid, iRow, iCol, e) {
//	   			/*console.log(rowid);
//	   			console.log(iRow);
//	   			console.log(iCol);
//	   			console.log(e);*/
//	    	}
		};
		
		// 컨텍스트 메뉴
		$scope.contextMenu = {
	        callback: function(key, options) {
	            /*var m = "clicked: " + key + " on " + $(this).text();
	            window.console && console.log(m) || alert(m); */
	        	
	        	/*console.log('key: ' + key);
	        	console.log('options: ');
	        	console.log(options);*/
	        	alert('clicked: ' + key);
	        },
	        items: {
	            edit: {name: "Edit", icon: "edit"},
	            cut: {name: "Cut", icon: "cut"},
	            copy: {name: "Copy", icon: "copy"},
	            paste: {name: "Paste", icon: "paste"},
	            'delete': {name: "Delete", icon: "delete"}
	        }
	    };
		
		/*
		$('#grid').contextMenu({
	        selector: '.ui-jqgrid-bdiv', 
	        callback: function(key, options) {
	            var m = "clicked: " + key + " on " + $(this).text();
	            window.console && console.log(m) || alert(m); 
	        },
	        items: {
	            "edit": {name: "Edit", icon: "edit"},
	            "cut": {name: "Cut", icon: "cut"},
	            "copy": {name: "Copy", icon: "copy"},
	            "paste": {name: "Paste", icon: "paste"},
	            "delete": {name: "Delete", icon: "delete"}
	        }
	    });
		*/
		
		// 새로고침
		$scope.refresh = function() {
//			console.log($scope.dualListApi);
			$scope.gridApi.refresh();
		}
		
    };
    
	app.register.controller('listCtrl', ['$scope', '$location', 'psUtil', 'psStorage', 'psGridUtil', controller]);
	
});