/**
 * directives template
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/09/10
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 */

angular.module('ps.directives.popoverContent1', [])
.directive('psPopoverContent', ['$compile', function($compile) {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			id: 			'@',
			className:		'@',
			popSelector:	'@',
			width:			'@'
			//addTabFunc:	'=addTab',
		},
		template: '<div style="display: none" ps-transclude></div>',
		link: function(scope, element, attrs, ctrl, transclude) {
			
			$(scope.popSelector).popover({ 
				html : true,
				template: '<div class="popover" ng-style="{width: width}" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>',
			    content: function() {
			    	return $compile($(element).html())(scope.$parent);
			    }
			});
			
//			transclude(scope.$parent, function(clone) {
//				element.append(clone);
//			});
		}
	}
}])
.directive('psTransclude', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {
//	          element.empty();
	          element.append(clone);
	        });
		}
	};
});