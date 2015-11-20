'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Textinput";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		$scope.message = 'zzz';
		$scope.greet = function() {
			console.log($scope.name);
		    $scope.message = "Hello, " + $scope.name;
		};
    };
    
	app.register.controller('textinputCtrl', ['$scope', '$location', controller]);
	
});