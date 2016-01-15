'use strict';

angular.module('AutomationSettingApp')
.controller('excelCtrl', function($scope, excelService) {
	$scope.excelButton = 'xls';
    
	/*$("#builtinButton").click(function() {
	    var $btn = $(this);
	    $btn.button('loading');
	    // Then whatever you actually want to do i.e. submit form
	    // After that has finished, reset the button state using
	    setTimeout(function () {
	        $btn.button('reset');
	    }, 1000);
	});*/
	
    // 등록/수정
	$('#excelForm').submit(function() { 
        // inside event callbacks 'this' is the DOM element so we first 
        // wrap it in a jQuery object and then invoke ajaxSubmit 
        //$(this).ajaxSubmit(options);
		console.log('호출전');
		excelService.save().then(function(data) {
			if(data.exception) {
				console.log('예외발생');
			}else {
				console.log('성공');
				console.log(data);
	    		$scope.excelButton = data;
			}
    	}, function(data) {
    		console.log('실패');
    		console.log(data);
    	});
		
        // !!! Important !!! 
        // always return false to prevent standard browser submit and page navigation 
        return false; 
    });
});