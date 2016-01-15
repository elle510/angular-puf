'use strict';

angular.module('TestApp')
.controller('menuCtrl', function($scope) {
	$scope.dashboard = {
		daily_inspection: true,
		operation_level: true
	};
  
	$scope.config = {
		server_reg: true,
		network_reg: true,
		storage_reg: true,
		etc_reg: true
	};
  
	$('#myButton').on('click', function () {
	    var $btn = $(this).button('loading')
	    // business logic...
	    $btn.button('reset')
	});
});