'use strict';

define([
		'app' //생성한 앵귤러 모듈에 루트를 등록하기 위해 임포트
		//'route-resolver'
		//'angular-route'
	],

	function (app) {
	
		return app.config(['$stateProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
	            function ($stateProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {

	                // Change default views and controllers directory using the following:
	                routeResolverProvider.routeConfig.setBaseDirectories('views', 'scripts/controllers');
	                
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
	                	.state('modal', 			route.ui_resolve('/modal', 				'/components/elements/', 	'modal'))
	                	
	                	// Forms
	                	.state('textinput', 	route.ui_resolve('/textinput', 		'/components/forms/', 		'textinput'))
	                	.state('textarea', 		route.ui_resolve('/textarea', 		'/components/forms/', 		'textarea'))
	                	.state('checkbox', 		route.ui_resolve('/checkbox', 		'/components/forms/', 		'checkbox'))
	                	.state('radio', 		route.ui_resolve('/radio', 			'/components/forms/', 		'radio'))
	                	.state('select', 		route.ui_resolve('/select', 		'/components/forms/', 		'select'))
	                	.state('datepicker', 	route.ui_resolve('/datepicker', 	'/components/forms/', 		'datepicker'))
	                	.state('stepper', 		route.ui_resolve('/stepper', 		'/components/forms/', 		'stepper'))
	                	.state('validation', 	route.ui_resolve('/validation', 	'/components/forms/', 		'validation'))
	                	.state('wizard', 		route.ui_resolve('/wizard', 		'/components/forms/', 		'wizard'))
	                	.state('upload', 		route.ui_resolve('/upload', 		'/components/forms/', 		'upload'))
	                	
	                	.state('grid', 			route.ui_resolve('/grid', 			'/components/grid/', 		'grid'))
	                	.state('tree', 			route.ui_resolve('/tree', 			'/components/tree/', 		'tree'))
	                	.state('tab', 			route.ui_resolve('/tab', 			'/components/tab/', 		'tab'));
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
