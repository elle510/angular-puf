'use strict';

angular.module('TestApp', ['ui.router', 'ps.puf'])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	// For any unmatched url, redirect to /state1
	$urlRouterProvider.otherwise("/menu");
	
	// Now set up the states
	$stateProvider
	    .state('menu', {
	      url: '/menu',
	      templateUrl: 'views/menu.html',
	      controller: 'menuCtrl'
	    })
		.state('workspace', {
	      url: '/workspace',
	      templateUrl: 'views/workspace.html',
	      controller: 'workspaceCtrl'
	    })
	    .state('systemInfo', {
	      url: '/system-info',
	      templateUrl: 'views/systemInfo.html',
	      controller: 'systemInfoCtrl'
	    })
	    .state('excel', {
	      url: '/excel',
	      templateUrl: 'views/excel.html',
	      controller: 'excelCtrl'
	    })
	    .state('report', {
	      url: '/report',
	      templateUrl: 'views/report.html',
	      controller: 'reportCtrl'
	    });
	  
}])
.controller('AppController', function($scope, $state, $location) {
	$('.nav-list>li').click(function() {
		$('.nav-list>li').removeClass('active');
		$(this).addClass('active');
	});
});