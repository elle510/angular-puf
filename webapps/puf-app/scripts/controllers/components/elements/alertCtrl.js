'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Alert";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		};
		
		$scope.alertClick = function() {
//			$('#alert').modal('show');
			$scope.alertApi.show();
		};
		
		$scope.onConfirm = function() {
			console.log('onConfirm 호출');
//			$('#alert').modal('hide');
		};
		
		$scope.onCancel = function() {
			console.log('onCancel');
		};
    };
    
	app.register.controller('alertCtrl', ['$scope', '$location', controller]);
	
});