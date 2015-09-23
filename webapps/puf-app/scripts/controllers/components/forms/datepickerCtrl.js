'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Datepicker";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		// datapicker default
		$scope.getDate = function() {
			$scope.date_string = $scope.dtapi.getDate();
			console.log(typeof $scope.dtapi.getDate());
			console.log(typeof $scope.dtapi.getDate()._d);
			console.log($scope.dtapi.getDate()._d.getFullYear());
		}
		
		/*
		$scope.fromDate_options = {
				//defaultDate: $scope.bulletin.registerDate
		};
		*/
		
		// datapicker range
		$scope.getDateRange = function() {
			$scope.from_date_string = $scope.api_from_range.getDate();
			$scope.to_date_string = $scope.api_to_range.getDate();
			/*
			console.log(typeof $scope.api_from_range.getDate());
			console.log(typeof $scope.api_from_range.getDate()._d);
			console.log($scope.api_from_range.getDate()._d.getFullYear());
			console.log(typeof $scope.api_to_range.getDate());
			console.log(typeof $scope.api_to_range.getDate()._d);
			console.log($scope.api_to_range.getDate()._d.getFullYear());
			*/
		}
    };
    
	app.register.controller('datepickerCtrl', ['$scope', '$location', controller]);
	
});