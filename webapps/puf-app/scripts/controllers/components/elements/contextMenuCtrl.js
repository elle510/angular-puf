'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Context Menu";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		$.contextMenu({
	        selector: '.selector', 
	        callback: function(key, options) {
	            var m = "clicked: " + key + " on " + $(this).text();
	            window.console && console.log(m) || alert(m); 
	        },
	        items: {
	            "edit": {name: "Edit", icon: "edit"},
	            "cut": {name: "Cut", icon: "cut"},
	            "copy": {name: "Copy", icon: "copy"},
	            "paste": {name: "Paste", icon: "paste"},
	            "delete": {name: "Delete", icon: "delete"},
	            "sep1": "---------",
	            "quit": {name: "Quit", icon: function($element, key, item){ return 'icon icon-quit'; }},
	            "sep2": "---------",
	            "sub1": {
	                "name": "Sub Menu1", 
	                "items": {
	                    "sub-key1": {"name": "sub-menu1"},
	                    "sub-key2": {"name": "sub-menu2"},
	                    "sub-key3": {"name": "sub-menu3"}
	                }
	            }
	        }
	    });
		
		$('.context-menu-div').contextMenu({
	        selector: '.selector', 
	        callback: function(key, options) {
	            var m = "clicked: " + key + " on " + $(this).text();
	            window.console && console.log(m) || alert(m); 
	        },
	        items: {
	            "edit": {name: "Edit", icon: "edit"},
	            "cut": {name: "Cut", icon: "cut"},
	            "copy": {name: "Copy", icon: "copy"},
	            "paste": {name: "Paste", icon: "paste"},
	            "delete": {name: "Delete", icon: "delete"}
	        }
	    });
		
    };
    
	app.register.controller('contextMenuCtrl', ['$scope', '$location', controller]);
	
});