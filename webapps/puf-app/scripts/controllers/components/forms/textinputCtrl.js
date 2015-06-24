'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Textinput";
		
		
    };
    
	app.register.controller('textinputCtrl', ['$scope', '$location', controller]);
	
});