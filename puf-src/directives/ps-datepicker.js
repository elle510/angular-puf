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
.directive('psDaterangepicker', ['$compile', 'psUtil', function($compile, psUtil) {
	return {
        restrict: 'E',
        replace: true,
        scope: {
        	id:			'@',
        	name:		'@',
        	className:	'@',
        	options: 	'=',
            api:    	'=?'
        },
        template: '<div class="input-group daterange" ng-class="className">' +
        			'<input type="text" id="{{id}}" class="form-control">' +
        			'<span class="input-group-addon"><i class="glyphicon glyphicon-calendar fa fa-calendar"></i></span>' +
        			'<input type="hidden" name="{{name}}">' +
        		  '</div>',
        link: function (scope, element, attrs) {
            var daterange,
            opts,
            today = new Date(),
    		y = today.getFullYear(),
    		m = today.getMonth() + 1,
    		d = today.getDate(),
    		today_str = y + '-' + m + '-' + d,
            defaults = {
            	locale: {
            		format: "YYYY-MM-DD",
            		separator: " ~ ",
            	    applyLabel: $ps_locale.apply,
            	    cancelLabel: $ps_locale.cancel,
            	    daysOfWeek: [
            	                 $ps_locale.sun,
            	                 $ps_locale.mon,
            	                 $ps_locale.tue,
            	                 $ps_locale.wed,
            	                 $ps_locale.thu,
            	                 $ps_locale.fri,
            	                 $ps_locale.sat
            	   ],
            	   monthNames: [
            	                $ps_locale.jan,
            	                $ps_locale.feb,
            	                $ps_locale.mar,
            	                $ps_locale.apr,
            	                $ps_locale.may,
            	                $ps_locale.jun,
            	                $ps_locale.jul,
            	                $ps_locale.aug,
            	                $ps_locale.sep,
            	                $ps_locale.oct,
            	                $ps_locale.nov,
            	                $ps_locale.dec
            	   ]
            	}
            };
            //var opts =  $.extend(defaults, options);
            //console.log(attrs);
            //console.log(attrs.id);
            
            // scope.id 로 하면 템플릿에서 갱신이 안된다.
            if(angular.isDefined(attrs.id) == false) {
				attrs.id = psUtil.getUUID();
			}else {
				$('div#' + attrs.id).removeAttr('id');
			}
            
            scope.$watch('options', function (value) {
            	opts = $.extend({}, defaults, value);
//            	daterange = $('.daterange>input[type="text"]');
            	daterange = $('#' + attrs.id);
            	daterange.daterangepicker(opts);
            	
                //   view:  <ps-daterangepicker api="api">
                //   ctrl:  $scope.api.getDate();       
                scope.api = {
                	setStartDate: function(d) {
                		// d type: Date/moment/string
                		daterange.data('daterangepicker').setStartDate(d);	// '2014-03-01'                 
                    },
                    setEndDate: function(d) {
                    	// d type: Date/moment/string
                		daterange.data('daterangepicker').setEndDate(d);	// '2014-03-31'                 
                    },
                    getDate: function() {
                    	return daterange.data('daterangepicker').startDate;	// _d 에서 꺼내쓸지 여기서 _d 를 리턴 할지 고민
                    },
                    getStartDate: function() {
                    	return daterange.data('daterangepicker').startDate;	// _d 에서 꺼내쓸지 여기서 _d 를 리턴 할지 고민
                    },
                    getEndDate: function() {
                    	return daterange.data('daterangepicker').endDate;	// _d 에서 꺼내쓸지 여기서 _d 를 리턴 할지 고민
                    }
                };          
            });
        }
    };
}])
.directive('psDateranges', ['$compile', 'psUtil', function($compile, psUtil) {
	return {
        restrict: 'E',
        replace: true,
        scope: {
        	id:			'@',
        	name:		'@',
        	className:	'@',
        	options: 	'=',
        	format:		'=',
            api:    	'=?'
        },
        template: '<div class="daterangepicker-ranges pull-right" ng-class="className">' +
        				'<i class="glyphicon glyphicon-calendar fa fa-calendar"></i>&nbsp;' +
        				'<span></span> <b class="caret"></b>' +
        		  '</div>',
        link: function (scope, element, attrs) {
            var daterange,
            opts,      
            defaults = {
            	opens: 'right',
            	locale: {
                	applyLabel: $ps_locale.apply,
                	cancelLabel: $ps_locale.cancel,
                	customRangeLabel: $ps_locale.direct_select
                }
            };
            
            // scope.id 로 하면 템플릿에서 갱신이 안된다.   
            if(angular.isDefined(attrs.id) == false || !attrs.id || attrs.id == undefined || attrs.id == '') {
            	attrs.id = psUtil.getUUID();
            	element.attr('id', attrs.id);
			}
            
            scope.displayDate = function(start, end) {
            	var format = 'YYYY-MM-DD';
            	if(scope.format) {
            		format = scope.format;
            	}
                $('div#' + attrs.id + ' span').html(start.format(format) + ' - ' + end.format(format));
            };
            
            scope.$watch('options', function (value) {
            	opts = $.extend({}, defaults, {ranges: value});
            	daterange = $('#' + attrs.id);
            	daterange.daterangepicker(opts, scope.displayDate);
            	
            	// init display
            	var first,
            	ranges = daterange.data('daterangepicker').ranges;
            	for(var key in ranges) {
            		if (ranges.hasOwnProperty(key) && typeof(key) !== 'function') {
            	        first = ranges[key];
            	        break;
            	    }
            	}
            	scope.displayDate(first[0], first[1]);
            	
                //   view:  <ps-dateranges api="api">
                //   ctrl:  $scope.api.getStartDate();       
                scope.api = {              	
                    getStartDate: function() {
                    	return daterange.data('daterangepicker').startDate;	// _d 에서 꺼내쓸지 여기서 _d 를 리턴 할지 고민
                    },
                    getEndDate: function() {
                    	return daterange.data('daterangepicker').endDate;	// _d 에서 꺼내쓸지 여기서 _d 를 리턴 할지 고민
                    }
                };
            });
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
        	className:	'@',
        	options:	'=',
            data:   	'=?',
            insert: 	'=?',
            api:    	'=?'
        },
        template: '<div ng-class="className"></div>',
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
        	    //pickTime: false,                 //en/disables the time picker
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
        	    format: "YYYY-MM-DD HH:mm:ss"			// format 설정에 따라 년/월/일/시간 선택을 할 수 있다.
            };  
            //var opts =  $.extend(defaults, options);	            
            //console.log(attrs.id);
            
            scope.$watch('options', function (value) {
            	opts = $.extend({}, defaults, value);
            	
                element.empty();
                div = angular.element(
                	'<div class="input-group date">' +
                		'<input type="text" class="form-control" />' +
                		'<span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span>' +             		
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
                    	return div.data("DateTimePicker").date(dateString);
                    },
                    getDate: function() {
                    	return div.data("DateTimePicker").date();	// _d 에서 꺼내쓸지 여기서 _d 를 리턴 할지 고민
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
