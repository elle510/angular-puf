/**
 * factory template
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/11/04
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 */

angular.module('ps.services.util', [])
.factory('factoryName', ['$window', '$location', function($window, $location) {
	var root = {};
	
	root.value = 1;
	
	root.add = function(num) {
		this.value += num;
	}
	
	root.getValue = function(num) {
		return this.value;
	}
	
    root.show = function(msg){
        $window.alert(msg);
    };
    
    root.reverse = function(name) {
		return name.split("").reverse().join("");
	};
	
    return root;
}]);
