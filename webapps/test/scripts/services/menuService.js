'use strict';

angular.module('TestApp')
.factory('menuService', ['$http', '$q', function($http, $q) {
	var factory = {};
	
	factory.method1 = function() {
        //..
    }

	factory.method2 = function() {
        //..
    }

	return factory;

}]);