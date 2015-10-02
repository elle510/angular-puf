'use strict';

var dependencies = [
                    'app'           
                ];

define( dependencies, function(app) {
	
	var controller = function ($scope, $stateParams, $location) {
        
		//console.log($routeParams);
		
		$scope.bulletin = {};
//		console.log($stateParams);
		
		if($stateParams.type == 'create') {
			$scope.pageTitle = 'CRUD - Create';
			$scope.submitLabel = '저장';//"등록";
			$scope.isEdit = false;
			
			// 공지종류
			$scope.bulletin.normal = true;
			$scope.bulletin.urgent = false;
			
			// 우선순위
			$scope.isImportance = false;
			$scope.bulletin.importance = 1;
			//element.find("input").attr("disabled", true);
			//element.find("input").removeAttr("disabled");
			
		}else if($stateParams.type == 'update') {
			$scope.pageTitle = 'CRUD - Update';
			$scope.submitLabel = '저장';//"수정";
			$scope.isEdit = true;
			
//			bulletinService.getNotice($routeParams.uid).then(function(data) {
//        		console.log(data);
//        		$scope.bulletin = data;
//        		
//        		// 공지기간
//        		$scope.dtapi.setDate($scope.bulletin.registerDate);
//        		/*
//        		$scope.fromDate_options = {
//        			defaultDate: $scope.bulletin.registerDate
//                };
//        		*/
//        		
//        		$scope.toDate_options = {
//        			pickTime: true,
//        			format: "YYYY/MM/DD hh:mm",
//            		defaultDate: $scope.bulletin.expirationDate
//        		};
//        		
//        		// 공지대상
//        		
//        		// 공지종류
//        		
//        	});
		}
		
		// 공지대상
		$scope.colors = [
		    			 {name:'black', code:'1', shade:'dark'},
		    		     {name:'white', code:'2', shade:'light'},
		    		     {name:'red', code:'3', shade:'dark'},
		    		     {name:'blue', code:'4', shade:'dark'},
		    		     {name:'yellow', code:'5', shade:'light'}
		    		];
		
		// 일반공지 체크 change
		$scope.normalChange = function() {
//			$scope.checkValue1 = $scope.checkValue1 == true ? false : true;
		};
		
		// 우선순위 체크 change
		$scope.importanceChange = function() {
//			$scope.checkValue1 = $scope.checkValue1 == true ? false : true;
		};
		
		
		// 등록/수정
		$('#noticeForm').submit(function() { 
	        // inside event callbacks 'this' is the DOM element so we first 
	        // wrap it in a jQuery object and then invoke ajaxSubmit 
	        //$(this).ajaxSubmit(options);
			//console.log('호출전');
			//console.log($('#fromDate').data("DateTimePicker").getDate());
			console.log($scope.dtapi.getDate());
			console.log(typeof $scope.dtapi.getDate());
			console.log(typeof $scope.dtapi.getDate()._d);
			console.log($scope.dtapi.getDate()._d.getFullYear());
			
			bulletinService.save().then(function(data) {
				if(data.exception) {
					console.log('예외발생');
				}else {
					console.log('성공');
					console.log(data);
		    		$scope.data = data;
				}
	    	}, function(data) {
	    		console.log('실패');
	    		console.log(data);
	    	});
			
	        // !!! Important !!! 
	        // always return false to prevent standard browser submit and page navigation 
	        return false; 
	    }); 
		
		
		/*
		$scope.save = function() {
			if($routeParams.page == 'new') {
				// 등록/수정
				bulletinService.save().then(function(data) {
	        		console.log(data);
	        		$scope.data = data;
	        	});
			}else if($routeParams.page == 'edit') {
				// 수정
				bulletinService.update().then(function(data) {
	        		console.log(data);
	        		$scope.data = data;
	        	});
			}
		}
		*/
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		$scope.daterangepicker_options = {
			timePicker: true	
		};
		
		//console.log($("#fromDate"));
		//$("#fromDate").data("DateTimePicker").enable();
		
		// checkbox
		$scope.checkValue1 = true;
		$scope.checkValue2 = "YES";
		$scope.change = function() {
			console.log("change");
			$scope.checkValue1 = $scope.checkValue1 == true ? false : true;
		};
		
		// radio
		$scope.radioValue1 = 'blue';
		$scope.radioValue2 = 'seoul';
		$scope.specialValue = {
	      "id": "12345",
	      "value": "green"
	    };
		
		// select
		//$scope.selectOptions = {};
		$scope.colors = [
			 {name:'black', code:'1', shade:'dark'},
		     {name:'white', code:'2', shade:'light'},
		     {name:'red', code:'3', shade:'dark'},
		     {name:'blue', code:'4', shade:'dark'},
		     {name:'yellow', code:'5', shade:'light'}
		];
		$scope.myColor = $scope.colors[2]; // red
		$scope.myColor1 = '2'; // white
		
		$scope.selectHide = function() {
			$scope.select-api.hide();
		};
		
		// stepper
		$scope.stepperValue = 10;
		
//        $scope.save = function () {
//            console.log('save');
//            console.log($scope.dtapi.getDate());
//            //$("#fromDate").data("DateTimePicker").enable();
//    		
//            // 참고사이트 https://docs.angularjs.org/api/ng/service/$http
//            // bulletinService 에서 처리한다.
////            $http.post('api/add_user', user).success(function(){
////            	$scope.reset();
////                $scope.activePath = $location.path('/');
////            }
//        };
        
    };
    
	app.register.controller('formCtrl', ['$scope', '$stateParams', '$location', controller]);
	
});