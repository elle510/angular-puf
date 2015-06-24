'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Upload";
		
		
    };
    
	app.register.controller('uploadCtrl', ['$scope', '$location', controller]);
	
});