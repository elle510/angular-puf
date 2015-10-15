'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Tab";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		$scope.tabs = [
		                { title:'Dynamic Title 1', content:'Dynamic content 1' },
		                { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
		              ];

		$scope.alertMe = function() {
			setTimeout(function() {
				alert('You\'ve selected the alert tab!');
			});
		};
		
		$scope.temp1 = "template page 1";
		$scope.temp2 = "template page 2";
		
    };
    
	app.register.controller('tabCtrl', ['$scope', '$location', controller]);
	
});