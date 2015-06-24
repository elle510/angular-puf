'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form TextArea";
		
		
    };
    
	app.register.controller('textareaCtrl', ['$scope', '$location', controller]);
	
});