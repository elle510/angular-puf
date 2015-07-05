'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		// scope 변수/함수
		$scope.pageTitle = "Tree";
		
		$scope.treeOptions = {'core': {
			'data': data
		}};
		
		$scope.change = function() {
			console.log("change");
			$scope.changeText = $scope.checkValue3 == true ? '체크' : '체크해제';
		};
		
		// 변수/함수
		var data = [
		            { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
		            { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
		            { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
		            { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" }          
		];
		
		function detailViewLink(cellvalue, options, rowObject) {
            return '<a href="#/crud-view?uid=' + rowObject.bulletinID + '" >' + cellvalue + '</a>';
        }
		
    };
    
    // treeCtrl 은 controller 명
	app.register.controller('treeCtrl', ['$scope', '$location', controller]);
	
});