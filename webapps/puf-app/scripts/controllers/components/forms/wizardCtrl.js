'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Wizard";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		};
		
    };
    
	app.register.controller('wizardCtrl', ['$scope', '$location', controller]);
	
});