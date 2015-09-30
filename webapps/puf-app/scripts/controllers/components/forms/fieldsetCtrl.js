'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Fieldset";
		
		$scope.clickFunc = function() {
			console.log('fieldset : click function');
		}
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
    };
    
	app.register.controller('fieldsetCtrl', ['$scope', '$location', controller]);
	
});