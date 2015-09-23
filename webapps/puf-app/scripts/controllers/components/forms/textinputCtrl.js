'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Textinput";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
    };
    
	app.register.controller('textinputCtrl', ['$scope', '$location', controller]);
	
});