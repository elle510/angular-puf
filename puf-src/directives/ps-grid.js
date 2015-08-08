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
.directive('psGrid', function() {
	return {
        restrict: 'E',
        replace: true,
        scope: {
        	gridId: 	'@',
        	pagerId:	'@',
        	className:	'@',
        	options: 	'=',
            data:   	'=?',
            insert: 	'=?',
            api:    	'=?'
        },
        template: function (element, attrs) {
			/*
			var temp = '<div class="' + attrs.className + '">' +
							'<table id="' + attrs.gridId + '"></table>' +
							'<div id="' + attrs.pagerId + '"></div>' +
						'</div>';
			*/
        	var temp;
			if(angular.isDefined(attrs.className)) {
				temp = '<div class="' + attrs.className + '"></div>';
			}else {
				temp = '<div></div>';
			}
			
			/*if(angular.isDefined(attrs.gridId)) {
				temp += '<table id="' + attrs.gridId + '"></table>';
			}else {
				alert('require grid-id');
			}
			
			if(angular.isDefined(attrs.pagerId)) {
				temp += '<div id="' + attrs.pagerId + '"></div>';
			}
			
			temp += '</div>';*/
			
			return temp;
        },
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
    		  	multiboxonly: true,
    		  	recordtext: $ps_locale.grid.recordtext,
    			emptyrecords: $ps_locale.grid.emptyrecords,
    			loadtext: $ps_locale.grid.loadtext,
    			pgtext : $ps_locale.grid.pgtext
            };
            //var opts =  $.extend(defaults, opts);
            //console.log(attrs.gridId);
            
            scope.$watch('options', function (value) {
            	opts = $.extend({}, defaults, value);
//                element.children().empty();
            	element.empty();
                table = angular.element('<table id="' + attrs.gridId + '"></table>');
                element.append(table);
                if (attrs.pagerId) {
                	opts.pager = '#' + attrs.pagerId;
                    var pager = angular.element(opts.pager);
                    if (pager.length == 0) {
                        div = angular.element('<div id="' + attrs.pagerId + '"></div>');
                        element.append(div);
                    }
                }
                table.jqGrid(opts);
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
                            .jqGrid('clearGridData')
                            .jqGrid('setGridParam', { data: scope.data })
                            .trigger('reloadGrid');
                    }
                };
            });
            scope.$watch('data', function (value) {
                table.jqGrid('setGridParam', { data: value })
                     .trigger('reloadGrid')
                ;
            });
            
        }
    };
});
