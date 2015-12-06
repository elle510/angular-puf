/**
 * ps-util services
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/09/16
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * app.controller('Ctrl', ['$scope', 'psUtil', function($scope, psUtil) {
 * 	   var rootPath = psUtil.getRootPath();
 * }]);
 * 
 */

angular.module('ps.services.util', [])
.factory('psUtil', ['$window', '$location', function($window, $location) {
	var root = {};
    root.show = function(msg) {
        $window.alert(msg);
    };
    
    root.reverse = function(name) {
		return name.split("").reverse().join("");
	};
	
	// root path
	root.getRootPath = function() {
		// js에서 ContextPath 를 얻을 수 없음 - Root Path를 얻어서 응용하자.
		/*var offset=location.href.indexOf(location.host)+location.host.length;
	    var ctxPath=location.href.substring(offset,location.href.indexOf('/',offset+1));
	    return ctxPath;*/
	    
	    var offset = $window.location.href.indexOf($window.location.host) + $window.location.host.length;
	    var ctxPath = $window.location.href.substring(offset, $window.location.href.indexOf('/', offset + 1));
	    return ctxPath;
	};
	
	// uuid
	root.getUUID = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		}); 
	};
	
    return root;
}]);
