/**
 * ps-button-dropdown directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/07/06
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-stepper ng-model="ngModel" array="colors" option-name="name" option-value="value" option-group="group"></ps-stepper>
 * 
 */

angular.module('ps.directives.dropdown', [])
.directive('psButtonDropdown', function() {
	return {
		 restrict: 'E',
		 transclude: true,
		 replace: true,
		 scope: {
			 type: 	'@',		// single, split
			 label: '@',
			 btnClass: '@',
			 iconClass: '@',
			 isOpen: '='
		 },
		 template: function (element, attrs) {
			
			if(!angular.isDefined(attrs.type)) {
				attrs.type = 'single';
			}
			if(!angular.isDefined(attrs.btnClass)) {
				attrs.btnClass = 'btn-default';
			}
			
			var temp, icon = '';
			
			// 아이콘
			if(attrs.iconClass) {
				icon = '<i class="' + attrs.iconClass + '"></i> ';
			}
			
			if(attrs.type == 'single') {
				
				temp = '<div class="btn-group" ps-dropdown-transclude>' +
							'<button type="button" class="btn ' + attrs.btnClass + ' dropdown-toggle" data-toggle="dropdown">' +
								icon + '{{label}} <span class="caret"></span>' +			 
							'</button>' +
							/*'<ul class="dropdown-menu" role="menu" ps-dropdown-transclude>' +
							'</ul>' +*/
						'</div>';
			}else {
				// split
				temp = '<div class="btn-group" ps-dropdown-transclude>'+
 							'<button type="button" class="btn ' + attrs.btnClass + '">' +
 								icon + '{{label}}' +
 							'</button>' +
 							'<button type="button" class="btn ' + attrs.btnClass + ' dropdown-toggle" data-toggle="dropdown">' +
 								'<span class="caret"></span>' +
 								'<span class="sr-only">Toggle Dropdown</span>' +
 							'</button>' +  
 							/*'<ul class="dropdown-menu" role="menu" ps-dropdown-transclude>' +
							'</ul>' +*/
 						'</div>';
			}
			
			return temp;
		 },
		 link: function (scope, element, attrs) {
			 /*
			 element.addClass(attrs.modalClass || '');
		     scope.size = attrs.size;
		     */
			 scope.$watch('isOpen', function(value) {
				if(value == undefined) return;
				
				if(value) {
					if(!element.hasClass('open')) {
						element.addClass('open');
					}				
				}else {
					if(element.hasClass('open')) {
						element.removeClass('open');
					}					
				}
			 });
		 }
	 };
})
.directive('psDropdownTransclude', function() {
	return {
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {	
	          // ul tag 안에 넣어서 children()을 append해주면 정상적으로 작동은 하는데 console창에 에러메시지가 찍힌다.
		      // 그래서 아래와 같이 empty()하지 말고 ps-dropdown-transclude 위치를 변경해서 처리했다.
	          //element.empty();		         
	          clone.addClass('dropdown-menu');
	          if(attrs.dropdownPosition == 'right') {
	        	  clone.addClass('dropdown-menu-right');
	          }
	          clone.attr('role', 'menu');
	          element.append(clone);	          
	        });
		}
	};
});
