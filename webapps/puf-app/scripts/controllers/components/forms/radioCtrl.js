'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Radio";
		
		// radio
		$scope.radioValue1 = 'blue';
		$scope.radioValue2 = 'seoul';
		$scope.specialValue = {
	      "id": "12345",
	      "value": "green"
	    };
		
    };
    
	app.register.controller('radioCtrl', ['$scope', '$location', controller]);
	
});