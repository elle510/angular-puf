'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Dual Listbox";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		};
		
		$scope.sourceFields = [
		    {label: 'First name', 		value: 0},
		    {label: 'Last name', 		value: 1},
		    {label: 'Home', 			value: 2},
		    {label: 'Work', 			value: '3'},
		    {label: 'Direct', 			value: 4},
		    {label: 'Cell', 			value: 5},
		    {label: 'Fax', 				value: '6'},
		    {label: 'Work email', 		value: 7},
		    {label: 'Personal email', 	value: 8},
		    {label: 'Website', 			value: 9}
		];
		$scope.destFields = [];
    };
    
	app.register.controller('dualListboxCtrl', ['$scope', '$location', controller]);
	
});