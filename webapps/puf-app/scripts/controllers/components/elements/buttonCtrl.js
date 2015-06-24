'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Button";
		
		
    };
    
	app.register.controller('buttonCtrl', ['$scope', '$location', controller]);
	
});