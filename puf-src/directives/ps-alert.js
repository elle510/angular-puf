/**
 * ps-alert directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/12/03
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-alert id="alert" title="알림창" message="저장되었습니다." 
 * 			confirm-label="OK" cancel-label="Cancel" 
 * 			on-confirm="onConfirm()" on-cancel="onCancel()" 
 * 			cancelable="true" api="alertApi"></ps-alert>
 * 
 */

angular.module('ps.directives.alert', [])
.directive('psAlert', ['psUtil', function(psUtil) {
	return {
		 restrict: 'E',
		 transclude: true,
		 replace: true,
		 scope: {
			 id:			'@',
			 className: 	'@',
			 title:			'@',
			 message:		'@',
			 width:			'@',
			 confirm:		'&onConfirm',
			 cancel:		'&onCancel',
			 confirmLabel:	'@',
			 cancelLabel:	'@',
			 cancelable:	'@',
			 api:    		'=?'
		 },
		 template: '<div class="modal modal-alert" ng-class="className" tabindex="-1" role="dialog" aria-labelledby="" aria-hidden="true" data-backdrop="static" data-keyboard="false">' +
		    			'<div class="modal-dialog modal-sm" ng-style="{width: width}">' +
		    				'<div class="modal-content">' +
		    					'<div class="modal-header">' +
		    						'<h4 class="modal-title">{{title}}</h4>' +
		    					'</div>' +
		    					'<div class="modal-body">' +
		    						'{{message}}' +
		    					'</div>' +
		    					'<div class="modal-footer">' +
		    						'<button type="button" class="btn btn-default" ng-click="onConfirmClick()">{{confirmLabel}}</button>' +
		    						'<button type="button" class="btn btn-default" ng-click="cancel()" ng-if="cancelable" data-dismiss="modal">{{cancelLabel}}</button>' +
		    					'</div>' +
		    				'</div>' +
		    			'</div>' +
		    		'</div>',
		 link: function (scope, element, attrs) {
//			 element.addClass(attrs.className || '');
			 
			 // root element에 ng-attr-id="{{id}}" 또는 id="{{id}}" 를 설정하게 되면 외부에서 직접 입력 할 때와 충돌이 생기므로
			 // root element에서는 id 설정을 코드로 해준다.
			 if(angular.isDefined(attrs.id) == false) {
				 attrs.id = psUtil.getUUID();
				 element.attr('id', attrs.id);
//				 console.log(attrs.id);
			 }
				
			 // scope 으로 하면 설정한 값으로 바뀌지 않는다.
			 if(angular.isDefined(attrs.confirmLabel) == false) {
				 attrs.confirmLabel = $ps_locale.confirm;
			 }
			 
			 if(angular.isDefined(attrs.cancelLabel) == false) {
				 attrs.cancelLabel = $ps_locale.cancel;
			 }
			 
			 scope.onConfirmClick = function() {
				 $('#' + attrs.id).modal('hide');
				 scope.confirm();
			 };
			 /*if(scope.confirmLabel === undefined || scope.confirmLabel == '') {
				 scope.confirmLabel = $ps_locale.confirm;
			 }
			 
			 if(scope.cancelLabel === undefined || scope.cancelLabel == '') {
				 scope.cancelLabel = $ps_locale.cancel;
			 }*/
			 
			 scope.api = {
            	show: function(d) {
            		$('#' + attrs.id).modal('show');
                },
                hide: function(d) {
                	$('#' + attrs.id).modal('hide');
                }
            };
		 }
	 };
}])
.directive('psAlertTransclude', function() {
	return {
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {
	          element.empty();
	          element.append(clone);
	        });
		}
	};
});
