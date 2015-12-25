/**
 * factory template
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/11/04
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 */

angular.module('ps.services.util', [])
.factory('factoryName', ['$window', '$location', function($window, $location) {
	var factory = {};
	
	factory.value = 1;
	
	factory.add = function(num) {
		this.value += num;
	}
	
	factory.getValue = function(num) {
		return this.value;
	}
	
	factory.show = function(msg){
        $window.alert(msg);
    };
    
    factory.reverse = function(name) {
		return name.split("").reverse().join("");
	};
	
    return factory;
}]);
