'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Wizard";
		
		
    };
    
	app.register.controller('wizardCtrl', ['$scope', '$location', controller]);
	
});