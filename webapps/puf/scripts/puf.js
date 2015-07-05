/*
 * puf
 * hrahn@nkia.co.kr (Ahn Hyung-Ro)

 * Version: 1.0.0 - 2015-07-04
 * License: ISC
 */

/**
 * ps-puf
 * ps puf 의 모듈
 */
'use strict';

angular.module('ps.puf', ['ps.directives', 'ps.validators']);
/**
 * ps-directives
 * puf directives module
 */
angular.module('ps.directives', ['ps.directives.back', 'ps.directives.dropdown', 'ps.directives.checkbox', 
                                 'ps.directives.datepicker', 'ps.directives.focus', 'ps.directives.grid',
                                 'ps.directives.modal', 'ps.directives.radio', 'ps.directives.select',
                                 'ps.directives.stepper', 'ps.directives.tabs', 'ps.directives.tree']);
/**
 * ps-backbutton directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/09/28
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-back></ps-back>
 * 
 */

angular.module('ps.directives.back', [])
.directive('psBack', ['$window', function($window) {
	return {
		restrict: 'A',
		link : function(scope, element, attrs) {
			element.on('click', function() {
                $window.history.back();
            });
		}
	};
}]);

/**
 * ps-button-dropdown directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/07/06
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-stepper ng-model="ngModel" array="colors" option-name="name" option-value="value" option-group="group"></ps-stepper>
 * 
 */

angular.module('ps.directives.dropdown', [])
.directive('psButtonDropdown', function() {
	return {
		 restrict: 'E',
		 transclude: true,
		 replace: true,
		 scope: {
			 type: 	'@',		// single, split
			 label: '@',
			 btnClass: '@',
			 iconClass: '@',
			 isOpen: '='
		 },
		 template: function (element, attrs) {
			
			if(!angular.isDefined(attrs.type)) {
				attrs.type = 'single';
			}
			if(!angular.isDefined(attrs.btnClass)) {
				attrs.btnClass = 'btn-default';
			}
			
			var temp, icon = '';
			
			// 아이콘
			if(attrs.iconClass) {
				icon = '<i class="' + attrs.iconClass + '"></i> ';
			}
			
			if(attrs.type == 'single') {
				
				temp = '<div class="btn-group" ps-dropdown-transclude>' +
							'<button type="button" class="btn ' + attrs.btnClass + ' dropdown-toggle" data-toggle="dropdown">' +
								icon + '{{label}} <span class="caret"></span>' +			 
							'</button>' +
							/*'<ul class="dropdown-menu" role="menu" ps-dropdown-transclude>' +
							'</ul>' +*/
						'</div>';
			}else {
				// split
				temp = '<div class="btn-group" ps-dropdown-transclude>'+
 							'<button type="button" class="btn ' + attrs.btnClass + '">' +
 								icon + '{{label}}' +
 							'</button>' +
 							'<button type="button" class="btn ' + attrs.btnClass + ' dropdown-toggle" data-toggle="dropdown">' +
 								'<span class="caret"></span>' +
 								'<span class="sr-only">Toggle Dropdown</span>' +
 							'</button>' +  
 							/*'<ul class="dropdown-menu" role="menu" ps-dropdown-transclude>' +
							'</ul>' +*/
 						'</div>';
			}
			
			return temp;
		 },
		 link: function (scope, element, attrs) {
			 /*
			 element.addClass(attrs.modalClass || '');
		     scope.size = attrs.size;
		     */
			 scope.$watch('isOpen', function(value) {
				if(value == undefined) return;
				
				if(value) {
					if(!element.hasClass('open')) {
						element.addClass('open');
					}				
				}else {
					if(element.hasClass('open')) {
						element.removeClass('open');
					}					
				}
			 });
		 }
	 };
})
.directive('psDropdownTransclude', function() {
	return {
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {	
	          // ul tag 안에 넣어서 children()을 append해주면 정상적으로 작동은 하는데 console창에 에러메시지가 찍힌다.
		      // 그래서 아래와 같이 empty()하지 말고 ps-dropdown-transclude 위치를 변경해서 처리했다.
	          //element.empty();		         
	          clone.addClass('dropdown-menu');
	          if(attrs.dropdownPosition == 'right') {
	        	  clone.addClass('dropdown-menu-right');
	          }
	          clone.attr('role', 'menu');
	          element.append(clone);	          
	        });
		}
	};
});

/**
 * ps-checkbox directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/05/25
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-checkbox ng-model="value" ng-true-value="true" ng-false-value="false" ng-change="change()"></ps-checkbox>
 * 
 */

angular.module('ps.directives.checkbox', [])
.directive('psCheckbox', function() {
	return {
        restrict: 'E',
        replace: true,
        transclude : true,/*<span ng-transclude />*/
        scope: {
        	name:			'@',
        	className:		'@',
        	inline: 		'@',
        	ngModel:		'=',
        	ngTrueValue: 	'@',
        	ngFalseValue:	'@',
        	ngChange:    	'&'
        },
        template: function (element, attrs) {
			
			var temp, input = '';
			
			if(angular.isDefined(attrs.className)) {
    			input = '<input type="checkbox" ng-model="ngModel" class="' + attrs.className + '" ng-change="ngChange()">';
			}else {
				input = '<input type="checkbox" ng-model="ngModel" ng-change="ngChange()">';
			}
			
        	if(attrs.inline == "true") {
        		// 체크박스 가로정렬
    			temp = '<label class="checkbox-inline">' +
							input + 
							'<span class="lbl" ng-transclude></span>' +
							'<input type="hidden" ng-value="ngModel">' +
						'</label>';
        	}else {
        		// 체크박스 세로정렬
        		temp = '<div class="checkbox">' +
							'<label>' +
								input + 
								'<span class="lbl" ng-transclude></span>' +
								'<input type="hidden" ng-value="ngModel">' +
							'</label>' +
						'</div>';
        	}
			
			return temp;
        },
        link: function (scope, element, attrs) {
        	if(angular.isDefined(attrs.name)) {
    			//console.log(attrs.name);
    			element.find('input[type="hidden"]').attr('name', attrs.name);
    		}
        	
        	//if(attrs.ngTrueValue != undefined) {
        	if(angular.isDefined(attrs.ngTrueValue)) {
    			//console.log(attrs.ngTrueValue);
    			element.find('input[type="checkbox"]').attr('ng-true-value', attrs.ngTrueValue);
    		}
    		
    		//if(attrs.ngFalseValue != undefined) {
    		if(angular.isDefined(attrs.ngFalseValue)) {
    			//console.log(attrs.ngFalseValue);
    			element.find('input[type="checkbox"]').attr('ng-false-value', attrs.ngFalseValue);
    		}
    		
    		//if(attrs.ngChange == undefined) {
    		if(!angular.isDefined(attrs.ngChange)) {
    			//console.log(attrs.ngChange);
    			element.find('input[type="checkbox"]').removeAttr('ng-change');
    		}
    		
    		if(angular.isDefined(attrs.disabled)) {
    			element.find('input[type="checkbox"]').attr('disabled', true);
    		}
    		
    		if(angular.isDefined(attrs.readonly)) {
    			element.find('input[type="checkbox"]').attr('readonly', true);
    			element.find('input[type="checkbox"]').on('click', function() {
    				//console.log('check click readonly');
    				return false;
    			});
    			element.find('input[type="checkbox"]').on('keydown', function() {
    				//console.log('check keydown readonly');
    				return false;
    			});
    		}
        }
    };
});

/**
 * ps-datepicker directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/05/25
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-daterangepicker options="options"></ps-daterangepicker>
 * <ps-datetimepicker options="options"></ps-datetimepicker>
 * 
 */

angular.module('ps.directives.datepicker', [])
.directive('psDaterangepicker', ['$compile', function($compile) {
	return {
        restrict: 'E',
        replace: true,
        scope: {
        	options: '=',	          
            api:    '=?'
        },
        link: function (scope, element, attrs) {
            var div,
            opts,
            today = new Date(),
    		y = today.getFullYear(),
    		m = today.getMonth() + 1,
    		d = today.getDate(),
    		today_str = y+'-'+m+'-'+d,
            defaults = {
        	    format: "YYYY-MM-DD"
            };  
            //var opts =  $.extend(defaults, options);
            //console.log(attrs);
            //console.log(attrs.id);
            
            scope.$watch('options', function (value) {
            	opts = $.extend({}, defaults, value);
                element.children().empty();
                div = angular.element(
                	'<div class="input-group">' +
                	'<span class="input-group-addon"><i class="fa fa-calendar"></i></span><input type="text" id="' + attrs.id + '" style="width:100%"/>' +
              		'</div>'
                );
                $compile(div)(scope);
                element.append(div);
                
                div.daterangepicker(opts);
                
                //   view:  <ps-daterangepicker api="drapi">
                //   ctrl:  $scope.drapi.show();
                /*
                scope.api = {
                	show: function() {
                        div.data("DateTimePicker").show();
                    },
                    getDate: function() {
                    	return div.data("DateTimePicker").getDate();
                    },
                    enable: function() {
                    	div.data("DateTimePicker").enable();
                    },
                    disable: function() {
                    	div.data("DateTimePicker").disable();
                    }
                };
                */
            });
            
            /*
            scope.$watch('data', function (value) {
                table.jqGrid('setGridParam', { data: value })
                     .trigger('reloadGrid')
                ;
            });
            */
        }
    };
}])
.directive('psDatetimepicker', ['$compile', function($compile) {
	return {
        restrict: 'E',
        replace: true,
        scope: {
        	id:			'@',
        	name:		'@',
        	options:	'=',
            data:   	'=?',
            insert: 	'=?',
            api:    	'=?'
        },
        template: '<div></div>',
        link: function (scope, element, attrs) {
            var div,
            opts,
            today = new Date(),
    		y = today.getFullYear(),
    		m = today.getMonth() + 1,
    		d = today.getDate(),
    		today_str = y+'-'+m+'-'+d,
            defaults = {
        		//pickDate: true,                 //en/disables the date picker
        	    pickTime: false,                 //en/disables the time picker
        	    /*useMinutes: true,               //en/disables the minutes picker
        	    useSeconds: true,               //en/disables the seconds picker
        	    useCurrent: true,               //when true, picker will set the value to the current date/time     
        	    minuteStepping:1,               //set the minute stepping
        	    minDate:`1/1/1900`,               //set a minimum date
        	    maxDate: ,     //set a maximum date (defaults to today +100 years)
        	    showToday: true,                 //shows the today indicator
        	    language:'en',                  //sets language locale	        	    
        	    disabledDates:[],               //an array of dates that cannot be selected
        	    enabledDates:[],                //an array of dates that can be selected
        	    icons = {
        	        time: 'glyphicon glyphicon-time',
        	        date: 'glyphicon glyphicon-calendar',
        	        up:   'glyphicon glyphicon-chevron-up',
        	        down: 'glyphicon glyphicon-chevron-down'
        	    }
        	    useStrict: false,               //use "strict" when validating dates  
        	    sideBySide: false,              //show the date and time picker side by side
        	    daysOfWeekDisabled:[]          //for example use daysOfWeekDisabled: [0,6] to disable weekends
            	*/
        	    defaultDate: today_str,                 //sets a default date, accepts js dates, strings and moment objects
        	    format: "YYYY-MM-DD"
            };  
            //var opts =  $.extend(defaults, options);	            
            //console.log(attrs.id);
            
            scope.$watch('options', function (value) {
            	opts = $.extend({}, defaults, value);
            	
                element.empty();
                div = angular.element(
                	'<div class="input-group date">' +
                		'<input type="text" class="form-control" readonly/>' +
                		'<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span>' +
                		'</span>' +
                		'<input type="hidden">' +
                	'</div>'
                );
                //$compile(div)(scope);
                element.append(div);
                //element.replaceWith(div);
                
                if(angular.isDefined(attrs.id)) {
        			//console.log(attrs.id);
        			element.find('div.input-group.date').attr('id', attrs.id);
        		}
                
                if(angular.isDefined(attrs.name)) {
        			//console.log(attrs.name);
        			element.find('input[type="hidden"]').attr('name', attrs.name);
        		}
                
                div.datetimepicker(opts);
                
                //   view:  <ps-datetimepicker api="dtapi">
                //   ctrl:  $scope.dtapi.show();
                
                scope.api = {
                	show: function() {
                        div.data("DateTimePicker").show();
                    },
                    setDate: function(dateString) {
                    	return div.data("DateTimePicker").setDate(dateString);
                    },
                    getDate: function() {
                    	return div.data("DateTimePicker").getDate();
                    },
                    enable: function() {
                    	div.data("DateTimePicker").enable();
                    },
                    disable: function() {
                    	div.data("DateTimePicker").disable();
                    }
                };
                
            });
            
            /*
            scope.$watch('data', function (value) {
                table.jqGrid('setGridParam', { data: value })
                     .trigger('reloadGrid')
                ;
            });
            */
        }
    };
}]);

/**
 * ps-focus directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/04/03
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <input ps-focus></input>
 * 
 */

angular.module('ps.directives.focus', [])
.directive('psFocus', function() {
	return {
		link : function(scope, element, attrs) {
			element[0].focus();
		}
	};
});

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

/**
 * ps-modal directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/07/06
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-modal id="modal">
      		<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        		<h4 class="modal-title" id="myModalLabel">Modal title</h4>
      		</div>
      		<div class="modal-body">
        		모달창
      		</div>
      		<div class="modal-footer">
        		<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        		<button type="button" class="btn btn-primary">Save changes</button>
      		</div>
    	</ps-modal>
 * 
 */

angular.module('ps.directives.modal', [])
.directive('psModal', function() {
	return {
		 restrict: 'EA',
		 transclude: true,
		 replace: true,
		 scope: {
			 modalClass: '@',
			 size: '@',
			 backdrop: '@'
		 },
		 template: '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">' +
		    			'<div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}">' +
		    				'<div class="modal-content" ps-modal-transclude>' +
		    				'</div>' +
		    			'</div>' +
		    		'</div>',
		 link: function (scope, element, attrs) {
			 element.addClass(attrs.modalClass || '');
		     scope.size = attrs.size;
		     
		     if(attrs.backdrop == 'static') {
		    	 element.attr('data-backdrop', attrs.backdrop);
		    	 element.attr('data-keyboard', false);
		     }
		 }
	 };
})
.directive('psModalTransclude', function() {
	return {
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {
	          element.empty();
	          element.append(clone);
	        });
		}
	};
});

/**
 * ps-radio directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/06/12
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-radio ng-model="value" value="red" or ng-value="specialValue"></ps-radio>
 * 
 */

angular.module('ps.directives.radio', [])
.directive('psRadio', function() {
	return {
        restrict: 'E',
        replace: true,
        transclude : true,/*<span ng-transclude>*/
        scope: {
        	ngModel:		'=',
        	ngValue:		'=',        
        	/*inline:		'@',
        	value: 			'@',
        	name: 			'@',*/
        	ngChange:    	'&'
        },
        template: '<div>' +
					'<label>' +
						'<input type="radio" ng-model="ngModel" ng-value="ngValue" ng-change="ngChange()">' + 
						'<span class="lbl" ng-transclude></span>' +
					'</label>' +
				  '</div>',
        compile: function(element, attrs, transclude) {
        	//console.log('compile phase');
        	//console.log(attrs.ngChange);
        	
        	// 아래 replaceWith 보다 먼저 실행해야한다.
        	if(attrs.name != undefined) {
    			//console.log(attrs.name);
    			element.find("input").attr("name", attrs.name);
    		}
    		
    		if(attrs.value != undefined) {
    			//console.log(attrs.value);
    			element.find("input").attr("value", attrs.value);
    		}
    		
    		if(attrs.ngValue == undefined) {
    			//console.log(attrs.ngValue);
    			element.find("input").removeAttr("ng-value");
    		}
    		
    		if(attrs.ngChange == undefined) {
    			//console.log(attrs.ngChange);
    			element.find("input").removeAttr("ng-change");
    		}
    		
        	var label = element.children();
        	if(attrs.inline == "true") {
        		// 라디오버튼 가로정렬
        		//console.log(attrs.inline);
    			label.addClass("radio-inline");
    			element.replaceWith(label);
        	}else {
        		// 라디오버튼 세로정렬
        		var div = angular.element('<div class="radio"></div>');
        		div.append(label);
        		element.replaceWith(div);
        	}
        	
        	return function postLink(scope, element, attrs/*, controller*/) {
        		//console.log('compile');
        		//$compile(element)(scope);
        		
        	};
        }
    };
});

/**
 * ps-select directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/06/16
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-select ng-model="ngModel" array="colors" option-name="name" option-value="value" option-group="group"></ps-select>
 * 
 * bootstrap-select 라이브러리에 종속적이다.
 */

angular.module('ps.directives.select', [])
.directive('psSelect', function() {
	return {
        restrict: 'E',
        replace: true,
        scope: {
        	/*options: 	'=',
        	ngModel:	'=',
        	name:		'@',
        	required: 	'@',
        	ngRequired:	'@',
        	ngOptions: 	'&',*/
        	//name:			'@', name은 설정하면 자동으로 설정된다.
        	array: 			'=',
        	optionName: 	'@',
        	optionValue:	'@',
        	optionGroup:	'@',
        	title:			'@',
            api:    		'=?'
        },
        /*template: '<select ng-options="a[optionName] for a in array">'+
        			'<option value="">-- {{title}} --</option>'+
        		  '</select>',*/
        // http://onehungrymind.com/angularjs-dynamic-templates/
		template: function (element, attrs) {
			//console.log(attrs.optionValue);
			var ngOptions = '';
			if(angular.isDefined(attrs.array)) {
				if(angular.isDefined(attrs.optionValue)) {
					ngOptions += 'a[optionValue] as ';
				}
				
				if(angular.isDefined(attrs.optionName)) {
					ngOptions += 'a[optionName] ';
				}
				
				if(angular.isDefined(attrs.optionGroup)) {
					ngOptions += 'group by a[optionGroup] ';
				}
				
				ngOptions += 'for a in array';
				console.log(ngOptions);
			}
			
			if(!angular.isDefined(attrs.title)) {
				attrs.title = "선택하세요";
			}
				

	            /*return '<div class="selectBox selector">'+
	                        '<span>{{ ngModel.name || "' + attrs.defaultLabel + '"}}</span>'+
	                        '<select name="' + attrs.name + '" ng-model="' + attrs.ngModel + '" ng-options="' + attrs.optexp + '"' + ((attrs.required) ? ' required' : '') + '></select>'+
	                   '</div>';*/
	            
			return '<select ng-options="'+ngOptions+'">'+
    					'<option value="">-- {{title}} --</option>'+
    				'</select>';
	    },
        link: function (scope, element, attrs) {
            var div,
            opts,
            defaults = {
            	//size: 4
            };
            //var opts =  $.extend(defaults, options);	            
            //console.log(attrs.ngOptions);
            //console.log(element[0]);
            //$compile(element)(scope);
            //$compile(element.contents())(scope);
            
            scope.$watch('options', function (value) {
            	opts = $.extend({}, defaults, value);
            	//console.log('options');
//                //element.children().empty();
//                div = angular.element(
//                	'<select ng-model="' + attrs.ngModel + '" ng-options="' + attrs.ngOptions + '"></select>'                	
//                );
//                //$compile(div)(scope);
//                element.replaceWith($compile(div)(scope));
            	
            	element.selectpicker(opts);
                
                //   view:  <ps-datetimepicker api="dtapi">
                //   ctrl:  $scope.dtapi.show();
                
                
                
            });
            
            scope.api = {
                	show: function() {	                
                        element.selectpicker('show');
                    },
                    hide: function() {	                
                        element.selectpicker('hide');
                    },
                    enable: function() {
                    	element.prop('disabled',false);
                    	//element.selectpicker('refresh');
                    },
                    disable: function() {
                    	element.prop('disabled',true);
                    	//element.selectpicker('refresh');
                    },
                    refresh: function() {	                
                        element.selectpicker('refresh');
                    },
                    selectAll: function() {	                
                        element.selectpicker('selectAll');
                    },
                    deselectAll: function() {	                
                        element.selectpicker('deselectAll');
                    },
                    render: function() {	                
                        element.selectpicker('render');
                    }
                };
            	            
            /*scope.$watch('data', function (value) {
                table.jqGrid('setGridParam', { data: value })
                     .trigger('reloadGrid')
                ;
            	console.log('data');
            });*/	            
        }
    };
});

/**
 * ps-stepper directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/06/16
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-stepper ng-model="ngModel" array="colors" option-name="name" option-value="value" option-group="group"></ps-stepper>
 * 
 */

angular.module('ps.directives.stepper', [])
.directive('psStepper', function() {
	return {
		restrict: 'EA',
        require: 'ngModel',	// get a hold of NgModelController
        //replace: true,
        scope: {
        	name:		'@',
        	min: 		'=',
            max: 		'=',
            step: 		'=',
            direction: 	'@'		// vertical, horizontal, both
        },        
		template: function (element, attrs) {
			//console.log(attrs.optionValue);
			if(!angular.isDefined(attrs.direction)) {
				attrs.direction = 'vertical';
			}
			
			var temp;
			if(attrs.direction == 'vertical' || attrs.direction == 'horizontal') {
				var _direction;
				if(attrs.direction == 'vertical') {
					_direction = "input-group-btn-vertical";
				}else {
					_direction = "input-group-btn-horizontal";
				}
				
				temp = '<div class="input-group stepper">' +
							'<input type="text" class="form-control">' +
							'<div class="'+_direction+'">' +
								'<button class="btn btn-default" ng-disabled="isOverMax()" ng-click="increment()"><i class="fa fa-caret-up"></i></button>' +
								'<button class="btn btn-default" ng-disabled="isOverMin()" ng-click="decrement()"><i class="fa fa-caret-down"></i></button>' +
							'</div>' +
					   '</div>';
				
			}else {
				// both
				
			}
			
			return temp;
	    },
        link: function (scope, element, attrs, ngModelController) {
            
        	if(angular.isDefined(attrs.name)) {
    			//console.log(attrs.name);
    			element.find("input").attr("name", attrs.name);
    		}
        	
        	if(angular.isDefined(attrs.disabled)) {
    			element.find("input").attr("disabled", true);
    			element.find("button").attr("disabled", true);
    		}
        	
        	ngModelController.$render = function() {
        		element.find('input').val(ngModelController.$viewValue);
                // update the validation status
                checkValidity();
            };
            
            // when model change, cast to integer
            ngModelController.$formatters.push(function(value) {
                return parseInt(value, 10);
            });

            // when view change, cast to integer
            ngModelController.$parsers.push(function(value) {
                return parseInt(value, 10);
            });

            function checkValidity() {
                // check if min/max defined to check validity
                var valid = !(scope.isOverMin(true) || scope.isOverMax(true));
                // set our model validity
                // the outOfBounds is an arbitrary key for the error.
                // will be used to generate the CSS class names for the errors
                ngModelController.$setValidity('outOfBounds', valid);
            }
            
            function updateModel(offset) {
                // update the model, call $parsers pipeline...
                ngModelController.$setViewValue(ngModelController.$viewValue + offset);
                // update the local view
                ngModelController.$render();
            }
            
            scope.isOverMin = function(strict) {
                var offset = strict ? 0 : scope.step;
                return (angular.isDefined(scope.min) && (ngModelController.$viewValue - offset) < parseInt(scope.min, 10));
            };

            /**
             * @name isOverMax
             * @param strict
             * @description When the user clicks the increment button, increments the value by the step coefficient
             */
            scope.isOverMax = function(strict) {
                var offset = strict ? 0 : scope.step;
                return (angular.isDefined(scope.max) && (ngModelController.$viewValue + offset) > parseInt(scope.max, 10));
            };
            
            /**
             * @name increment
             * @description When the user clicks the increment button, increments the value by the step coefficient
             */
            scope.increment = function() {
                if(angular.isDefined(scope.step) && !isNaN(Number(scope.step))){
                    updateModel(+Number(scope.step));
                }
            };

            /**
             * @name decrement
             * @description UWhen the user clicks the increment button, decrements the value by the step coefficient
             */
            scope.decrement = function() {
                if(angular.isDefined(scope.step) && !isNaN(Number(scope.step))){
                    updateModel(-Number(scope.step));
                }
            };
            
            // check validity on start, in case we're directly out of bounds
            checkValidity();

            // watch out min/max and recheck validity when they change
            scope.$watch('min+max', function() {
                checkValidity();
            });
            
        }
    };
});

/**
 * ps-tabs directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/06/21
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-tabset justified="true">
		<ps-tab heading="Justified">Justified content</ps-tab>
		<ps-tab heading="SJ">Short Labeled Justified content</ps-tab>
		<ps-tab heading="Long Justified">Long Labeled Justified content</ps-tab>
	</ps-tabset>
 * 
 */

angular.module('ps.directives.tabs', [])
.controller('TabsetController', ['$scope', function($scope) {
	var ctrl = this,
    tabs = ctrl.tabs = $scope.tabs = [];
	
	ctrl.select = function(selectedTab) {
		angular.forEach(tabs, function(tab) {
			if (tab.active && tab !== selectedTab) {
				tab.active = false;
				tab.onDeselect();
			}
		});
		selectedTab.active = true;
		selectedTab.onSelect();
	};
	
	ctrl.addTab = function addTab(tab) {
		tabs.push(tab);
		// we can't run the select function on the first tab
		// since that would select it twice
		if (tabs.length === 1) {
			tab.active = true;
		} else if (tab.active) {
			ctrl.select(tab);
		}
	};

	ctrl.removeTab = function removeTab(tab) {
		var index = tabs.indexOf(tab);
		//Select a new tab if the tab to be removed is selected
		if (tab.active && tabs.length > 1) {
			//If this is the last tab, select the previous tab. else, the next tab.
			var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
			//ctrl.select(tabs[newActiveIndex]);
		}
		tabs.splice(index, 1);
		//tab.onRemove();
	};
}])
.directive('psTabset', function() {
	 return {
		 restrict: 'EA',
		 transclude: true,
		 replace: true,
		 scope: {
			 type: 		'@',
			 //addTabFunc:	'=addTab',
			 api:		'=?'
		 },
		 controller: 'TabsetController',
		 controllerAs: 'tabsetCtrl',
		 template: '<div>' +
		    			'<ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': vertical, \'nav-justified\': justified}" ng-transclude></ul>' +
		    			'<div class="tab-content">' +
		    				'<div class="tab-pane" ' +
		    					 'ng-repeat="tab in tabs" ' +
		    					 'ng-class="{active: tab.active}"' +
		    					 'ps-tab-content-transclude="tab">' +
		    					 	'<div ng-if="tab.templateUrl" ng-include="tab.templateUrl"></div>' +
		    				'</div>' +
		    			'</div>' +
		    		'</div>',
//		 templateUrl: 'template/tabs/tabset.html',
		 link: function(scope, element, attrs) {
			 scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
			 scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
			 
			 /*
			 scope.addTabFunc = function(tab) {
				console.log('addTab');
				console.log(tab);
             	//tabsetCtrl.addTab(tab);
             };
			 */
			 
             scope.api = {
            	addTab: function(tab) {
            		//console.log('api.addTab');
            		//console.log(scope.tabsetCtrl);
            		//console.log(tab);
            		scope.tabsetCtrl.addTab(tab);
            	}
             };
		 }
	 };
})
.directive('psTab', ['$parse', function($parse) {
	return {
	    require: '^psTabset',
	    restrict: 'EA',
	    replace: true,
//	    templateUrl: 'template/tabs/tab.html',
	    template: '<li ng-class="{active: active, disabled: disabled}">' +
	    			'<a ng-click="select()" ps-tab-heading-transclude>{{heading}}</a><a ng-if="removable" ng-click="onRemove()">X</a>' +
	    		  '</li>',
	    transclude: true,
	    scope: {
	    	templateUrl:'@',
	    	active: 	'=?',
	    	heading: 	'@',
	    	onSelect: 	'&select', 	//This callback is called in contentHeadingTransclude
	                          		//once it inserts the tab's content into the dom
	    	onDeselect: '&deselect',
	    	removable:	'=',
	    	onRemove:	'&remove'	// template에 onRemove() 를 설정하면 외부에서 remove에 설정한 함수 호출
	    },
	    controller: function() {
	    	//Empty controller so other directives can require being 'under' a tab
	    },
	    compile: function(element, attrs, transclude) {
	    	
	    	return function postLink(scope, element, attrs, tabsetCtrl) {
	    		scope.$watch('active', function(active) {
	    			if (active) {
	    				tabsetCtrl.select(scope);
	    			}
	    		});

	    		scope.disabled = false;
	    		if ( attrs.disabled ) {
	    			scope.$parent.$watch($parse(attrs.disabled), function(value) {
	    				scope.disabled = !! value;
	    			});
	    		}
	    		
	    		// template의 select()
	    		scope.select = function() {
	    			if ( !scope.disabled ) {
	    				scope.active = true;
	    			}
	    		};

	    		// template의 remove()
	    		scope.remove = function() {
	    			if ( !scope.disabled ) {
	    				//console.log('remove');
	    				tabsetCtrl.removeTab(scope);
	    				//$scope.$emit('$destroy');
	    			}
	    		};
	    		
	    		tabsetCtrl.addTab(scope);
	    		scope.$on('$destroy', function() {
	    			tabsetCtrl.removeTab(scope);
	    		});

	    		//We need to transclude later, once the content container is ready.
	    		//when this link happens, we're inside a tab heading.
	    		scope.$transcludeFn = transclude;
	    	};
	    }
	};
}])
.directive('psTabHeadingTransclude', function() {
	return {
	    restrict: 'A',
	    require: '^psTab',
	    link: function(scope, element, attrs, tabCtrl) {
	    	scope.$watch('headingElement', function updateHeadingElement(heading) {
	    		if (heading) {
	    			element.html('');
	    			element.append(heading);
	    		}
	    	});
	    }
	};
})
.directive('psTabContentTransclude', function() {
	return {
		restrict: 'A',
	    require: '^psTabset',
	    link: function(scope, element, attrs) {
	    	var tab = scope.$eval(attrs.psTabContentTransclude);
	    	
	    	//Now our tab is ready to be transcluded: both the tab heading area
	    	//and the tab content area are loaded.  Transclude 'em both.
	    	tab.$transcludeFn(tab.$parent, function(contents) {
	    		angular.forEach(contents, function(node) {
	    			if (isTabHeading(node)) {
	    				//Let psTabHeadingTransclude know.
	    				tab.headingElement = node;
	    			} else {
	    				element.append(node);
	    			}
	    		});
	    	});
	    }
	};
	
	/**
	 * 태그이름으로 tab heading인지 아닌지 true or false 리턴.
	 * @param element
	 * @return true/false
	 */
	function isTabHeading(node) {
		return node.tagName &&  (
			node.hasAttribute('ps-tab-heading') ||
			node.hasAttribute('data-ps-tab-heading') ||
			node.tagName.toLowerCase() === 'ps-tab-heading' ||
			node.tagName.toLowerCase() === 'data-ps-tab-heading'
		);
	}
});

/**
 * ps-tree directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/07/13
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-tree id="tree" options="options" changed="changed" select-node="selectNode"></ps-tree>
 * 
 * jstree 라이브러리에 종속적이다.
 */

angular.module('ps.directives.tree', [])
.directive('psTree', function() {
	return {
        restrict: 'E',
        replace: true,
        scope: {
        	id:			'@',
        	name:		'@',
        	options: 	'=',
        	changed:	'=?',
        	selectNode:	'=?',
        	dblclick:	'=?'
        },
        template: '<div></div>',
        link: function (scope, element, attrs) {
            var tree,
            opts,
            defaults = {
        		
            };
            
            scope.$watch('options', function (value) {
            	//console.log('tree options watch');
            	opts = $.extend({}, defaults, value);
            	
            	element.empty();
            	tree = angular.element('<div></div>');
            	
            	if(angular.isDefined(attrs.id)) {
        			//console.log(attrs.id);
        			element.removeAttr('id');
        			tree.attr('id', attrs.id);
        		}
            	if(angular.isDefined(attrs.name)) {
        			//console.log(attrs.name);
            		tree.attr('name', attrs.name);
        		}
            	
            	element.append(tree);
            	
            	tree.jstree(opts);
                
            	tree.on('changed.jstree', scope.changed);
            	//tree.on('select_node.jstree', scope.selectNode);
            	tree.on('dblclick.jstree', scope.dblclick);
            	
            	tree.on('select_node.jstree', function (event, data) {
            		//console.log('select_node');
             		//console.log(data.selected);
            		//console.log(data);
            		scope.selectNode(event, data);
            		event.stopImmediatePropagation(); 
            	});
            	/*
            	tree.on('before.jstree', function (event, data) {
            		console.log(data.func);
            	    if (data.func === 'check_node') {
            	        if (tree.jstree('get_checked').length >= 1) {
            	        	event.preventDefault();
            	            return false;                
            	        }
            	    }
            	    
            	    if (data.func === "select_node") // && !data.inst.is_leaf(data.args[0])
            	    {
            	    	//data.inst.toggle_node(data.args[0]); 
            	    	event.stopImmediatePropagation(); 
            	        return false;
            	    }
            	});
            	*/
            });
            
        }
    };
});

/**
 * puf validators module
 */
angular.module('ps.validators', ['ps.validators.password']);
/**
 * ps-password-validate directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/08/09
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <input id="inputPassword" type="password" ng-model="password" class="immediate-help" placeholder="Password" ps-password-validate required>
 * 
 * 참고사이트(<span my-dir="exp"></span>)
 * http://jsfiddle.net/simpulton/5gWjY/
 * 
 * ng-model controller
 * https://docs.angularjs.org/api/ng/type/ngModel.NgModelController
 */

angular.module('ps.validators.password', [])
.directive('psPasswordValidate', ['$compile', function($compile) {
	return {
		// restrict to an attribute type.
        restrict: 'A',
        
        // element must have ng-model attribute.
        require: 'ngModel',
        
        // scope 		= the parent scope
        // element 		= the element the directive is on
        // attrs 		= a dictionary of attributes on the element
        // modelCtrl 	= the controller for ngModel.
        link: function (scope, element, attrs, modelCtrl) {
        	//console.log(element[0].form);
        	//console.log(element[0].id);
        	var showFlag = element[0].form.name + '.' + element[0].id + '.$error.passwordValidate';
        	
        	// error message tag
        	var span = angular.element('<span class="error-msg" ng-show="' + showFlag + '">' + $ps_locale.validators.passwordErrorMsg + '</span>');
        	$compile(span)(scope);
        	element.after(span);
        	
        	var focus_out = false, 
        	display = span.css('display');
        	$(element[0]).focusout(function(eventObject) {
        		if(modelCtrl.$viewValue == '' || modelCtrl.$viewValue == undefined) return;
        		focus_out = true;
//        		console.log(eventObject.target.value);
        		span.css('display', display);
        	});
        	
        	// add a parser that will process each time the value is 
            // parsed into the model when the user updates it.
        	// value - view value
        	modelCtrl.$parsers.unshift(function(value) {
        		if(focus_out == false) {        			
        			span.css('display', 'none');
        		}
        		
                scope.pwdValidLength = (value && value.length >= 8 ? 'valid' : undefined);
                scope.pwdHasLetter = (value && /[A-z]/.test(value)) ? 'valid' : undefined;
                scope.pwdHasNumber = (value && /\d/.test(value)) ? 'valid' : undefined;
                
                // if it's valid, return the value to the model, 
                // otherwise return undefined.
                if(scope.pwdValidLength && scope.pwdHasLetter && scope.pwdHasNumber) {
                	modelCtrl.$setValidity('passwordValidate', true);
                    return value;
                } else {
                	modelCtrl.$setValidity('passwordValidate', false);                    
                    return undefined;
                }
        		
            });
            
        	// add a formatter that will process each time the value 
            // is updated on the DOM element.
        	/*modelCtrl.$formatters.unshift(function(value) {
                // validate.
        		modelCtrl.$setValidity('regexValidate', regex.test(value));
                
                // return the value or nothing will be written to the DOM.
                return value;
            });*/
            
        }
    };
}]);