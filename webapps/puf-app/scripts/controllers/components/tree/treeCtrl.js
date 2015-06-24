'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Tree";
		
		
    };
    
	app.register.controller('treeCtrl', ['$scope', '$location', controller]);
	
});