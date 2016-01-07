'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Wizard Main";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		};
		
		$scope.hwizardTitle = '가로 step 마법사';
		$scope.vwizardTitle = '세로 step 마법사';
		
		$scope.step1Title = 'First Step';
		$scope.step2Title = 'Second Step';
		$scope.stepSummaryTitle = '요약';
		
		$scope.onStepChanging = function(event, currentIndex, newIndex) { 
			console.log('onStepChanging');
			console.log($scope.elementForm.input_password.$error);
//			console.log($scope.elementForm.input_password.$error.passwordValidate);
			console.log($scope.elementForm.input_password.$valid);
			console.log($scope.elementForm.input_password.$invalid);
			
			if($scope.elementForm.input_password.$invalid) {
				elementForm.input_password.focus();
				return false;
			}
			
			return true;
		};
		
		$scope.onStepChanged = function(event, currentIndex, priorIndex) { 
			console.log('onStepChanged');
		};
		
		$scope.onFinishing = function(event, currentIndex) { 
			console.log('onFinishing');
			return false;
		};
		
		$scope.test = '테스트';
		$scope.testClick = function() {
			console.log('testClick');
			$scope.test = '테스트111';
		};
		
//		$scope.password = '';
//		$scope.email = '';
    };
    
	app.register.controller('wizardMainCtrl', ['$scope', '$location', controller]);
	
});