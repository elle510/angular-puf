/**
 * ps-select directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/06/16
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-select ng-model="ngModel" array="colors" option-name="name" option-value="value" option-group="group"></ps-select>
 * 
 *  - simple array
 * <ps-select name="grammer" ng-model="selectedGrammar" array="grammarList"></ps-select>
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
        	disabled:		'=',
        	onComplete:		'=',	// function(e) {}
        	change:			'&onChange',
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
					if(attrs.optionValue == '{}') {
						ngOptions += 'a as ';
					}else {
						ngOptions += 'a[optionValue] as ';
					}
				}
				
				if(angular.isDefined(attrs.optionName)) {
					ngOptions += 'a[optionName] ';
				}
				
				if(angular.isDefined(attrs.optionGroup)) {
					ngOptions += 'group by a[optionGroup] ';
				}
				
				ngOptions += 'for a in array';
				
				// simple array 처리
				if(angular.isDefined(attrs.optionValue) == false && angular.isDefined(attrs.optionName) == false) {
					ngOptions = 'a for a in array track by a';
				}
				
				//console.log(ngOptions);
			}
			/*
			if(!angular.isDefined(attrs.title)) {
				attrs.title = $ps_locale.select;	// "선택하세요";
			}
			*/
			
	        /*return '<div class="selectBox selector">'+
	                     '<span>{{ ngModel.name || "' + attrs.defaultLabel + '"}}</span>'+
	                     '<select name="' + attrs.name + '" ng-model="' + attrs.ngModel + '" ng-options="' + attrs.optexp + '"' + ((attrs.required) ? ' required' : '') + '></select>'+
	                 '</div>';*/
	        // name="{{name}}" ng-model="ngModel" 은 view에서 설정하면 select 에 설정된다.
			// 템플릿에서 설정하면 에러남(원인은 나중에 알아보자) 
			return '<select ng-options="' + ngOptions + '" ng-class="className" ng-change="change()">' +
    					//'<option value="">-- {{title}} --</option>' +
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
//              //element.children().empty();
//              div = angular.element(
//              	'<select ng-model="' + attrs.ngModel + '" ng-options="' + attrs.ngOptions + '"></select>'                	
//              );
//              //$compile(div)(scope);
//              element.replaceWith($compile(div)(scope));
          	
	          	element.selectpicker(opts);
	          	
	          	// event bind
	          	if(scope.onComplete) {                	
	          		element.on('complete', scope.onComplete);
	          	}
	              
	          	//   view:  <ps-select api="dtapi">
	          	//   ctrl:  $scope.dtapi.show();
	          	scope.api = {
	          		show: function() {	                
	          			element.selectpicker('show');
	          		},
	                hide: function() {	                
	                	element.selectpicker('hide');
	                },
	                setValue: function(value) { // value: 'Mustard' or ['Mustard','Relish']
	                  	element.selectpicker('val', value);
	                },              
	                enable: function() {
	                  	element.prop('disabled', false);
	                  	element.selectpicker('refresh');
	                },
	                disable: function() {
	                  	element.prop('disabled', true);
	                  	element.selectpicker('refresh');
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
	                }/*,
	                changeOptionValue: function(index, value) {
	                	$('select[name="' + attrs.name + '"] option:eq(' + index + ')').replaceWith('<option value="' + value + '">기본 스크립트</option>');
	                }*/
	            };
	          	
	          	element.trigger('complete', scope.api);
            });
            
            scope.$watch('array', function(value) {
//            	element.selectpicker('render');
            	element.selectpicker('refresh');
            });
            
            scope.$watch('ngModel', function(value) {
//            	console.log('select ngModel watch: ' + value);
            	// 이게 호출되면 에러남 원인 찾아야 함 (ng-change 시 값을 넣어주는 것 해보자)
            	// select 태그에 바로 angular를 하면 되는데 select는 hide되고 디자인된 dom이어서 잘 안먹는다
            	// checkbox, radio 도 마찬가지
//            	element.selectpicker('val', value);
            	
            	// 아래거 테스트 해보자
//            	element.selectpicker('refresh');
            });
            
            /*
            attrs.$observe('ngModel', function(value){ // Got ng-model bind path here
            	console.log('$observe: ' + value);  
                scope.$watch(value, function(newValue){ // Watch given path for changes
                    console.log('$watch: ' + newValue);  
                });
            });
            */
            scope.$watch('disabled', function(value) {
//            	console.log('select disabled watch: ' + value);
            	element.prop('disabled', value);
            	element.selectpicker('refresh');
            });
            
            /*
            scope.$watch('selectedValue', function(value) {
            	element.selectpicker('val', value); // value: 'Mustard' or ['Mustard','Relish'] (d)
            });
            */
            /*scope.$watch('width', function(value) {
            	$('.bootstrap-select:not([class*="span"]):not([class*="col-"]):not([class*="form-control"]):not(.input-group-btn)').css('width', value);
            });*/           	                               
        }
    };
});
