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
        		
            };
            
            scope.$watch('options', function (value) {
            	//console.log('tree options watch');
            	opts = $.extend({}, defaults, value);
            	
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
                
            	tree.on('changed.jstree', scope.changed);
            	//tree.on('select_node.jstree', scope.selectNode);
            	tree.on('dblclick.jstree', scope.dblclick);
            	
            	tree.on('select_node.jstree', function (event, data) {
            		//console.log('select_node');
             		//console.log(data.selected);
            		//console.log(data);
            		scope.selectNode(event, data);
            		event.stopImmediatePropagation(); 
            	});
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
