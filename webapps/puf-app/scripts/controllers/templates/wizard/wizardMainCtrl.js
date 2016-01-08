'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location, $http) {
        
		$scope.pageTitle = "Wizard Main";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		};
		
		$scope.hwizardTitle = '가로 step 마법사';
		$scope.vwizardTitle = '세로 step 마법사';
		
		$scope.step1Title = 'First Step';
		$scope.step2Title = 'Second Step';
		$scope.stepSummaryTitle = '요약';
		
		// step1 validation check
		$scope.validateStep1 = function() {
			if($scope.elementForm.input_password.$invalid) {
				elementForm.input_password.focus();
				return false;
			}
			
			if($scope.elementForm.input_password1.$invalid) {
				elementForm.input_password1.focus();
				return false;
			}
			
			return true;
		};
		
		/* wizard 내에서 처리
		function validateStep(currentIndex) {
			if(currentIndex == 0) {
				return validateStep1();
			}
			
			return true;
		}
		*/
		
		$scope.onStepChanging = function(event, currentIndex, newIndex) { 
//			console.log('onStepChanging currentIndex: ' + currentIndex);
//			console.log('onStepChanging newIndex: ' + newIndex);
//			console.log($scope.elementForm.input_password.$error);
////			console.log($scope.elementForm.input_password.$error.passwordValidate);
//			console.log($scope.elementForm.input_password.$valid);
//			console.log($scope.elementForm.input_password.$invalid);
			
//			return validateStep(currentIndex);
			return true;
		};
		
		$scope.onStepChanged = function(event, currentIndex, priorIndex) { 
			console.log('onStepChanged');
		};
		
		$scope.onFinishing = function(event, currentIndex) { 
			console.log('onFinishing');
//			if($scope.elementForm.$invalid) {
//				return validateStep(currentIndex);
//			}
			
			return true;
		};
		
		$scope.onFinished = function(event, currentIndex) {
			console.log('onFinished');
		};
		
		$('#elementForm').submit(function() { 
			console.log('submit elementForm');
			
			$(this).ajaxSubmit({
//				url: 'url',
//		    	success: function(data) {
//		    		
//		    	}
		  	});
			
			return false;
		});
		
		$scope.test = '테스트';
		$scope.testClick = function() {
			console.log('testClick');
			$scope.test = '테스트111';
		};
		
//		$scope.password = '';
//		$scope.email = '';
		
		// Vertical Wizard(Not Form)
		// step1 validation check
		$scope.validateNotFormStep1 = function() {
			console.log('validateNotFormStep1');
			return true;
		};
		
		$scope.validateNotFormStep2 = function() {
			console.log('validateNotFormStep2');
			return true;
		};
		
		$scope.validateNotFormStep3 = function() {
			console.log('validateNotFormStep3');
			return true;
		};
		
		$scope.onNotFormFinished = function(event, currentIndex) {
			console.log('onNotFormFinished');
			save();
		};
		
		function save() {
			
			var uid = 'agent';	// 
			
			$http({
	    		method: 'POST', 
	    		url: '/api/install/setting/systemInfo/view',
	    		params: {uid: uid}
	    	})
	    	.then(function(response) {
	    			// success
//	    			console.log(response);
	    			return response.data;
	    		},
	    		function(response) {	// optional
	    			// failed
	    			console.log('fail');
//	    			console.log(response);
	    		}
	    	);
	   	 	
			/*
			systemInfoService.saveSystemInfoCustom(uid).then(function(data) {
	    		//console.log(data);
				if(data.exception) {
//					console.log('예외발생');
					$scope.localizedMessage = data.localizedMessage;
				}else {
//					console.log('성공');
					console.log(data);
		    		$scope.localizedMessage = '저장되었습니다.';
		    		setTimeout(function() {
		    			$('#vwizardModal').modal('hide');
		    		}, 1500);
				}
	    	}, function(data) {
	    		// Error handler
//	    		console.log('실패');
	    		console.log(data);
	    		$scope.localizedMessage = 'Error';
	    	}).finally(function() {
	    	    // Always execute this on both error and success
//	    		$("#scriptModalButton").button('reset');
	    	});
			*/
			
		};
    };
    
	app.register.controller('wizardMainCtrl', ['$scope', '$location', '$http', controller]);
	
});