'use strict';

angular.module('AutomationSettingApp')
.controller('systemInfoCtrl', function($scope, systemInfoService, $compile) {
	
	$scope.systemInfo = {};
	
	// System Information Objects 적용유무 View
	systemInfoService.getSystemInfo().then(function(data) {
		$scope.systemInfo = data;
	});
	
    // System Information Objects 적용유무 저장(등록/수정)
	$('#systemInfoForm').submit(function() { 
        // inside event callbacks 'this' is the DOM element so we first 
        // wrap it in a jQuery object and then invoke ajaxSubmit 
        //$(this).ajaxSubmit(options);
//		console.log('호출전');
//		$("#systemInfoButton").button('loading');
		
		systemInfoService.builtinSave('#systemInfoForm').then(function(data) {
			// Success handler
			if(data.exception) {
//				console.log('예외발생');
				$scope.resultMessage = data.localizedMessage;
			}else {
//				console.log('성공');
				console.log(data);
	    		$scope.resultMessage = '저장되었습니다.';
	    		
	    		setTimeout(function() {
	    			$('#msgModal').modal('hide');
	    		}, 1500);
			}
			
    	}, function(data) {
    		// Error handler
//    		console.log('실패');
//    		console.log(data);
    		$scope.resultMessage = 'Error';
    		
    	}).finally(function() {
    	    // Always execute this on both error and success
//    		console.log('무조건 실행');
//    		$("#systemInfoButton").button('reset');
    		$('#msgModal').modal('show');
    	});
		
        // !!! Important !!! 
        // always return false to prevent standard browser submit and page navigation 
        return false; 
    });
	
	// 모두선택
	$scope.selectAll = function() {
		$scope.systemInfo.agent = true;
		$scope.systemInfo.cpus = true;
		$scope.systemInfo.diskGroups = true;
		$scope.systemInfo.disks = true;
		$scope.systemInfo.filesystems = true;
		$scope.systemInfo.hbas = true;
		$scope.systemInfo.logicalVolumes = true;
		$scope.systemInfo.memory = true;
		$scope.systemInfo.networkInterfaces = true;
		$scope.systemInfo.operatingSystem = true;
		$scope.systemInfo.physicalDisks = true;
		$scope.systemInfo.physicalVolumes = true;
		$scope.systemInfo.volumeGroups = true;
	};
	
	// 모두취소
	$scope.cancelAll = function() {
		$scope.systemInfo.agent = false;
		$scope.systemInfo.cpus = false;
		$scope.systemInfo.diskGroups = false;
		$scope.systemInfo.disks = false;
		$scope.systemInfo.filesystems = false;
		$scope.systemInfo.hbas = false;
		$scope.systemInfo.logicalVolumes = false;
		$scope.systemInfo.memory = false;
		$scope.systemInfo.networkInterfaces = false;
		$scope.systemInfo.operatingSystem = false;
		$scope.systemInfo.physicalDisks = false;
		$scope.systemInfo.physicalVolumes = false;
		$scope.systemInfo.volumeGroups = false;
	};
	
	// Script Modal
	$scope.scriptModalTitle = '';
	$scope.scriptModalFunc = function() {
		$scope.scriptModalTitle = 'Agent';
		$scope.localizedMessage = '';
		
		var uid = 'agent';	// script의 key
		systemInfoService.getScript(uid).then(function(data) {
    		//console.log(data);
    		$scope.systemInfoModal = data;
    	});
	};
	
	/*$scope.systemInfoModal = {
		name: 'agent',
		script: 'script'
	};*/
	
	// 스크립트 저장
	$('#scriptModalForm').submit(function() { 
		
//		$("#scriptModalButton").button('loading');
		
		systemInfoService.scriptModalSave('#scriptModalForm').then(function(data) {
			// Success handler
			if(data.exception) {
//				console.log('예외발생');
				$scope.localizedMessage = data.localizedMessage;
			}else {
//				console.log('성공');
				console.log(data);
	    		$scope.localizedMessage = '저장되었습니다.';
	    		setTimeout(function() {
	    			$('#scriptModal').modal('hide');
	    		}, 1500);
			}
    	}, function(data) {
    		// Error handler
//    		console.log('실패');
    		console.log(data);
    		$scope.localizedMessage = 'Error';
    	}).finally(function() {
    	    // Always execute this on both error and success
//    		$("#scriptModalButton").button('reset');
    	});
		
        // !!! Important !!! 
        // always return false to prevent standard browser submit and page navigation 
        return false; 
    });
	
	/*
	 * System Information Custom Objects
	 *
	 */
	// 목록
	$scope.detailViewLink = function(cellvalue, options, rowObject) {
        return '<a href="javascript:void(0);" ng-click="showCustomModal(false)">' + cellvalue + '</a>';
    }
	
	$scope.options = {
		url: '/api/install/setting/systemInfo/custom/list',
		/*gridComplete: function() {
			// 1
            console.log('gridComplete');
		},*/
		colNames:['id', /*'그룹',*/'이름', '적용여부', '스크립트 종류', 'OS', '구문분석기', '설명'],
	   	colModel:[
	   		{name:'sysId',index:'sysId', hidden:true},
//	   		{name:'group', index:'group', width:60, align:"center"},
	   		{name:'name', index:'name', width:80, formatter: $scope.detailViewLink},
	   		{name:'apply', index:'apply', width:25, align:"center", formatter: 'checkbox'},
	   		{name:'scriptType', index:'scriptType', width:50},
	   		{name:'osType', index:'osType', width:50},
	   		{name:'grammar', index:'grammar', width:50},
	   		{name:'desc', index:'desc'}
	   	]
    };
	
	$scope.customLoadComplete = function() {
		// 2
//		console.log('customLoadComplete');
        $compile(angular.element('#custom_grid'))($scope);
	}
	
	/*systemInfoService.getSystemInfoCustomList().then(function(data) {
		console.log(data);
		$scope.systemInfoCustomList = data;
	});*/
	
	// 등록/수정
	/*
	$scope.saveSystemInfoCustom = function() {
		$scope.customModalTitle = 'Agent';
//		$scope.localizedMessage = '';
		
		var uid = 'agent';	// script의 key
		systemInfoService.saveSystemInfoCustom(uid).then(function(data) {
    		//console.log(data);
    		$scope.systemInfoCustom = data;
    	});
	};
	*/
	
	// 등록/수정
	$('#customModalForm').submit(function() { 
		
//		$("#scriptModalButton").button('loading');
		
		systemInfoService.saveSystemInfoCustom('#customModalForm').then(function(data) {
			// Success handler
			if(data.exception) {
//				console.log('예외발생');
				$scope.localizedMessage = data.localizedMessage;
			}else {
//				console.log('성공');
				console.log(data);
	    		$scope.localizedMessage = '저장되었습니다.';
	    		setTimeout(function() {
	    			$('#customModal').modal('hide');
	    		}, 1500);
			}
    	}, function(data) {
    		// Error handler
//    		console.log('실패');
    		console.log(data);
    		$scope.localizedMessage = 'Error';
    	}).finally(function() {
    	    // Always execute this on both error and success
//    		$("#scriptModalButton").button('reset');
    	});
		
        // !!! Important !!! 
        // always return false to prevent standard browser submit and page navigation 
        return false; 
    });
	
	// 모달창
	$scope.customModalTitle = '';
	$scope.showCustomModal = function(mode) {
		if(mode == true) {
			// create
			$scope.customModalTitle = 'System Information Custom Objects - 등록';
		}else {
			// update
			$scope.customModalTitle = 'System Information Custom Objects - 수정';
		}
		$scope.localizedMessage = '';
		$('#customModal').modal('show');
	};
	
	// 이름
	// 미입력시 입력메시지 툴팁제거
	$('input[name="name"]').on("invalid", function(e) {
	    e.preventDefault();
	});
	
	// 적용여부
	$scope.apply = true;
	
	// 타임아웃
	$scope.timeoutValue = 15;
	
	// 구문 분석기/스크립트 종류/OS 목록
	$scope.getSystemInfoComboList = function() {
		systemInfoService.getSystemInfoComboList().then(function(data) {
			var result = data.resultValue;
			console.log(result);
			$scope.grammarList = result.grammar;
			result.scriptType.unshift('기본 스크립트');
			$scope.scriptTypeList = result.scriptType;
			$scope.osTypeList = result.osType;
			
			setTimeout(function() {
//				$('select[name="scriptType"]').prepend('<option value="-1">기본 스크립트</option>');
				$('select[name="scriptType"] option:eq(0)').replaceWith('<option value="-1">기본 스크립트</option>');
    		}, 100);
		});
	};
	$scope.selectedGrammar = 'value.grammar';
	$scope.selectedScriptType = '기본 스크립트';
	$scope.selectedOsType = 'Server';
	$scope.getSystemInfoComboList();
	
	/*
	$scope.colors = [
	    			 {name:'black', code:'1', shade:'dark'},
	    		     {name:'white', code:'2', shade:'light'},
	    		     {name:'red', code:'3', shade:'dark'},
	    		     {name:'blue', code:'4', shade:'dark'},
	    		     {name:'yellow', code:'5', shade:'light'}
	    		];
	$scope.myColor = '2';//$scope.colors[2]; 	// red
	*/
	
	// 삭제
	$scope.removeSystemInfoCustom = function() {
		var selectedRows = $scope.gridApi.selectedRows();
		console.log(selectedRows);
	};
	
	// 새로고침
	$scope.refreshSystemInfoCustom = function() {
		$scope.gridApi.refresh();
	};
});