/**
 * ps-backbutton directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/09/28
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-back></ps-back>
 * 
 */

angular.module('ps.directives.back', [])
.directive('psBack', ['$window', function($window) {
	return {
		restrict: 'A',
		link : function(scope, element, attrs) {
			element.on('click', function() {
                $window.history.back();
            });
		}
	};
}]);
