'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location, psUtil) {
        
		$scope.pageTitle = "CRUD";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		$scope.expand = true;
		
		/*function detailViewLink(cellvalue, options, rowObject) {
            return '<a href="#/crud-view?uid=' + rowObject.bulletinID + '" >' + cellvalue + '</a>';
        }*/
		
		function detailViewLink(cellvalue, options, rowObject) {
            return '<a ui-sref="crud-view({uid: ' + rowObject.id + '})" href="#/crud/view/' + rowObject.id + '">' + cellvalue + '</a>';
            
            // 결과적으로 ui-sref 이 파싱되어 href를 만들어줘서 href가 실행되는 것임
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
			datatype: "json",
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
			rowNum: 10,
			rowList: [10,20,30],
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
	            "edit": {name: "Edit", icon: "edit"},
	            "cut": {name: "Cut", icon: "cut"},
	            "copy": {name: "Copy", icon: "copy"},
	            "paste": {name: "Paste", icon: "paste"},
	            "delete": {name: "Delete", icon: "delete"}
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
		
		/*
		$scope.data = [
		    {id:"1",invdate:"2010-05-24",name:"test",note:"note",tax:"10.00",total:"2111.00"} ,
			{id:"2",invdate:"2010-05-25",name:"test2",note:"note2",tax:"20.00",total:"320.00"},
			{id:"3",invdate:"2007-09-01",name:"test3",note:"note3",tax:"30.00",total:"430.00"},
			{id:"4",invdate:"2007-10-04",name:"test",note:"note",tax:"10.00",total:"210.00"},
			{id:"5",invdate:"2007-10-05",name:"test2",note:"note2",tax:"20.00",total:"320.00"},
			{id:"6",invdate:"2007-09-06",name:"test3",note:"note3",tax:"30.00",total:"430.00"},
			{id:"7",invdate:"2007-10-04",name:"test",note:"note",tax:"10.00",total:"210.00"},
			{id:"8",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"21.00",total:"320.00"},
			{id:"9",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
			{id:"11",invdate:"2007-10-01",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
			{id:"12",invdate:"2007-10-02",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
			{id:"13",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
			{id:"14",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
			{id:"15",invdate:"2007-10-05",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
			{id:"16",invdate:"2007-09-06",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
			{id:"17",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
			{id:"18",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
			{id:"19",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
			{id:"21",invdate:"2007-10-01",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
			{id:"22",invdate:"2007-10-02",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
			{id:"23",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
			{id:"24",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
			{id:"25",invdate:"2007-10-05",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
			{id:"26",invdate:"2007-09-06",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"},
			{id:"27",invdate:"2007-10-04",name:"test",note:"note",amount:"200.00",tax:"10.00",total:"210.00"},
			{id:"28",invdate:"2007-10-03",name:"test2",note:"note2",amount:"300.00",tax:"20.00",total:"320.00"},
			{id:"29",invdate:"2007-09-01",name:"test3",note:"note3",amount:"400.00",tax:"30.00",total:"430.00"}
		];
		*/
				
    };
    
	app.register.controller('listCtrl', ['$scope', '$location', 'psUtil', controller]);
	
});