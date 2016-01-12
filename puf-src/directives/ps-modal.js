/**
 * ps-modal directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/07/06
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-modal id="modal">
 		<ps-modal-header title="Modal title">
		</ps-modal-header>
    	<ps-modal-body>
			모달창
		</ps-modal-body>
 		<ps-modal-footer>
   			<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
   			<button type="button" class="btn btn-primary">Save changes</button>
 		</ps-modal-footer>
 * </ps-modal>
 * 
 */

angular.module('ps.directives.modal', [])
.directive('psModal', [ 'psUtil', function(psUtil) {
	return {
		 restrict: 'E',
		 transclude: true,
		 replace: true,
		 scope: {
			 className: '@',
			 width:		'@',
			 size: 		'@',
			 backdrop: 	'@',
			 onShow:	'=',	// function(event) {}
			 onShown:	'=',	// function(event) {}
			 onHide:	'=',	// function(event) {}
			 onHidden:	'='		// function(event) {}
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
		     
		     if(scope.onShow) {
		    	 $(element).on('show.bs.modal', scope.onShow);
		     };
		     
		     $(element).on('shown.bs.modal', function(event) {
		    	 $(window).trigger('resize');
		    	 psUtil.tooltip();
		    	 if(scope.onShown) {
		    		 scope.onShown(event);
		    	 }
		     });
		     
		     if(scope.onHide) {
		    	 $(element).on('hide.bs.modal', scope.onHide);
		     };
		     
		     if(scope.onHidden) {
		    	 $(element).on('hidden.bs.modal', scope.onHidden);
		     };
		 }
	 };
}])
.directive('psModalHeader', ['$compile', function($compile) {
	return {
		//require: '^psModal',
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			title: '='
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
		//require: '^psModal',
		restrict: 'E',
		transclude: true,
		replace: true,
//		scope: {},
		template: '<div class="modal-body" ps-modal-body-transclude></div>',
		link: function(scope, element, attrs, ctrl) {
			
		}
	}
}])
.directive('psModalFooter', ['$compile', function($compile) {
	return {
		//require: '^psModal',
		restrict: 'E',
		transclude: true,
		replace: true,
//		scope: {},
		template: '<div class="modal-footer" ps-modal-body-transclude></div>',
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
})
.directive('psModalBodyTransclude', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope, function(clone) {
	          element.empty();
	          element.append(clone);
	        });
		}
	};
});
