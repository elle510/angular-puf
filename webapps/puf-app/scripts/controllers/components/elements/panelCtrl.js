'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Panel";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
    };
    
	app.register.controller('panelCtrl', ['$scope', '$location', controller]);
	
});