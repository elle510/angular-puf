/**
 * ps-panel directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/08/09
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * http://jsfiddle.net/b2m38br9/1/
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

angular.module('ps.directives.panel', [])
.directive('psPanel', function() {
	return {
		 restrict: 'EA',
		 transclude: true,
		 replace: true,
		 scope: {
			 className: 	'@',
			 title: 		'@',
			 buttonLabel: 	'@'
		 },
		 template: '<div class="panel">' +
		 				'<div class="panel-heading">' +
		 					'<div class="panel-title">{{title}}</div>' +
		 				'</div>' +
		 				'<div class="panel-body" ng-transclude>' +
		 				'</div>' +
		 			'</div>',
		 link: function (scope, element, attrs) {
			 element.addClass(attrs.className || 'panel-default');
			 
			 if(angular.isDefined(attrs.buttonLabel)) {
//				 console.log(attrs.buttonLabel);
				 element.find('.panel-title').addClass('pull-left');
				 
				 var button = angular.element('<button class="btn btn-default pull-right">' + attrs.buttonLabel + '</button><div class="clearfix"></div>');
				 element.find('.panel-heading').append(button);
				 
			 }
			 
			 
		 }
	 };
});
/*
.directive('psModalTransclude', function() {
	return {
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {
	          element.empty();
	          element.append(clone);
	        });
		}
	};
});
*/