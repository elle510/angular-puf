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
        	id:				'@',
        	name:			'@',
        	className:		'@',
        	ngModel:		'=',
        	array: 			'=',
        	optionName: 	'@',
        	optionValue:	'@',
        	optionGroup:	'@',
        	title:			'@',
        	options: 		'=',
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
				//console.log(ngOptions);
			}
			
			if(!angular.isDefined(attrs.title)) {
				attrs.title = "선택하세요";
			}
				

	            /*return '<div class="selectBox selector">'+
	                        '<span>{{ ngModel.name || "' + attrs.defaultLabel + '"}}</span>'+
	                        '<select name="' + attrs.name + '" ng-model="' + attrs.ngModel + '" ng-options="' + attrs.optexp + '"' + ((attrs.required) ? ' required' : '') + '></select>'+
	                   '</div>';*/
	            
			return '<select name="{{name}}" ng-model="ngModel" ng-options="'+ngOptions+'" ng-class="className">'+
    					'<option value="">-- {{title}} --</option>'+
    				'</select>';
	    },
        link: function (scope, element, attrs) {
            var div,
            opts,
            defaults = {
            	//size: 4
            	width: '150px'
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
            
            /*scope.$watch('width', function(value) {
            	$('.bootstrap-select:not([class*="span"]):not([class*="col-"]):not([class*="form-control"]):not(.input-group-btn)').css('width', value);
            });*/
            
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
