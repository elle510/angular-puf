/**
 * ps-modal directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/07/06
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-modal id="modal">
      		<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
        		<h4 class="modal-title" id="myModalLabel">Modal title</h4>
      		</div>
      		<div class="modal-body">
        		모달창
      		</div>
      		<div class="modal-footer">
        		<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        		<button type="button" class="btn btn-primary">Save changes</button>
      		</div>
    	</ps-modal>
 * 
 */

angular.module('ps.directives.modal', [])
.directive('psModal', function() {
	return {
		 restrict: 'EA',
		 transclude: true,
		 replace: true,
		 scope: {
			 className: '@',
			 width:		'@',
			 size: 		'@',
			 backdrop: 	'@'
		 },
		 template: '<div class="modal fade" ng-class="className" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true">' +
		    			'<div class="modal-dialog" ng-class="{\'modal-sm\': size == \'sm\', \'modal-lg\': size == \'lg\'}" ng-style="{width: width}">' +
		    				'<div class="modal-content" ps-modal-transclude>' +
		    				'</div>' +
		    			'</div>' +
		    		'</div>',
		 link: function (scope, element, attrs) {
//			 element.addClass(attrs.className || '');
		     scope.size = attrs.size;
		     
		     if(attrs.backdrop == 'static') {
		    	 element.attr('data-backdrop', attrs.backdrop);
		    	 element.attr('data-keyboard', false);
		     }
		 }
	 };
})
.directive('psModalHeader', ['$compile', function($compile) {
	return {
		require: '^psModal',
		restrict: 'EA',
		transclude: true,
		replace: true,
		scope: {
			title: '@'
		},
		template: '<div class="modal-header">' +
					'<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
					'<span class="modal-title">{{title}}</span>' +
				  '</div>',
		link: function(scope, element, attrs, ctrl) {
			
		}
	}
}])
.directive('psModalBody', ['$compile', function($compile) {
	return {
		require: '^psModal',
		restrict: 'EA',
		transclude: true,
		replace: true,
		scope: {
			
		},
		template: '<div class="modal-body" ng-transclude></div>',
		link: function(scope, element, attrs, ctrl) {
			
		}
	}
}])
.directive('psModalFooter', ['$compile', function($compile) {
	return {
		require: '^psModal',
		restrict: 'EA',
		transclude: true,
		replace: true,
		scope: {
			
		},
		template: '<div class="modal-footer" ng-transclude></div>',
		link: function(scope, element, attrs, ctrl) {
			
		}
	}
}])
.directive('psModalTransclude', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {
	          element.empty();
	          element.append(clone);
	        });
		}
	};
});
