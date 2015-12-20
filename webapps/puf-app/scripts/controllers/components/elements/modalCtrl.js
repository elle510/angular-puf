'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = 'Modal';
		
		$scope.prettyPrint = function() {
			prettyPrint();
		};
		
		$scope.content = '내용';
		
		$scope.smClick = function() {
			$scope.content = '내용123';
		};
    };
    
	app.register.controller('modalCtrl', ['$scope', '$location', controller]);
	
});