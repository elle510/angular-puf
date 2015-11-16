'use strict';

define(['app', 'moment'], function(app, moment) {
	
	var controller = function ($scope, $location, psUtil, psStorage) {
        
		$scope.pageTitle = "CRUD";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		$scope.expand = true;
		
		console.log('listCtrl Start');
		
		/*function detailViewLink(cellvalue, options, rowObject) {
            return '<a href="#/crud-view?uid=' + rowObject.bulletinID + '" >' + cellvalue + '</a>';
        }*/
		
		function detailViewLink(cellvalue, options, rowObject) {
            return '<a ui-sref="crud-view({uid: ' + rowObject.id + '})" href="#/crud/view/' + rowObject.id + '">' + cellvalue + '</a>';
            
            // 결과적으로 ui-sref 이 파싱되어 href를 만들어줘서 href가 실행되는 것임
            // angular의 문법이 모두 적용안됨, 순수 javascript 코드로 해야 함
//            return '<a href="#/crud/view/' + rowObject.id + '">' + cellvalue + '</a>';
//			return '<a ui-sref="crud-save" href="#/crud/create">' + cellvalue + '</a>';
        }
		
		/*$scope.clickFunc = function() {
			console.log('fieldset : click function');
		}*/
		
		var rootPath = psUtil.getRootPath();
		if(rootPath == '/puf-app') {	// context root 가 / 라는 의미
			rootPath = '';
		}
		
		var colNames = ['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
	   	colModel = [
	   	    {name:'id',index:'id', width:60, sorttype:"int"},
	    	{name:'invdate',index:'invdate', width:120, align:"center", sorttype:"date", formatter:"date", formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
	    	{name:'name',index:'name', width:100, formatter: detailViewLink},
	    	{name:'amount',index:'amount', width:80, align:"right", sorttype:"float", formatter:"number"},
	    	{name:'tax',index:'tax', width:80, align:"right", sorttype:"float"},		
	    	{name:'total',index:'total', width:80, align:"right", sorttype:"float"},		
	    	{name:'note',index:'note', width:150, sortable:false}
	    ];
		
		$scope.options = {
			//url: '/bulletin/list',
    		//postData: {index: "20130613", type: "FLOWS"},
			//caption: "공지사항 목록",
    		/*
		  	colNames: ['제목', '글쓴이', '등록일'],
		    colModel: [
		               //{name: 'title', index: 'title', formatter: 'showlink', formatoptions: {baseLinkUrl:'#/crud/update', addParam: '&action=edit', idName: 'bulletinID'}},
		               {name: 'title', index: 'title', formatter: detailViewLink},
		               {name: 'registerUserName', index: 'registerUserName', width: 120},
		               {name: 'registerDate', index: 'registerDate', width: 120, formatter: 'date', formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}}
		              ]
		    */
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
			//data: mydata,
			//datatype: "local",
			sortname: 'name',
			sortorder: 'desc',
    		colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
    	   	colModel:[
    	   		{name:'id',index:'id', width:60, sorttype:"int"},
    	   		{name:'invdate',index:'invdate', width:120, align:"center", sorttype:"date", formatter:"date", formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}},
    	   		{name:'name',index:'name', width:100, formatter: detailViewLink},
    	   		{name:'amount',index:'amount', width:80, align:"right", sorttype:"float", formatter:"number"},
    	   		{name:'tax',index:'tax', width:80, align:"right", sorttype:"float"},		
    	   		{name:'total',index:'total', width:80, align:"right", sorttype:"float"},		
    	   		{name:'note',index:'note', width:150, sortable:false}
    	   	],
		    //autowidth: false,
		    //shrinkToFit: true
    	   	onSelectRow: function(rowid, row, event) {    //row 선택시 처리. ids는 선택한 row
    	   		//alert('row 선택시 rowid: ' + rowid);
    	   		/*console.log(row);
    	   		console.log(event);*/
    	   	},
    	   	onRightClickRow: function (rowid, iRow, iCol, e) {
    	   		/*console.log(rowid);
    	   		console.log(iRow);
    	   		console.log(iCol);
    	   		console.log(e);*/
    	    }
        };
		
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
			console.log($scope.dualListApi);
			$scope.gridApi.refresh();
		}
		
		
		// 검색
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
		var defaultDestFields = [
		    {name: 'Inv No', 	value: 'id'},
            {name: 'Date', 		value: 'invdate'}, 
            {name: 'Client', 	value: 'name'}, 
            {name: 'Amount', 	value: 'amount'}, 
            {name: 'Tax', 		value: 'tax'}, 
            {name: 'Total', 	value: 'total'}, 
            {name: 'Notes', 	value: 'note'}
        ];
		
		var key = 'key';//$location.path();
		//psStorage.removeLocalStorage(key);
		//psStorage.setLocalStorage(key, {a: 'a', b: 'b'});
		var fields = psStorage.getLocalStorage(key);
		//console.log(fields instanceof Object);
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
		
		$scope.loadCompleteHandler = function(e, data) {
			console.log('loadCompleteHandler: ' + key);
			var f = {
				sourceFields: $scope.sourceFields,
				destFields: $scope.destFields
			};
			console.log($scope.dualListApi);
			psStorage.setLocalStorage(key, f);
		};
		
		/*if(typeof(Storage) !== "undekeyfined") {
		    // Code for localStorage/sessionStorage.
			console.log('Storage');
		} else {
		    // Sorry! No Web Storage support..
			console.log('No Web Storage support');
		}
		*/
    };
    
	app.register.controller('listCtrl', ['$scope', '$location', 'psUtil', 'psStorage', controller]);
	
});