'use strict';

angular.module('TestApp')
.factory('excelService', ['$http', '$q', function($http, $q) {
	var factory = {};
	
	factory.method1 = function() {
        //..
    }

/*
	factory.save = function() {
 		var defer = $q.defer();
 		
 		// ajaxForm
 		$('#excelForm').ajaxSubmit({
 			url: '/api/test',
 			// pre-submit callback
 			beforeSubmit: function(formData, jqForm, options) {
 				// validate
 				console.log('beforeSubmit');
 				//defer.notify();
 			},
 			// post-submit callback
	    	success: function(data) {
	      		//$('body').append(data);
	    		//console.log(data);
	      		defer.resolve(data);
	    	},
	    	error: function(data) {
	    		console.log(data);
	    	}
	  	});
 		
 		return defer.promise;
 	};
*/
	
 	factory.save = function() {
   	 	var promise = $http({
    		method: 'POST', 
    		url: '/api/test'
//    		params: {uid: uid}
    	})
    	.then(function(response) {
    			// success
    			console.log(response);
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