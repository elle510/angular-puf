'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Modal";
		
		
    };
    
	app.register.controller('modalCtrl', ['$scope', '$location', controller]);
	
});