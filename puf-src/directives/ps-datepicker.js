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
            var div,
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
            	    cancelLabel: $ps_locale.cancel
            	}       	    
            };  
            //var opts =  $.extend(defaults, options);
            //console.log(attrs);
            //console.log(attrs.id);
            
            scope.$watch('options', function (value) {
            	opts = $.extend({}, defaults, value);        
            	$('.daterange>input[type="text"]').daterangepicker(opts);

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
                    	return div.data("DateTimePicker").date();
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
