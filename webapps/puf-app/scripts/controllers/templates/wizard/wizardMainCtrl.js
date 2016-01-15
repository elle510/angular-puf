'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location, $http) {
        
		$scope.pageTitle = "Wizard Main";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		};
		
		$scope.hwizardTitle = '가로 step 마법사';
		$scope.vwizardTitle = '세로 step 마법사';
		
		$scope.formStepTitle = 'Form Step';
		$scope.deviceSearchStepTitle = 'Device Search Step';
		$scope.roleStepTitle = 'Role Step';
		$scope.summaryStepTitle = '요약';
		
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
		
		$scope.testPopover = '테스트 Popover';
		$scope.testPopoverClick = function() {
			console.log('testClick');
			$scope.testPopover = '테스트 Popover 111';
		};
		
//		$scope.password = '';
//		$scope.email = '';
		
		// Device Search Step
		$('[data-toggle="popover1"]').popover();
//		$('[data-toggle="popover1"]').popover({ 
//			html : true,
//		    content: function(){
//		    	return $('#popover_content_wrapper').html();
//		    }
//		});
		$scope.popoverIp = function() {
//			$('#ipModal').modal('show');
//			$('[data-toggle="popover"]').popover();
		};
		
		$scope.addIp = function() {
			
		};
		
		$scope.closePopIp = function() {
			$scope.popIpApi.hide();
		};
		
		var mydata = [
      		{id:'1',invdate:'2010-05-24',name:'test',note:'note',tax:'10.00',total:'2111.00'} ,
      		{id:'2',invdate:'2010-05-25',name:'test2',note:'note2',tax:'20.00',total:'320.00'},
      		{id:'3',invdate:'2007-09-01',name:'test3',note:'note3',tax:'30.00',total:'430.00'},
      		{id:'4',invdate:'2007-10-04',name:'test',note:'note',tax:'10.00',total:'210.00'},
      		{id:'5',invdate:'2007-10-05',name:'test2',note:'note2',tax:'20.00',total:'320.00'},
      		{id:'6',invdate:'2007-09-06',name:'test3',note:'note3',tax:'30.00',total:'430.00'},
      		{id:'7',invdate:'2007-10-04',name:'test',note:'note',tax:'10.00',total:'210.00'},
      		{id:'8',invdate:'2007-10-03',name:'test2',note:'note2',amount:'300.00',tax:'21.00',total:'320.00'},
      		{id:'9',invdate:'2007-09-01',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'},
      		{id:'11',invdate:'2007-10-01',name:'test',note:'note',amount:'200.00',tax:'10.00',total:'210.00'},
      		{id:'12',invdate:'2007-10-02',name:'test2',note:'note2',amount:'300.00',tax:'20.00',total:'320.00'},
      		{id:'13',invdate:'2007-09-01',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'},
      		{id:'14',invdate:'2007-10-04',name:'test',note:'note',amount:'200.00',tax:'10.00',total:'210.00'},
      		{id:'15',invdate:'2007-10-05',name:'test2',note:'note2',amount:'300.00',tax:'20.00',total:'320.00'},
      		{id:'16',invdate:'2007-09-06',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'},
      		{id:'17',invdate:'2007-10-04',name:'test',note:'note',amount:'200.00',tax:'10.00',total:'210.00'},
      		{id:'18',invdate:'2007-10-03',name:'test2',note:'note2',amount:'300.00',tax:'20.00',total:'320.00'},
      		{id:'19',invdate:'2007-09-01',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'},
      		{id:'21',invdate:'2007-10-01',name:'test',note:'note',amount:'200.00',tax:'10.00',total:'210.00'},
      		{id:'22',invdate:'2007-10-02',name:'test2',note:'note2',amount:'300.00',tax:'20.00',total:'320.00'},
      		{id:'23',invdate:'2007-09-01',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'},
      		{id:'24',invdate:'2007-10-04',name:'test',note:'note',amount:'200.00',tax:'10.00',total:'210.00'},
      		{id:'25',invdate:'2007-10-05',name:'test2',note:'note2',amount:'300.00',tax:'20.00',total:'320.00'},
      		{id:'26',invdate:'2007-09-06',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'},
      		{id:'27',invdate:'2007-10-04',name:'test',note:'note',amount:'200.00',tax:'10.00',total:'210.00'},
      		{id:'28',invdate:'2007-10-03',name:'test2',note:'note2',amount:'300.00',tax:'20.00',total:'320.00'},
      		{id:'29',invdate:'2007-09-01',name:'test3',note:'note3',amount:'400.00',tax:'30.00',total:'430.00'}
      	];
		
		$scope.options = {
			data: mydata,
			datatype: 'local',
			height: 300,
		   	colNames:['Inv No','Date', 'Client', 'Amount','Tax','Total','Notes'],
		   	colModel:[
		   		{name:'id',index:'id', width:60, sorttype:'int'},
		   		{name:'invdate',index:'invdate', width:90, sorttype:'date', formatter:'date'},
		   		{name:'name',index:'name', width:100, editable:true},
		   		{name:'amount',index:'amount', width:80, align:'right',sorttype:'float', formatter:'number', editable:true},
		   		{name:'tax',index:'tax', width:80, align:'right',sorttype:'float', editable:true},		
		   		{name:'total',index:'total', width:80,align:'right',sorttype:'float'},		
		   		{name:'note',index:'note', width:150, sortable:false}		
		   	],		   	
		   	sortname: 'name',
		   	grouping:true,
		   	groupingView : {
		   		groupField : ['name']
		   	}
        };
		
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
//	    		$('#scriptModalButton').button('reset');
	    	});
			*/
			
		};
    };
    
	app.register.controller('wizardMainCtrl', ['$scope', '$location', '$http', controller]);
	
});