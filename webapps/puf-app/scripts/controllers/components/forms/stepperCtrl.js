'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Stepper";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		// stepper default
		$scope.stepperValue = 10;
    };
    
	app.register.controller('stepperCtrl', ['$scope', '$location', controller]);
	
});