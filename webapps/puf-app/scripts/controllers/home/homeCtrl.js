'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Home";
		
		
    };
    
	app.register.controller('homeCtrl', ['$scope', '$location', controller]);
	
});