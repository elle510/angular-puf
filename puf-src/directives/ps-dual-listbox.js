/**
 * ps-dual-listbox directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/10/30
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-dual-listbox>
 * 		<ps-source-fields></ps-source-fields>
    	<ps-destination-fields></ps-destination-fields>
 * </ps-dual-listbox>
 * 
 * fieldChooser 라이브러리에 종속적이다.
 * 
 */

angular.module('ps.directives.dualListbox', [])
.controller('psDualListboxCtrl', ['$scope', function($scope) {
	var ctrl = this;
	// jquery 로 되어 있는 것을 아래 코드로 수정
	//var opts = angular.extend({}, $scope.$eval($attrs.uiLayout), $scope.$eval($attrs.options));
	var opts = {};
	
	function update() {
		console.log('update');
		//ctrl.updateDisplay();
	}
	
	$scope.updateDisplay = function() {
		console.log('$scope.updateDisplay');
		//ctrl.updateDisplay();
	};
	
	
	ctrl.createMeunu = function() {
		console.log('ctrl.createMeunu');
		update();
	};
	
	ctrl.opts = opts;
	ctrl.value = [1, 2, 3];
}])
.directive('psDualListbox', ['$compile', 'psUtil', function($compile, psUtil) {
	return {
		restrict: 'EA',
		transclude: true,
		replace: true,
		scope: {
			id: 		'@',
			sourceId:	'@',
			destId:		'@',
			name: 		'@',
			className:	'@',
			api:		'=?'
			//addTabFunc:	'=addTab',
		},
		controller: 'psDualListboxCtrl',
		template: '<div tabIndex="1" ng-transclude>' + 
					'<div id="{{sourceId}}" ps-source-fields-transclude></div>' +
					'<div id="{{destId}}" ps-destination-fields-transclude></div>' +
				  '</div>',
		link: function(scope, element, attrs, ctrl) {
			
			if(angular.isDefined(attrs.id) == false || !attrs.id || attrs.id == undefined || attrs.id == '') {
            	attrs.id = psUtil.getUUID();
            	element.attr('id', attrs.id);
			}
			
			var $sourceFields = $('#' + attrs.sourceId);
            var $destinationFields = $('#' + attrs.destId);
            var $chooser = element.fieldChooser($sourceFields, $destinationFields);
           	
		}
	}
}])
.directive('psSourceFields', ['$compile', 'psUtil', function($compile, psUtil) {
	return {
		require: '^psDualListbox',
		restrict: 'EA',
		transclude: true,
		replace: true,
		scope: {
			id: 		'@',
			name: 		'@',
			className:	'@',
			api:		'=?'
			//addTabFunc:	'=addTab',
		},
//		controller: 'psDualListboxCtrl',
		template: '<div ps-source-fields-transclude></div>',				
		link: function(scope, element, attrs, ctrl) {
			
			if(angular.isDefined(attrs.id) == false || !attrs.id || attrs.id == undefined || attrs.id == '') {
            	attrs.id = psUtil.getUUID();
            	element.attr('id', attrs.id);
			}
			
			
		}
	}
}])
.directive('psDestinationFields', ['$compile', 'psUtil', function($compile, psUtil) {
	return {
		require: '^psDualListbox',
		restrict: 'EA',
		transclude: true,
		replace: true,
		scope: {
			id: 		'@',
			name: 		'@',
			className:	'@',
			api:		'=?'
			//addTabFunc:	'=addTab',
		},
//		controller: 'psDualListboxCtrl',
		template: '<div ps-destination-fields-transclude></div>',					
		link: function(scope, element, attrs, ctrl) {
			
			if(angular.isDefined(attrs.id) == false || !attrs.id || attrs.id == undefined || attrs.id == '') {
            	attrs.id = psUtil.getUUID();
            	element.attr('id', attrs.id);
			}
			
			
		}
	}
}])
.directive('psSourceFieldsTransclude', function() {
	return {
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {
	          element.empty();
	          element.append(clone);
	        });
		}
	};
})
.directive('psDestinationFieldsTransclude', function() {
	return {
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {
	          element.empty();
	          element.append(clone);
	        });
		}
	};
});