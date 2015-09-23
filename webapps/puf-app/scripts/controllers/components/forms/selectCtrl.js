'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Select";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		// select
		//$scope.selectOptions = {};
		$scope.colors = [
			 {name:'black', code:'1', shade:'dark'},
		     {name:'white', code:'2', shade:'light'},
		     {name:'red', code:'3', shade:'dark'},
		     {name:'blue', code:'4', shade:'dark'},
		     {name:'yellow', code:'5', shade:'light'}
		];
		$scope.myColor = $scope.colors[2]; 	// red
		$scope.myColor1 = '2'; 				// white
		
		$scope.selectHide = function() {
			$scope.select-api.hide();
		};
    };
    
	app.register.controller('selectCtrl', ['$scope', '$location', controller]);
	
});