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
