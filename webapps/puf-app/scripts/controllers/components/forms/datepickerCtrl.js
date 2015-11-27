'use strict';

define(['app', 'moment'], function(app, moment) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Datepicker";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		// datapicker default
		$scope.getDate = function() {
			$scope.date_string = $scope.dtapi.getDate();
			
			// Date 객체리턴
			/*
			console.log($scope.dtapi.getDate());
			console.log(typeof $scope.dtapi.getDate());
			console.log(typeof $scope.dtapi.getDate()._d);
			console.log($scope.dtapi.getDate()._d.getFullYear());
			*/
		}
		
		/*
		$scope.fromDate_options = {
				//defaultDate: $scope.bulletin.registerDate
		};
		*/
		
		$scope.toDate_options = {
            useCurrent: false //Important! See issue #1075
        };
		
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
		
		// Daterangepicker
		$scope.daterange_option = {
			singleDatePicker: true,
			timePicker: true
		};
		
		$scope.getDateSingleRange = function() {
			$scope.date_single_range_string = $scope.api_single_range.getDate();
			$scope.date_single_range_dateString = $scope.api_single_range.startDateString();
			/*
			console.log($scope.api_single_range.getDate());
			console.log($scope.api_single_range.getDate()._d);
			console.log(typeof $scope.api_single_range.getDate());
			console.log(typeof $scope.api_single_range.getDate()._d);
			*/
		};
		
		$scope.getDateRange1 = function() {
			$scope.from_date_range_string = $scope.api_range.getStartDate();
			$scope.to_date_range_string = $scope.api_range.getEndDate();
			
			// start date
			/*
			console.log($scope.api_range.getStartDate());
			console.log($scope.api_range.getStartDate()._d);
			console.log(typeof $scope.api_range.getStartDate());
			console.log(typeof $scope.api_range.getStartDate()._d);
			*/
			
			// end date
			/*
			console.log($scope.api_range.getEndDate());
			console.log($scope.api_range.getEndDate()._d);
			console.log(typeof $scope.api_range.getEndDate());
			console.log(typeof $scope.api_range.getEndDate()._d);
			*/
		};
		
		// Predefined Ranges
		$scope.daterange_predefined_ranges = {
			'금일': [moment(), moment()],
		    '전일': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		    '일주일전': [moment().subtract(6, 'days'), moment()],
		    '한달전': [moment().subtract(29, 'days'), moment()],
		    '이번달': [moment().startOf('month'), moment().endOf('month')],
		    '지난달': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		};
		
		$scope.getDatePredefinedRange = function() {
			$scope.start_predefined_range_string = $scope.api_predefined_range.getStartDate();
			$scope.end_predefined_range_string = $scope.api_predefined_range.getEndDate();
		};
		
    };
    
	app.register.controller('datepickerCtrl', ['$scope', '$location', controller]);
	
});