/**
 * ps-tree directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/07/13
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-tree id="tree" options="options" changed="changed" select-node="selectNode"></ps-tree>
 * 
 * jstree 라이브러리에 종속적이다.
 */

angular.module('ps.directives.tree', [])
.directive('psTree', function() {
	return {
        restrict: 'E',
        replace: true,
        scope: {
        	id:			'@',
        	name:		'@',
        	options: 	'=',
        	changed:	'=?',
        	selectNode:	'=?',
        	dblclick:	'=?'
        },
        template: '<div></div>',
        link: function (scope, element, attrs) {
            var tree,
            opts,
            defaults = {
            	core: {
            		data: {
						type: 'POST',
						dataType: 'json',
						contentType: 'application/json; charset=utf-8',
						cache: false,
						beforeSend: function (xhr) { 
							if (xhr.overrideMimeType) { 
								xhr.overrideMimeType("application/json"); 
							}
						}
					}
            	}
            };
            
            scope.$watch('options', function (value) {
            	//console.log('tree options watch');
            	opts = $.extend({}, defaults, value);
            	// 다양한 테스트 해봐야 함
            	if(value && value.hasOwnProperty('core') && value['core'].hasOwnProperty('data')) {
            		angular.extend(opts['core']['data'], defaults['core']['data'], value['core']['data']);
            	}
            	console.log(opts);
            	element.empty();
            	tree = angular.element('<div></div>');
            	
            	if(angular.isDefined(attrs.id)) {
        			//console.log(attrs.id);
        			element.removeAttr('id');
        			tree.attr('id', attrs.id);
        		}
            	if(angular.isDefined(attrs.name)) {
        			//console.log(attrs.name);
            		tree.attr('name', attrs.name);
        		}
            	
            	element.append(tree);
            	
            	tree.jstree(opts);
                
            	if(scope.changed) {
            		tree.on('changed.jstree', scope.changed);
            	}
            	
            	//tree.on('select_node.jstree', scope.selectNode);
            	if(scope.dblclick) {
            		tree.on('dblclick.jstree', scope.dblclick);
            	}
            	
            	if(scope.selectNode) {
            		tree.on('select_node.jstree', function (event, data) {
                		//console.log('select_node');
                 		//console.log(data.selected);
                		//console.log(data);
                		scope.selectNode(event, data);
                		event.stopImmediatePropagation(); 
                	});
            	}
            	
            	/*
            	tree.on('before.jstree', function (event, data) {
            		console.log(data.func);
            	    if (data.func === 'check_node') {
            	        if (tree.jstree('get_checked').length >= 1) {
            	        	event.preventDefault();
            	            return false;                
            	        }
            	    }
            	    
            	    if (data.func === "select_node") // && !data.inst.is_leaf(data.args[0])
            	    {
            	    	//data.inst.toggle_node(data.args[0]); 
            	    	event.stopImmediatePropagation(); 
            	        return false;
            	    }
            	});
            	*/
            });
            
        }
    };
});
