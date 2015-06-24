'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Tab";
		
		
    };
    
	app.register.controller('tabCtrl', ['$scope', '$location', controller]);
	
});