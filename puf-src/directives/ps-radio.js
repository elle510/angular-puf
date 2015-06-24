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
