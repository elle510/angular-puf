'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Popover Content";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		$scope.testPopover = '테스트 Popover';
		$scope.testPopoverClick = function() {
			console.log('testClick');
			$scope.testPopover = '테스트 Popover 111';
		};
    };
    
	app.register.controller('popoverContentCtrl', ['$scope', '$location', controller]);
	
});