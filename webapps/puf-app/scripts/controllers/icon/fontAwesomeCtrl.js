'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Font Awesome";
		
		
    };
    
	app.register.controller('fontAwesomeCtrl', ['$scope', '$location', controller]);
	
});