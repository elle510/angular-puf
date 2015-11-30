'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Wizard Main";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		};
		
		$scope.hwizardTitle = '가로 step 마법사';
		$scope.vwizardTitle = '세로 step 마법사';
		
//		$scope.password = '';
//		$scope.email = '';
    };
    
	app.register.controller('wizardMainCtrl', ['$scope', '$location', controller]);
	
});