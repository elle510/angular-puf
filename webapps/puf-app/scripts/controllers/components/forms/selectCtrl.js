'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Form Select";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		// 사용자가 조작하기 전에는 $scope.myColor 설정하면 설정값으로 선택이 되나
		// 사용자가 조작하고 나면 그 후로는 $scope.myColor 설정이 작동하지 않는다.
		// 사용자 조작에 의해 $scope.myColor 변수 값이 바뀌지 않는다.
		// ngModel은 초기값 설정에 쓰고 (ctrl의 변수와는 init할 때 연결만 시켜주고 역할을 끝내는 것 같음 - ctrl과 view 연결 끊김(?), view에서는 연결유지)
		// ctrl에서 값을 설정하거나 사용자 조작에 의한 값을 얻어올때는 각 컴포넌트 별로 api를 통해 해야한다.
		// select
		//$scope.selectOptions = {};
		$scope.colors = [
			 {name:'black', code:'1', shade:'dark'},
		     {name:'white', code:'2', shade:'light'},
		     {name:'red', code:'3', shade:'dark'},
		     {name:'blue', code:'4', shade:'dark'},
		     {name:'yellow', code:'5', shade:'light'}
		];
		$scope.myColor = '3';//$scope.colors[2]; 	// red
		$scope.myColor1 = '2'; 				// white
		
		$scope.selectHide = function() {
			$scope.select-api.hide();
		};
		
		$scope.greet = function() {
			console.log($scope.myColor1);
			$scope.myColor = 5;
		    //$scope.message = "Hello, " + $scope.name;
		};
    };
    
	app.register.controller('selectCtrl', ['$scope', '$location', controller]);
	
});