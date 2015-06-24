/**
 * ps-focus directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/04/03
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <input ps-focus></input>
 * 
 */

angular.module('ps.directives.focus', [])
.directive('psFocus', function() {
	return {
		link : function(scope, element, attrs) {
			element[0].focus();
		}
	};
});
