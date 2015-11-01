'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Dual Listbox";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		};
		
		$scope.sourceFields = [
		    {name: 'First name', 		value: 0},
		    {name: 'Last name', 		value: 1},
		    {name: 'Home', 				value: 2},
		    {name: 'Work', 				value: '3'},
		    {name: 'Direct', 			value: 4},
		    {name: 'Cell', 				value: 5},
		    {name: 'Fax', 				value: '6'},
		    {name: 'Work email', 		value: 7},
		    {name: 'Personal email', 	value: 8},
		    {name: 'Website', 			value: 9}
		];
		$scope.destFields = [];
    };
    
	app.register.controller('dualListboxCtrl', ['$scope', '$location', controller]);
	
});