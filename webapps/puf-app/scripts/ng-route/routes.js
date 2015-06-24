'use strict';

define([
		'app' //생성한 앵귤러 모듈에 루트를 등록하기 위해 임포트
		//'route-resolver'
		//'angular-route'
	],

	function (app) {
	
		return app.config(['$routeProvider', 'routeResolverProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
	            function ($routeProvider, routeResolverProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {

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

	                $routeProvider
	                    //route.resolve() now accepts the convention to use (name of controller & view) as well as the 
	                    //path where the controller or view lives in the controllers or views folder if it's in a sub folder. 
	                    //For example, the controllers for customers live in controllers/customers and the views are in views/customers.
	                    //The controllers for orders live in controllers/orders and the views are in views/orders
	                    //The second parameter allows for putting related controllers/views into subfolders to better organize large projects
	                    //Thanks to Ton Yeung for the idea and contribution
	                	.when('/home', route.resolve('/home/', 'home'))
	                    .when('/notice', route.resolve('/operate/', 'notice'))
	                    .when('/notice/add', route.resolve('/operate/', 'noticeDetail'))
	                    .when('/notice/update', route.resolve('/operate/', 'noticeDetail'))
	                    .when('/crud', route.resolve('/template/', 'crudList'))
	                    /* page는 new, edit */
	                    .when('/crud/:page', route.resolve('/template/', 'crudForm'))
	                    .when('/crud-view', route.resolve('/template/', 'crudView'))	    
	                    .when('/form-elements', route.resolve('/template/', 'formElements'))
	                    .when('/general-elements', route.resolve('/template/', 'generalElements'))
	                    .when('/tabs', route.resolve('/template/', 'tabs'))
	                    .when('/tree', route.resolve('/template/', 'tree'))
	                    /*.when('/customerorders/:customerID', route.resolve('CustomerOrders', 'customers/'))
	                    .when('/customeredit/:customerID', route.resolve('CustomerEdit', 'customers/'))
	                    .when('/orders', route.resolve('Orders', 'orders/'))
	                    .when('/about', route.resolve('About'))*/
	                    .when('/vm-list', route.resolve('/conf/', 'vmList'))
	                    .when('/vdi/desktop-group', route.resolve('/vdi/', 'desktopGroupList'))
	                    .when('/vdi/desktop', route.resolve('/vdi/', 'desktopList'))
	                    .when('/pool-list', route.resolve('/pool/', 'poolList'))
	                    .when('/settings/createVM', route.resolve('/settings/', 'createVM'))
	                    .when('/settings/virtualization', route.resolve('/settings/', 'virtualization'))
	                    .otherwise({ redirectTo: '/' });

	        }]);
});
