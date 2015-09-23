/**
 * ps-menu directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/09/10
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-hidden-content expand-label="소스 보기" collapse-label="소스 닫기" is-bottom="true" on-click="test()" class-name="light"></ps-hidden-content>
 * 
 * Content Expand/Collapse
 * 
 */

/*
a 태그와 div 태그 붙여쓰면 nextSibling 이고 줄바꿈하거나 공백이 있으면 nextSibling.nextSibling -->
<div>
	<a href="javascript:void(0)" onclick="this.innerHTML=(this.nextSibling.nextSibling.style.display=='none')?'소스 닫기':'소스 보기'; this.nextSibling.nextSibling.style.display=(this.nextSibling.nextSibling.style.display=='none')?'block':'none';prettyPrint();" name="button_dropdown_code">소스 보기</a>	
	<div style="display:none">
		<div id="button_dropdown_code">
			내용
		</div>
		<a href="#button_dropdown_code" onclick="this.parentNode.style.display='none'; this.parentNode.previousSibling.previousSibling.innerHTML='소스 보기'">소스 닫기</a>
	</div>
</div>
*/
angular.module('ps.directives.hiddenContent', [])
.controller('psHiddenContentCtrl', ['$scope', function($scope) {
	var ctrl = this;
	
	ctrl.expandCollapse = function(e) {
		/*console.log('ctrl.expand');
		console.log($scope.expandLabel);
		console.log($(e).next().css('display'));*/
		
		var tag = '';
		if($(e).next().css('display') == 'none') {
			
			if($scope.collapseIcon) {
				tag += '<i class="' + $scope.collapseIcon + '"></i> ';
			}
			tag += $scope.collapseLabel;
			
			$(e).html(tag);
			$(e).next().css('display', 'block');
			
		}else {
			
			if($scope.expandIcon) {
				tag += '<i class="' + $scope.expandIcon + '"></i> ';
			}
			tag += $scope.expandLabel;
			
			$(e).html(tag);
			$(e).next().css('display', 'none');
		}
		
		$scope.click();
		
		// this.innerHTML=(this.nextSibling.nextSibling.style.display==\'none\')?\'소스 닫기\':\'소스 보기\'; this.nextSibling.nextSibling.style.display=(this.nextSibling.nextSibling.style.display==\'none\')?\'block\':\'none\';prettyPrint();
	};
	
	ctrl.collapse = function(e) {
//		console.log('ctrl.collapse');
		
		$(e).parent().css('display', 'none');
		
		var tag = '';
		if($scope.expandIcon) {
			tag += '<i class="' + $scope.expandIcon + '"></i> ';
		}
		tag += $scope.expandLabel;
		
		$(e).parent().prev().html(tag);
		
		// this.parentNode.style.display=\'none\'; this.parentNode.previousSibling.previousSibling.innerHTML=\'소스 보기\'
	};
	
}])
.directive('psHiddenContent', ['psUtil', function(psUtil) {
	return {
		restrict: 'EA',
		transclude: true,
		replace: true,
		scope: {
			id: 			'@',
			className:		'@',
			expandLabel:	'@',
			collapseLabel:	'@',
			expandIcon:		'@',
			collapseIcon:	'@',
			isBottom:		'=',
			click:			'&onClick'	// 외부에서 on-click 로 사용 / directive or template 에서는 click 사용
		},
		controller: 'psHiddenContentCtrl',
		template: '<div class="hidden-content" ng-class="className">' + 
					'<a href="javascript:void(0)" ng-click="expandCollapse($event)" name="{{id}}"><i class="{{expandIcon}}" ng-if="expandIcon"></i> {{expandLabel}}</a>' +
					'<div style="display:none">' +
						'<div id="{{id}}" ng-transclude>' +
						'</div>' +
						'<a href="#{{id}}" ng-click="collapse($event)" ng-if="isBottom"><i class="{{collapseIcon}}" ng-if="collapseIcon"></i> {{collapseLabel}}</a>' +
					'</div>' +
				  '</div>',
		link: function(scope, element, attrs, ctrl) {
			//scope.id = angular.isDefined(attrs.id) ? attrs.id : '';//psUtil.getUUID();
			//scope.expandLabel = angular.isDefined(attrs.expandLabel) ? attrs.expandLabel : 'Expand';
			//scope.collapseLabel = angular.isDefined(attrs.collapseLabel) ? attrs.collapseLabel : 'Collapse';
			
			if(angular.isDefined(attrs.id) == false) {
				attrs.id = psUtil.getUUID();
			}
			
			if(angular.isDefined(attrs.expandLabel) == false) {
				attrs.expandLabel = 'Expand';
			}
			
			if(angular.isDefined(attrs.collapseLabel) == false) {
				attrs.collapseLabel = 'Collapse';
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