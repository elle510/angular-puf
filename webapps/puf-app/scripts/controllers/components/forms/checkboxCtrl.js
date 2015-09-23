'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Checkbox";
		
		// checkbox
		$scope.checkValue1 = true;
		$scope.checkValue2 = "YES";
		$scope.change = function() {
			console.log("change");
			$scope.changeText = $scope.checkValue3 == true ? '체크' : '체크해제';
		};
		
		// inline checkbox
		$scope.inValue1 = true;
		$scope.inValue2 = "YES";
		$scope.inValue3 = false;
		$scope.inValue4 = false;
		/*
		$scope.change = function() {
			console.log("change");
			$scope.changeText = $scope.checkValue3 == true ? '체크' : '체크해제';
		};
		*/
		
		// 소스코드가 보여지는 시점에 호출되야 한다.(onload, 페이지가 보여질때 즉 컨트롤러에서 호출, 탭은 선택되어 보여질때)
		//prettyPrint();
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		//
		$scope.checkSwitchValue1 = true;
    };
    
	app.register.controller('checkboxCtrl', ['$scope', '$location', controller]);
	
});