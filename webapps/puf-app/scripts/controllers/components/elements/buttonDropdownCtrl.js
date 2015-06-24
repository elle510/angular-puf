'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Button dropdown";
		
		
    };
    
	app.register.controller('buttonDropdownCtrl', ['$scope', '$location', controller]);
	
});