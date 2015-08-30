'use strict';

//requireJS 모듈 선언 - [pufApp 앵귤러 모듈]
define([
		'angular', // 앵귤러 모듈을 사용하기 위해 임포트		
		'angular-ui-router',
		'ps-route-resolver',
		'puf'
	],
	
/*
	이 부분도 주의깊게 살펴봐야한다.
	위의 디펜던시들이 모두 로드된 뒤에 아래의 콜백이 실행된다.
	디펜던시들이 리턴하는 객체들을 콜백함수의 파라메터로 받게 되는데,
	자세히보면 route-config와 같이 snake case로 된 파일명이,
	파라메터로 받을 때는 routeConfig와 같이 camel case로 바뀌는 것을 볼 수 있다.
*/	
	//디펜던시 로드뒤 콜백함수
	function (angular) {
	
		// 위의 디펜던시를 가져와서 콜백을 수행하게 되는데,
		// 리턴하는 내용이 실제 사용되는 부분이겠지?
		// 여기서는 xeusApp이라는 앵귤러 모듈을 리턴한다.
		
		// 모듈 선언
		var app = angular.module('pufApp', ['ui.router', 'ps.routeResolver', 'ps.puf']);
		
		// 공통 컨트롤러 설정 - 모든 컨트롤러에서 공통적으로 사용하는 부분들 선언
		app.controller('CommonController', function($scope, $state, $window, $location) {
		
			// 스타일시트 업데이트
			$scope.$on('updateCSS', function(event, args) {
			 
				// 파라메터로 받아온 스타일 시트 반영
				$scope.stylesheets = args;
			});
			
			// CSS 설정
			//$scope.$emit('updateCSS', ['css/css1.css']);
			
			// Breadcrumbs 설정
			$scope.breadcrumbs = '/Home';
			//$scope.url = '#/home';
			$state.go('home');
			
			$scope.mainMenuOptions = {
				'core': {
					'data': {
						'url': 'json/main-menu.json',
						'type': 'POST',
						'dataType': 'json',
						'contentType': 'application/json; charset=utf-8',
						'cache': false,
						'beforeSend': function (xhr) { 
							if (xhr.overrideMimeType) { 
								xhr.overrideMimeType("application/json"); 
							} 
						},
						'data': function (node) {
							//console.log(node.id);
							return node;//{ 'id' : node.id };
						}
					}
				}
			};
			
			$scope.refresh = function() {
				$scope.mainMenuOptions = {
					'core': {
						'data': {
							'url': 'json/main-menu.json',
							'type': 'POST',
							'dataType': 'json',
							'contentType': 'application/json; charset=utf-8',
							'cache': false,
							'beforeSend': function (xhr) { 
								if (xhr.overrideMimeType) { 
									xhr.overrideMimeType("application/json"); 
								} 
							},
							'data': function (node) {
								//console.log(node.id);
								return { 'id' : node.id };
							}
						}
					}
				};
			};
			
			$scope.$on('changedTreeNode', function(event, args) {
				console.log('changedTreeNode');
				//console.log(args);
				$scope.breadcrumbs = args;
			});
			
			$scope.changed = function(event) {
				//console.log('changed');
				//console.log(data);
				//console.log(data.instance.get_path(data.node, '/'));
				/*
				console.log('changed');
				console.log(data.node);
				console.log(data.instance);
				console.log(data.instance.get_node(data.selected[0]).text);
				*/
				//console.log(data.instance.get_node(data.selected[i]).text);
				//console.log(data.node.original);
				//console.log(data.instance.get_json()[0]);
				//var node = data.node;
				/*
				var path,
				json = data.node.original;
				if(angular.isDefined(json.url)) {
        			//console.log(json.url);
        			//console.log(node);
					path = '/' + data.instance.get_path(data.node, '/');
					$scope.$emit('changedTreeNode', path);
        		}
        		*/
			};
			
			$scope.dblclick = function(event) {
				//console.log('dblclick');
				//console.log(event);
			};
			
			$scope.selectNode = function(event, data) {
				//console.log('select_node');
				var json = data.node.original;
				if(angular.isDefined(json.route)) {
        			//console.log(json.route);
        			//console.log(node);
					$scope.breadcrumbs = '/' + data.instance.get_path(data.node, '/');
					//console.log($scope.breadcrumbs);
//					$location.path("/home");
//			    	$scope.$apply();
			    	//$state.go('home');
			    	//$state.go(json.route);
					var isExtTab = false;
					angular.forEach($scope.tabs, function(tab) {
						if (tab.route == json.route) {
							$scope.$apply();
							$scope.go(json.route);
							isExtTab = true;
						}
					});
					if(isExtTab == false) {
						
						$scope.tabs.push({heading: json.text, route: json.route, active: false, removable: true});
						$scope.$apply();
						$scope.go(json.route);
						
						
						//$scope.addMainTab({heading: json.text, route: json.route, active: false});
						//$scope.apiTab.addTab({heading: json.text, route: json.route, active: false});
						//$scope.go(json.route);
					}
					
        		}else if(angular.isDefined(json.url)) {
//        			$window.location.href = json.url;
        			$window.open(json.url);
        		}
				event.stopPropagation();
				event.stopImmediatePropagation();
			};
			
			// tab
			$scope.tabs = [{ heading: "Home", route: "home", active: false, removable: false }
			               /*{ heading: "Tab 1", route:"home", active:false },
			               { heading: "Tab 2", route:"fontAwesome", active:false },
			               { heading: "Tab 3", route:"psIconFont", active:false }*/
			           ];
			        
			$scope.go = function(route) {
				$state.go(route);
			};
        
			$scope.active = function(route) {
				return $state.is(route);
			};
			
			$scope.$on("$stateChangeSuccess", function() {
				$scope.tabs.forEach(function(tab) {
					tab.active = $scope.active(tab.route);
				});
			});
			
			$scope.removeTab = function(tab) {
				console.log('removeTab');
				
				var index = $scope.tabs.indexOf(tab);
				//Select a new tab if the tab to be removed is selected
				if (tab.active && $scope.tabs.length > 1) {
					//If this is the last tab, select the previous tab. else, the next tab.
					var newActiveIndex = index == $scope.tabs.length - 1 ? index - 1 : index + 1;
					//ctrl.select(tabs[newActiveIndex]);
				}
				$scope.tabs.splice(index, 1);
				
				//$scope.$apply();
			};
		});	
		
		app.run(function() {
			/*
			psTabs.registerDirective();
			psButtonDropdown.registerDirective();
			psCheckbox.registerDirective();
			*/
		});
		/*
		var injector = angular.injector(['ng', 'ps.directives']);
		var a = injector.get('test');
		a('aaa');
		var register = injector.get('register');
		console.log(register.test);
		psCheckbox.registerDirective();
		*/
		return app;
 	}
);
