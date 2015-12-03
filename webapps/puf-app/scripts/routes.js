'use strict';

define([
		'app'	//생성한 앵귤러 모듈에 루트를 등록하기 위해 임포트
		//'route-resolver'
		//'angular-route'
	],

	function (app) {
		// config 는 provider 만 파라미터로 받는다.
		return app.config(['$stateProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider', 'appLauncherProvider',
	            function ($stateProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider, appLauncherProvider) {

	                // Change default views and controllers directory using the following:
					var rootPath = appLauncherProvider.getRootPath();
					if(rootPath == '/puf-app') {	// context root 가 / 라는 의미
						rootPath = '';
					}
	                routeResolverProvider.routeConfig.setBaseDirectories(rootPath + '/puf-app/views', rootPath + '/puf-app/scripts/controllers');
	                
	                app.register =
	                {
	                    controller: $controllerProvider.register,
	                    directive: $compileProvider.directive,
	                    filter: $filterProvider.register,
	                    factory: $provide.factory,
	                    service: $provide.service
	                };

	                // Define routes - controllers will be loaded dynamically
	                var route = routeResolverProvider.route;

	                $stateProvider // url, path, view file명
	                	.state('home', 			route.ui_resolve('/home', 				'/home/', 					'home'))
	                	.state('fontAwesome', 	route.ui_resolve('/font-awesome', 		'/icon/', 					'fontAwesome'))
	                	.state('psIconFont', 	route.ui_resolve('/psIconFont', 		'/icon/', 					'psIconFont'))
	                	
	                	// Elements
	                	.state('button', 			route.ui_resolve('/button', 			'/components/elements/', 	'button'))
	                	.state('buttonDropdown', 	route.ui_resolve('/button-dropdown', 	'/components/elements/', 	'buttonDropdown'))
	                	.state('alert', 			route.ui_resolve('/alert', 				'/components/elements/', 	'alert'))
	                	.state('modal', 			route.ui_resolve('/modal', 				'/components/elements/', 	'modal'))
	                	.state('panel', 			route.ui_resolve('/panel', 				'/components/elements/', 	'panel'))
	                	.state('hiddenContent', 	route.ui_resolve('/hidden-content', 	'/components/elements/', 	'hiddenContent'))
	                	.state('contextMenu', 		route.ui_resolve('/context-menu', 		'/components/elements/', 	'contextMenu'))
	                	
	                	// Forms
	                	.state('textinput', 	route.ui_resolve('/textinput', 		'/components/forms/', 		'textinput'))
	                	.state('textarea', 		route.ui_resolve('/textarea', 		'/components/forms/', 		'textarea'))
	                	.state('checkbox', 		route.ui_resolve('/checkbox', 		'/components/forms/', 		'checkbox'))
	                	.state('radio', 		route.ui_resolve('/radio', 			'/components/forms/', 		'radio'))
	                	.state('select', 		route.ui_resolve('/select', 		'/components/forms/', 		'select'))
	                	.state('datepicker', 	route.ui_resolve('/datepicker', 	'/components/forms/', 		'datepicker'))
	                	.state('stepper', 		route.ui_resolve('/stepper', 		'/components/forms/', 		'stepper'))
	                	.state('dualListbox', 	route.ui_resolve('/dualListbox', 	'/components/forms/', 		'dualListbox'))
	                	.state('fieldset', 		route.ui_resolve('/fieldset', 		'/components/forms/', 		'fieldset'))
	                	.state('validation', 	route.ui_resolve('/validation', 	'/components/forms/', 		'validation'))
	                	.state('wizard', 		route.ui_resolve('/wizard', 		'/components/forms/', 		'wizard'))
	                	.state('upload', 		route.ui_resolve('/upload', 		'/components/forms/', 		'upload'))
	                	
	                	.state('grid', 			route.ui_resolve('/grid', 			'/components/grid/', 		'grid'))
	                	.state('tree', 			route.ui_resolve('/tree', 			'/components/tree/', 		'tree'))
	                	.state('tab', 			route.ui_resolve('/tab', 			'/components/tab/', 		'tab'))
	                	
	                	// Templates
	                	.state('crud-list', 		route.ui_resolve('/crud/list', 			'/templates/crud/', 		'list'))
	                	.state('crud-save', 		route.ui_resolve('/crud/:type?uid', 	'/templates/crud/', 		'form'))
	                	.state('crud-view', 		route.ui_resolve('/crud/view/:uid', 	'/templates/crud/', 		'view'))
	                	.state('wizard-template', 	route.ui_resolve('/wizard-template', 	'/templates/wizard/', 		'wizardMain'));
	                	
	                	/*
	                	.state('home', {
	                		url: '/home', 
	                		templateUrl: 'views/home/home.html', 
	                		controller: function($scope) {
	                			$scope.pageTitle = "Home";
	                		}
	                	});
	                	*/
	                	
//	                    .when('/notice', route.resolve('/operate/', 'notice'))
//	                    .when('/notice/add', route.resolve('/operate/', 'noticeDetail'))
//	                    .when('/notice/update', route.resolve('/operate/', 'noticeDetail'))
//	                    .when('/crud', route.resolve('/template/', 'crudList'))
//	                    /* page는 new, edit */
//	                    .when('/crud/:page', route.resolve('/template/', 'crudForm'))
//	                    .when('/crud-view', route.resolve('/template/', 'crudView'))	    
//	                    .when('/form-elements', route.resolve('/template/', 'formElements'))
//	                    .when('/general-elements', route.resolve('/template/', 'generalElements'))
//	                    .when('/tabs', route.resolve('/template/', 'tabs'))
//	                    .when('/tree', route.resolve('/template/', 'tree'))
//	                    /*.when('/customerorders/:customerID', route.resolve('CustomerOrders', 'customers/'))
//	                    .when('/customeredit/:customerID', route.resolve('CustomerEdit', 'customers/'))
//	                    .when('/orders', route.resolve('Orders', 'orders/'))
//	                    .when('/about', route.resolve('About'))*/
//	                    .when('/vm-list', route.resolve('/conf/', 'vmList'))
//	                    .when('/vdi/desktop-group', route.resolve('/vdi/', 'desktopGroupList'))
//	                    .when('/vdi/desktop', route.resolve('/vdi/', 'desktopList'))
//	                    .when('/pool-list', route.resolve('/pool/', 'poolList'))
//	                    .when('/settings/createVM', route.resolve('/settings/', 'createVM'))
//	                    .when('/settings/virtualization', route.resolve('/settings/', 'virtualization'))
//	                    .otherwise({ redirectTo: '/' });

	        }]);
});
