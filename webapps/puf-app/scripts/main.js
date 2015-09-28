/*
	user strict 명령은 엄격하게 JavaScript 룰을 적용하라는 의미이다.
    일부 브라우저의 경우 use strict 명령을 통해 보다 빠르게 동작하는 경우도 존재하는 것 같다.
    잘못된 부분에 대한 검증도 보다 엄격하게 동작한다.
    하지만, 일부 라이브러리의 경우 use strict 명령을 사용하면 동작하지 않는 경우도 있으므로 주의해야 한다.
*/
'use strict';

//requireJS 기본 설정 부분
require.config({
/*
    baseUrl:
    JavaScript 파일이 있는 기본 경로를 설정한다.
    만약 data-main 속성이 사용되었다면, 그 경로가 baseUrl이 된다.
    data-main 속성은 require.js를 위한 특별한 속성으로 require.js는 스크립트 로딩을 시작하기 위해 이 부분을 체크한다.
*/
    baseUrl: '/', //'/puf/',
 
/*
    paths: 
    path는 baseUrl 아래에서 직접적으로 찾을 수 없는 모듈명들을 위해 경로를 매핑해주는 속성이다.
    "/"로 시작하거나 "http" 등으로 시작하지 않으면, 기본적으로는 baseUrl에 상대적으로 설정하게 된다.
 
    paths: {
        "exam": "aaaa/bbbb"
    }
 
    의 형태로 설정한 뒤에, define에서 "exam/module" 로 불러오게 되면, 스크립트 태그에서는 실제로는 src="aaaa/bbbb/module.js" 로 잡을 것이다.
    path는 또한 아래와 같이 특정 라이브러리 경로 선언을 위해 사용될 수 있는데, path 매핑 코드는 자동적으로 .js 확장자를 붙여서 모듈명을 매핑한다.
*/
    paths:{
 
    	// 뒤에 js 확장자는 생략한다.
        'text': 'puf/libs/text', // HTML 데이터를 가져올때 text! 프리픽스를 붙여준다.
        'jquery': 'puf/libs/jquery-1.11.0.min',
        'jquery-ui': 'puf/libs/jquery-ui-1.10.4.custom.min',
        'angular': 'puf/libs/angular.min',
        'angular-route': 'puf/libs/angular-route.min',
        'bootstrap': 'puf/libs/bootstrap.min',
        'angular-ui-router': 'puf/libs/angular-ui-router.min',
        'ui-router-tabs': 'puf/libs/ui-router-tabs',
        
        // d3
        'd3': 'puf/libs/d3.min',
        'd3-layout': 'puf/libs/d3.layout',
        
        // puf
        'puf': 'puf/scripts/puf.min',
        
        // i18n
        'ps-locale_en': 'puf/scripts/i18n/ps-locale_en.min',
        'ps-locale_ko': 'puf/scripts/i18n/ps-locale_ko.min',
        
        // ps-ngRoute-resolver
        'ps-route-resolver': 'puf/scripts/ps-route-resolver.min',
        'ps-ngRoute-resolver': 'puf/scripts/ps-ngRoute-resolver.min',
        
        // ps-common
        'ps-common': 'puf/libs/ps-common',
        
        // jquery plugins
        'plugins': 'puf/libs/plugins',
        'moment': 'puf/libs/plugins/moment.min',
        'jquery-cookie': 'puf/libs/plugins/jquery.cookie',
        'jqgrid': 'puf/libs/plugins/jqgrid/jquery.jqGrid.min',
        'jstree': 'puf/libs/plugins/jstree.min',
//      'jqtree': 'puf/libs/plugins/tree.jquery',
        'datetimepicker': 'puf/libs/plugins/bootstrap-datetimepicker.min',
        'daterangepicker': 'puf/libs/plugins/daterangepicker',
        'bootstrap-select': 'puf/libs/plugins/bootstrap-select.min',
        'jquery-form': 'puf/libs/plugins/jquery.form.min',
        'jquery-steps': 'puf/libs/plugins/jquery.steps.min',
		'jquery-splitter': 'puf/libs/plugins/splitter.min',
		'jquery-smartmenus': 'puf/libs/plugins/smartmenu/jquery.smartmenus.min',
		'jquery-smartmenus-bootstrap': 'puf/libs/plugins/smartmenu/addons/bootstrap/jquery.smartmenus.bootstrap.min',
		'jquery-context-menu': 'puf/libs/plugins/context-menu/jquery.contextMenu.min',
		'jquery-ui-position': 'puf/libs/plugins/context-menu/jquery.ui.position.min',
        
		// angular directive
		'angular-ui-layout': 'puf/libs/ui-layout',
		
        // google-code-prettify
        'prettify': 'puf/libs/prettify',
        
        // app scripts
        'app': 'puf-app/scripts/app',
        'routes': 'puf-app/scripts/routes',
        'service': 'puf-app/scripts/services'
    },
 
/*
    shim:
    AMD 형식을 지원하지 않는 라이브러리의 경우 아래와 같이 SHIM을 사용해서 모듈로 불러올 수 있다.
    참고 : http://gregfranko.com/blog/require-dot-js-2-dot-0-shim-configuration/
*/
    shim:{
//    	'jquery':{
//    		exports: 'jQuery'
//    	},
        'angular':{
            deps: ['jquery'],
            exports: 'angular'
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'bootstrap': {
        	//deps: ['text!styles/jbootstrap.min.css']
        	deps: ['jquery']
        },
        'ps-common': {
            deps: ['jquery']
        },
        'puf': {
        	deps: ['ps-locale_ko', 'moment', 'jquery-cookie', 'jqgrid', 'jstree', 'datetimepicker', 'daterangepicker', 
        	       'bootstrap-select', 'jquery-form', 'jquery-steps', 'jquery-splitter', 'jquery-smartmenus', 'jquery-smartmenus-bootstrap',
        	       'jquery-context-menu']
        },
        'jqgrid': {
        	// jquery를 빼도 불러오기니 하는데 로딩순서가 달라진다.
        	// jquery를 빼면 grid.locale을 제일 먼저 불러오고 jquery, jquery-ui 순서
        	// jquery 있으면 jquery, grid.locale, jquery-ui 순서
            deps: ['jquery','jquery-ui','plugins/jqgrid/i18n/grid.locale-en','bootstrap'],
            exports: 'jQuery.fn.jqgrid'
        },
        /*'jstree': {
        	deps: ['jquery']
        },*/
        'jquery-smartmenus-bootstrap': {
        	deps: ['jquery-smartmenus']
        },
        /*'jqtree': {
        	deps: ['jquery', 'jquery-cookie']
        },*/
        'jquery-context-menu': {
        	deps: ['jquery-ui-position']
        },
        'datetimepicker': {
            deps: ['moment']
        },
        'daterangepicker': {
            deps: ['moment']
        },
        'bootstrap-select': {
            deps: ['jquery','bootstrap']
        },
        'app':{
			deps:['angular']
		},
		'routes':{
			deps:['app']
		}
    }
});

// requireJS를 활용하여 모듈 로드
require( [
		'jquery', 	// 미리 선언해둔 path, jQuery는 AMD를 지원하기 때문에 이렇게 로드해도 jQuery 또는 $로 호출할 수 있다.
		'angular', 	// 미리 선언해둔 path
		'jquery-ui',
		'text', 	// 미리 선언해둔 path, css나 html을 로드하기 위한 requireJS 플러그인
		'bootstrap',
		'prettify',			// google code prettify
		'app', 				// app.js
		'routes', 			// routes.js
		//'plugins/jquery.metisMenu',
		'ps-common'
	],

	// 디펜던시 로드뒤 콜백함수
	function ($, angular, text) {
		// 이 함수는 위에 명시된 모든 디펜던시들이 다 로드된 뒤에 호출된다.
		// 주의해야할 것은, 디펜던시 로드 완료 시점이 페이지가 완전히 로드되기 전 일 수도 있다는 사실이다.
		
		// 페이지가 완전히 로드된 뒤에 실행
		$(document).ready(function () {

			// 위의 디펜던시 중 xeusApp이 포함된 app.js가 로드된 이후에 아래가 수행된다.
			// 임의로 앵귤러 부트스트래핑을 수행한다.
			
			angular.bootstrap(document, ['pufApp']);
			
			//$('.googlePlayMenu').googlePlayMenu('json/googlePlay-menu.json');
			//psGooglePlayMenu.registerApp(app);
			
			/*
			$.ajax({
				type: "POST",
				url: 'json/workspace-menu.json',
				success: function(data) {
					//console.log(data);
					var json = $.parseJSON(data);
					//console.log(json);
					//console.log($.createMetisMenu(json));
					
					//document.getElementById('dymenu').innerHTML = $.createMetisMenu(json);
					//$('#dymenu').html($.createMetisMenu(json));
					$('#workspace').createMetisMenu(json);
					//$(".metisMenu > li").eq(1).addClass('active');
					$('.metisMenu').metisMenu();
				},
				error: function(request, status, error) {
					//  Function( jqXHR jqXHR, String textStatus, String errorThrown )
					alert(error);
				}
			});
			*/
			
		});
		
	}
);