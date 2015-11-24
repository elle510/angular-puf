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
		if($scope.collapsible == true) {
			
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
.directive('psFieldset', ['$compile', 'psUtil', function($compile, psUtil) {
	return {
		restrict: 'EA',
		/*terminal: true,
        priority: 1000000,*/
		transclude: true,
		replace: true,
		scope: {
			id: 			'@',
			className:		'@',
			legend:			'@',
			collapsible:	'=',
			expand:			'=',
			click:			'&onClick'	// 외부에서 on-click 로 사용 / directive or template 에서는 click 사용
		},
		controller: 'psFieldsetCtrl',
		template: '<fieldset class="fieldset" ng-class="className">' + 
					'<legend ng-click="expandCollapse($event)" name="{{id}}"> {{legend}}</legend>' +
					'<div ng-style="initExpand && {display: \'block\'} || {display: \'none\'}">' +
						'<div id="{{id}}" ps-fieldset-transclude>' +
						'</div>' +						
					'</div>' +
				  '</fieldset>',
		link: function(scope, element, attrs, ctrl, transclude) {
			
			if(angular.isDefined(attrs.id) == false) {
				attrs.id = psUtil.getUUID();
			}
			
			if(angular.isDefined(attrs.legend) == false) {
				attrs.legend = 'Fieldset';
			}
			
			scope.initExpand = false;
			if(scope.collapsible == true) {
				element.addClass('collapsible collapsed');
				
				if(scope.expand == true) {
					scope.initExpand = true;
				}
			}else {
				scope.initExpand = true;
			}
			
			//$compile(element)(scope);
			//$compile($('#' + attrs.id))(scope);
			
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
    		
    		//scope.$transcludeFn = transclude;
    		
    		/* 자식 element에 설정
    		transclude(scope.$parent, function(clone, scope) {
//    			element.append(clone);
    			$('#' + attrs.id).append(clone);
    		});
    		*/
		}
	}
}])
.directive('psFieldsetTransclude', function() {
	return {
		restrict: 'A',
	    require: '^psFieldset',
		link: function(scope, element, attrs, controller, transclude) {		
			transclude(scope.$parent, function(clone) {
				element.empty();
				element.append(clone);
			});
		}
	};
});