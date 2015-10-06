/**
 * ps-grid directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/04/03
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-grid options="options" data="data"></ps-grid>
 * 
 * jqGrid 라이브러리에 종속적이다.
 * 
 */

angular.module('ps.directives.grid', [])
.directive('psGrid', ['$compile', 'psUtil', function($compile, psUtil) {
	return {
        restrict: 'E',
        replace: true,
        scope: {
        	id: 			'@',
        	className:		'@',
        	options: 		'=',
        	isPage:			'=',
            //data:   		'=?',
            contextMenu:	'=',
            insert: 		'=?',
            api:    		'=?'
        },
        template: '<div ng-class="className"></div>',
        link: function (scope, element, attrs) {
            var table, div,
            opts,
            defaults = {
        		mtype: 'POST',
        		datatype: "json",
        		styleUI : 'Bootstrap',
        		/*
        		jsonReader: {
					page: function (obj) { return obj.page; },
					total: function (obj) { return obj.total; },
					root: function (obj) { console.log(JSON.stringify(obj.list)); console.log(obj); return obj.list; },
					records: function (obj) { return obj.records; },
					repeatitems: false,
					//id: 'id',
					cell: function (obj) { return obj.cell; }
				},
				*/
				jsonReader: {
					page: 'viewData.page',
					total: 'viewData.total',
					root: 'viewData.list',
					records: 'viewData.records',
					repeatitems: false,
					//id: 'id',
					cell: 'viewData.cell'
				},
				/*
        		jsonReader: {
					page: 'page',
					total: 'total',
					root: 'list',
					records: 'records',
					repeatitems: false,
					//id: 'id',
					cell: 'cell'
				},
				*/
				//caption: "공지사항 목록",
				rowNum: 20,
				autowidth: true,
				//shrinkToFit: true,
    		  	height: 'auto',
    		  	//gridview: true,
    			//hidegrid: true,		// 그리드 접힘/펼침 버튼 유무
    			//altRows: true,
    			//autoencode: true,
    		  	multiselect: true,
    		  	multiboxonly: false,
    		  	recordtext: $ps_locale.grid.recordtext,
    			emptyrecords: $ps_locale.grid.emptyrecords,
    			loadtext: $ps_locale.grid.loadtext,
    			pgtext : $ps_locale.grid.pgtext
            };
            //var opts =  $.extend(defaults, opts);
            //console.log(attrs.gridId);
            
            scope.$watch('options', function (value) {
            	
            	if(angular.isDefined(attrs.id) == false) {
    				attrs.id = psUtil.getUUID();
    			}
            	
            	// jqgrid의 formatter에서 angular가 적용될 수 있도록(컨트롤러에서 설정하면 되는데 여기서 하면 안된다.)
            	// directive가 app 모듈에 속해 있고 없고 차이 말고는 없다.
            	// 안되는 이유 찾아보자 
            	// 참고사이트: http://stackoverflow.com/questions/29359770/making-ng-click-work-with-jqgrid-column-formatter-function
            	// http://plnkr.co/edit/YHJuZrV9FV3RqPDDYKju?p=preview
            	angular.extend(defaults, {
            		loadComplete: function(data) {
            			console.log('loadComplete: ' + attrs.id);
            			$compile(angular.element('#' + attrs.id))(scope);
            		}
            	});
            	
//            	opts = $.extend({}, defaults, value);
            	opts = angular.extend({}, defaults, value);
//                element.children().empty();
            	element.empty();
            	
                table = angular.element('<table id="' + attrs.id + '"></table>');
                element.append(table);

                // 페이징 처리
                if(scope.isPage) {
                	var pagerId = psUtil.getUUID();;
                	opts.pager = '#' + pagerId;
                    var pager = angular.element(opts.pager);
                    if (pager.length == 0) {
                        div = angular.element('<div id="' + pagerId + '"></div>');
                        element.append(div);
                    }
                }
                console.log(opts);
                table.jqGrid(opts);         
                
                // context menu
                if(scope.contextMenu) {
                	angular.extend(scope.contextMenu, {selector: '.ui-jqgrid-bdiv'});
                	$('#' + attrs.id).contextMenu(scope.contextMenu);          
                }
                
                // Variadic API – usage:
                //   view:  <ng-jqgrid … vapi="apicall">
                //   ctrl:  $scope.apicall('method', 'arg1', …);
                scope.vapi = function() {
                    var args = Array.prototype.slice.call(arguments,0);
                    return table.jqGrid.apply(table, args);
                };
                // allow to insert(), clear(), refresh() the grid from 
                // outside (e.g. from a controller). Usage:
                //   view:  <ng-jqgrid … api="gridapi">
                //   ctrl:  $scope.gridapi.clear();
                scope.api = {
                    insert: function(rows) {
                        if (rows) {
                            for (var i = 0; i < rows.length; i++) {
                                scope.data.push(rows[i]);
                            }
                            table.jqGrid('setGridParam', { data: scope.data })
                                 .trigger('reloadGrid');
                        }
                    },
                    clear: function() {
                        scope.data.length = 0;
                        table.jqGrid('clearGridData', { data: scope.data })
                            .trigger('reloadGrid');
                    },
                    refresh: function() {
                        table
                            //.jqGrid('clearGridData')
                            //.jqGrid('setGridParam', { data: scope.data })
                            .trigger('reloadGrid');
                    }
                };
            });
            
            /*scope.$watch('data', function (value) {
            	console.log('changed data');
                table.jqGrid('setGridParam', { data: value })
                     .trigger('reloadGrid');
            });*/
            
            /*scope.$watch('contextMenu', function (value) {
            	console.log('changed contextMenu');
            	console.log(table);
            	var context_defaults = {selector: '.ui-jqgrid-bdiv'},
            	context_opts;
            	context_opts = angular.extend({}, context_defaults, value);
            	
                table.contextMenu({
        	        selector: '.ui-jqgrid-bdiv', 
        	        callback: function(key, options) {
        	            var m = "clicked: " + key + " on " + $(this).text();
        	            window.console && console.log(m) || alert(m); 
        	        },
        	        items: {
        	            "edit": {name: "Edit", icon: "edit"},
        	            "cut": {name: "Cut", icon: "cut"},
        	            "copy": {name: "Copy", icon: "copy"},
        	            "paste": {name: "Paste", icon: "paste"},
        	            "delete": {name: "Delete", icon: "delete"}
        	        }
        	    });
                
            });*/
            
        }
    };
}]);
