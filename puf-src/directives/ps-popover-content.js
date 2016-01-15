/**
 * directives template
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/09/10
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 */

angular.module('ps.directives.popoverContent', [])
.controller('psPopoverContentCtrl', ['$scope', function($scope) {
	var ctrl = this;
	
	ctrl.getPos = function() {
		var popSelector = $($scope.popSelector),
		pos = popSelector.position(), 
		w = popSelector.outerWidth(true),
		h = popSelector.outerHeight(true),
		gap = 8,
		left = (pos.left - (gap * 2)) + 'px',
		top = (pos.top + h + gap) + 'px';
		
		console.log(pos);
		console.log(w);
		console.log(h);
		console.log(left);
		
		return {left: left, top: top};
	};
	
}])
.directive('psPopoverContent', ['$compile', function($compile) {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			id: 			'@',
			className:		'@',
			popSelector:	'@',
			width:			'@',
			api:			'=?'
		},
		controller: 'psPopoverContentCtrl',
		template: '<div class="popover" ng-class="className" style="display: none;" ng-style="{width: width}" role="tooltip">' +
					'<div class="arrow"></div>' +
					'<div class="popover-title">{{title}}</div>' +
					'<div class="popover-content" ps-popover-content-transclude></div>' +
				  '</div>',
		link: function(scope, element, attrs, ctrl, transclude) {
			console.log('psPopoverContent');
			
			if(angular.isDefined(attrs.title)) {
	    		try {
	    			if(scope.$parent.$eval(attrs.title)) {
	    				scope.title = scope.$parent.$eval(attrs.title);
	    			}else {
	    				scope.title = attrs.title;
	    			}
	    			
	    		}catch(e) {
	    			scope.title = attrs.title;
	    		}
	    	}
			
			// popSelector click
			$(scope.popSelector).click(function(event) {
				// set position popover		
				$(element).css(ctrl.getPos());
				
				var display = ($(element).css('display') == 'none') ? 'block' : 'none';
				$(element).css('display', display);
			});
			
			scope.api = {
            	show: function() {
            		$(element).css('display', 'block');
                },
                hide: function() {
                	$(element).css('display', 'none');
                }     
            };
			
//			transclude(scope.$parent, function(clone) {
//				element.append(clone);
//			});
		}
	}
}])
.directive('psPopoverContentTransclude', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {
//	          element.empty();
	          element.append(clone);
	        });
		}
	};
});