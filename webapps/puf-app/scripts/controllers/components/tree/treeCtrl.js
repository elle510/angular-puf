'use strict';

define(['app'], function(app) {
	
	var controller = function ($scope, $location) {
        
		$scope.pageTitle = "Tree";
		
		$scope.prettyPrint = function() {
			prettyPrint();
		}
		
		// default tree
		var data = [
		            { "id" : "ajson1", "parent" : "#", "text" : "Simple root node" },
		            { "id" : "ajson2", "parent" : "#", "text" : "Root node 2" },
		            { "id" : "ajson3", "parent" : "ajson2", "text" : "Child 1" },
		            { "id" : "ajson4", "parent" : "ajson2", "text" : "Child 2" }          
		            ];
		
		$scope.treeOptions = {'core': {
			'data': data
		}};
		
		// load from server
		$scope.treeUrlOptions = {
				'core': {
					'data': {
						'url': function (node) {
							//console.log(node);
							return node.id === '#' ? 'json/tree_roots.json' : 'json/tree_children.json';
							//return 'json/tree_roots.json';
						},
						//'url': 'json/tree_roots.json',
						'type': 'POST',
						'dataType': 'json',
						'contentType': 'application/json; charset=utf-8',
						'cache': false,
						'beforeSend': function (xhr) { 
							if (xhr.overrideMimeType) { 
								xhr.overrideMimeType("application/json"); 
							} 
						},
						'data': function (node) {
							//console.log(node.id);
							return { 'id' : node.id };
						}/*,
						'success': function(data, status, res, parent) {
							//I need to convert data a little more in front-end before jstree... ->
							console.log('success load jstree json');
							console.log(data);
							return $.parseJSON(data);
							//return convertServerData(data, parent);
						}*/
					}
				}
			};
		
		// Icon Tree
		$scope.treeIconOptions = {
				"plugins" : ["types"],
				'core': {
					'data': {
						'url': function (node) {
							//console.log(node);
							return node.id === '#' ? 'json/tree_icon_roots.json' : 'json/tree_icon_children.json';
							//return 'json/ajax_demo_roots.json';
						},
						'type': 'POST',
						'dataType': 'json',
						'contentType': 'application/json; charset=utf-8',
						'cache': false,
						'beforeSend': function (xhr) { 
							if (xhr.overrideMimeType) { 
								xhr.overrideMimeType("application/json"); 
							} 
						},
						'data': function (node) {
							//console.log(node.id);
							return { 'id' : node.id };
						}
					}
				},
				"types" : {
				    "#" : {
				    	"max_children" : 1, 
				    	"max_depth" : 4, 
				    	"valid_children" : ["root"]
				    },
				    "root" : {
				    	"icon" : "/ng/images/icon/sminfoicon.png",
				    	"valid_children" : ["default"]
				    },
				    "default" : {
				    	"icon" : "fa fa-book",
				    	"valid_children" : ["default", "file"]
				    },
				    "file" : {
				    	"icon" : "glyphicon glyphicon-file",
				    	"valid_children" : []
				    }
				}
			};
		
		// context-menu
		$scope.treeContextOptions = {
				"plugins" : ["contextmenu"],
				'core': {
					'data': {
						'url': function (node) {
							//console.log(node);
							return node.id === '#' ? 'json/tree_roots.json' : 'json/tree_children.json';
							//return 'json/tree_roots.json';
						},
						//'url': 'json/tree_roots.json',
						'type': 'POST',
						'dataType': 'json',
						'contentType': 'application/json; charset=utf-8',
						'cache': false,
						'beforeSend': function (xhr) { 
							if (xhr.overrideMimeType) { 
								xhr.overrideMimeType("application/json"); 
							} 
						},
						'data': function (node) {
							//console.log(node.id);
							return { 'id' : node.id };
						}
					}
				}
			};
    };
    
	app.register.controller('treeCtrl', ['$scope', '$location', controller]);
	
});