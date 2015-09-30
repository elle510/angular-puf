/**
 * ps-menu directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/09/10
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-fieldset legend="소스 보기" on-click="test()" class-name="light"></ps-fieldset>
 * 
 * fieldset
 * 
 */
angular.module('ps.directives.fieldset', [])
.controller('psFieldsetCtrl', ['$scope', function($scope) {
	var ctrl = this;
	
	ctrl.expandCollapse = function(e) {
		if($scope.isCollapsible == true) {
			
			if($(e).next().css('display') == 'none') {
				
				$(e).parent().removeClass('collapsed');
				$(e).next().css('display', 'block');
				
			}else {
				
				$(e).parent().addClass('collapsed');
				$(e).next().css('display', 'none');
			}
			
		}
		
		$scope.click();
	};
	
}])
.directive('psFieldset', ['psUtil', function(psUtil) {
	return {
		restrict: 'EA',
		transclude: true,
		replace: true,
		scope: {
			id: 			'@',
			className:		'@',
			legend:			'@',
			collapsible:	'@',
			click:			'&onClick'	// 외부에서 on-click 로 사용 / directive or template 에서는 click 사용
		},
		controller: 'psFieldsetCtrl',
		template: '<fieldset class="fieldset" ng-class="className">' + 
					'<legend ng-click="expandCollapse($event)" name="{{id}}"> {{legend}}</legend>' +
					'<div ng-style="isCollapsible && {display: \'none\'} || {display: \'block\'}">' +
						'<div id="{{id}}" ng-transclude>' +
						'</div>' +						
					'</div>' +
				  '</fieldset>',
		link: function(scope, element, attrs, ctrl) {
			
			if(angular.isDefined(attrs.id) == false) {
				attrs.id = psUtil.getUUID();
			}
			
			if(angular.isDefined(attrs.legend) == false) {
				attrs.legend = 'Fieldset';
			}
			
			if(angular.isDefined(attrs.collapsible) && attrs.collapsible == 'true') {
				scope.isCollapsible = true;
				element.addClass('collapsible collapsed');
			}else {
				scope.isCollapsible = false;
			}
			
			// template의 expand()
    		scope.expandCollapse = function(event) {
//    			console.log(this);
//    			console.log($(event.target));
    			ctrl.expandCollapse(event.target);
    		};
    		
    		// template의 collapse()
    		scope.collapse = function(event) {
    			ctrl.collapse(event.target);
    		};
		}
	}
}]);