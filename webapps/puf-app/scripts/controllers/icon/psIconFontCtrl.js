'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Polestar Icon Font";
		
		
    };
    
	app.register.controller('psIconFontCtrl', ['$scope', '$location', controller]);
	
});