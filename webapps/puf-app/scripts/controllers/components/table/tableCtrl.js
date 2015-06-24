'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Table";
		
		function detailViewLink(cellvalue, options, rowObject) {
            return '<a href="#/crud-view?uid=' + rowObject.bulletinID + '" >' + cellvalue + '</a>';
        }
		
		$scope.options = {
    			//url: '/bulletin/list',
        		postData: {index: "20130613", type: "FLOWS"},
				//caption: "공지사항 목록",           		
    		  	colNames: ['제목', '글쓴이', '등록일'],
    		    colModel: [
    		               //{name: 'title', index: 'title', formatter: 'showlink', formatoptions: {baseLinkUrl:'#/crud/update', addParam: '&action=edit', idName: 'bulletinID'}},
    		               {name: 'title', index: 'title', formatter: detailViewLink},
    		               {name: 'registerUserName', index: 'registerUserName', width: 120},
    		               {name: 'registerDate', index: 'registerDate', width: 120, formatter: 'date', formatoptions: {srcformat: 'Y-m-d H:i:s', newformat: 'Y-m-d'}}
    		              ]
    		    //autowidth: false,
    		    //shrinkToFit: true
        };
    };
    
	app.register.controller('tableCtrl', ['$scope', '$location', controller]);
	
});