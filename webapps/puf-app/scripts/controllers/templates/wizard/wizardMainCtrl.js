'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Wizard Main";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		};
		
//		$scope.password = '';
//		$scope.email = '';
    };
    
	app.register.controller('wizardMainCtrl', ['$scope', '$location', controller]);
	
});