'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Validation";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
    };
    
	app.register.controller('validationCtrl', ['$scope', '$location', controller]);
	
});