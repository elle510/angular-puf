'use strict';

angular.module('TestApp')
.factory('systemInfoService', ['$http', '$q', function($http, $q) {
	var factory = {};
	
 	factory.builtinSave = function(form) {
   	 	
   	 	var defer = $q.defer();
	 	
		// ajaxForm
		$(form).ajaxSubmit({
			url: '/api/install/setting/systemInfo/save',
			// pre-submit callback
			beforeSubmit: function(formData, jqForm, options) {
				// validate
				//console.log('beforeSubmit');
				//defer.notify();
			},
			// post-submit callback
	    	success: function(data) {
	      		//$('body').append(data);
	    		//console.log(data);
	      		defer.resolve(data);
	    	}
	  	});
		
		return defer.promise;
		
 	};
 	
 	// 스크립트 Modal View
 	factory.getScript = function(uid) {
 		var promise = $http({
    		method: 'POST', 
    		url: '/api/install/setting/systemInfo/script/view',
    		params: {uid: uid}
    	})
    	.then(function(response) {
    			// success
//    			console.log(response);
    			return response.data;
    		},
    		function(response) {	// optional
    			// failed
    			console.log('fail');
//    			console.log(response);
    		}
    	);
   	 	return promise;
 	}
 	
 	// 스크립트 Modal 저장
 	factory.scriptModalSave = function(form) {
 		
   	 	var defer = $q.defer();
   	 	
		// ajaxForm
		$(form).ajaxSubmit({
			url: '/api/install/setting/systemInfo/script/save',
			// pre-submit callback
			beforeSubmit: function(formData, jqForm, options) {
				// validate
				//console.log('beforeSubmit');
				//defer.notify();
			},
			// post-submit callback
	    	success: function(data) {
	      		//$('body').append(data);
	    		//console.log(data);
	      		defer.resolve(data);
	    	}
	  	});
		
		return defer.promise;
		
 	};
 	
 	/*
	 * System Information Objects
	 *
	 */
 	// System Information Objects View
 	factory.getSystemInfo = function(uid) {
 		var promise = $http({
    		method: 'POST', 
    		url: '/api/install/setting/systemInfo/view',
    		params: {uid: uid}
    	})
    	.then(function(response) {
    			// success
//    			console.log(response);
    			return response.data;
    		},
    		function(response) {	// optional
    			// failed
    			console.log('fail');
//    			console.log(response);
    		}
    	);
   	 	return promise;
 	};
 	
 	// 저장
 	factory.saveSystemInfo = function(form) {
 		
   	 	var defer = $q.defer();
	 	
   	 	// hidden uid가 전달되면 update / 아니면 insert
		// ajaxForm
		$(form).ajaxSubmit({
			url: '/api/install/setting/systemInfo/save',
			// post-submit callback
	    	success: function(data) {
	      		defer.resolve(data);
	    	}
	  	});
		
		return defer.promise;
		
 	};
 	
 	/*
	 * System Information Custom Objects
	 *
	 */
	// 목록
 	factory.getSystemInfoCustomList = function() {
 		var promise = $http({
    		method: 'POST', 
    		url: '/api/install/setting/systemInfo/custom/list'
//    		params: {uid: uid}
    	})
    	.then(function(response) {
    			// success
    			return response.data;
    		},
    		function(response) {	// optional
    			// failed
    			console.log('systemInfoService::getSystemInfoCustomList Fail');
    		}
    	);
   	 	return promise;
 	};
 	
 	// 저장
 	factory.saveSystemInfoCustom = function(form) {
 		
   	 	var defer = $q.defer();
	 	
   	 	// hidden uid가 전달되면 update / 아니면 insert
		// ajaxForm
		$(form).ajaxSubmit({
			url: '/api/install/setting/systemInfo/custom/save',
			// post-submit callback
	    	success: function(data) {
	      		defer.resolve(data);
	    	}
	  	});
		
		return defer.promise;
		
 	};
 	
 	// 구문 분석기/스크립트 종류/OS 목록
 	factory.getSystemInfoComboList = function() {
 		var promise = $http({
    		method: 'POST', 
    		url: '/api/install/setting/systemInfo/comboList'
//    		params: {uid: uid}
    	})
    	.then(function(response) {
    			// success
//    			console.log(response);
    			return response.data;
    		},
    		function(response) {	// optional
    			// failed
    			console.log('fail');
//    			console.log(response);
    		}
    	);
   	 	return promise;
 	};
 	
	
	return factory;

}]);