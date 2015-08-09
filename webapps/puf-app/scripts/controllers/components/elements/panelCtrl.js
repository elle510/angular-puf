'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Panel";
		
		
    };
    
	app.register.controller('panelCtrl', ['$scope', '$location', controller]);
	
});