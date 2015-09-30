'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Hidden Content";
		
		$scope.clickFunc = function() {
			console.log('hidden content : click function');
		}
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
    };
    
	app.register.controller('hiddenContentCtrl', ['$scope', '$location', controller]);
	
});