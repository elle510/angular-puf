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
	var ctrl = this,
	fieldScopes = ctrl.fieldScopes = $scope.fieldScopes = {};
	
	ctrl.fieldChooser = function() {
		
		if($scope.chooser && $scope.sourceFields && $scope.destFields) {
			console.log('fieldChooser');
			$scope.chooser.fieldChooser($scope.sourceFields, $scope.destFields);
			
			// listChanged 처리
			$scope.chooser.on('listChanged', function(event, element) {
				console.log(event);
				console.log(element.attr('value'));
			});
		}
	};
	
	ctrl.addFieldScope = function(key, _scope) {
		fieldScopes[key] = _scope;
	};
	
	ctrl.createFields = function(data) {
//		console.log('ctrl.createFields');
		var fields = '';
		angular.forEach(data, function(value) {
//			console.log(value.value);
//			console.log(typeof value.value);
			var div, valueTag, nameTag;
			
			// value
			if(!(typeof value.value === undefined)) {
				valueTag = '<div value="' + value.value + '">';
			}else {
				valueTag = '<div>';
			}
			
			// name
			if(!(typeof value.name === undefined)) {
				nameTag = value.name + '</div>';
			}else {
				nameTag = '</div>';
			}
			
			div = valueTag + nameTag;
//			console.log(div);
			fields += div;
		});
		
		return fields;
	};
}])
.directive('psDualListbox', ['$compile', 'psUtil', function($compile, psUtil) {
	return {
		restrict: 'EA',
		transclude: true,
		replace: true,
		scope: {
			id: 		'@',
			name: 		'@',
			className:	'@',
			width:		'@',	// 200px (px 붙인다.)
			height:		'@',
			api:		'=?'
			//addTabFunc:	'=addTab',
		},
		controller: 'psDualListboxCtrl',
		template: '<div tabIndex="1" class="field-chooser" ng-class="className" ng-style="{width: width, height: height}" ng-transclude></div>',
		link: function(scope, element, attrs, ctrl) {
			
			if(angular.isDefined(attrs.id) == false || !attrs.id || attrs.id == undefined || attrs.id == '') {
            	attrs.id = psUtil.getUUID();
            	element.attr('id', attrs.id);
			}
			
//			console.log('psDualListbox');
			
			//console.log(element[0].children);
			/*var $sourceFields = $('#' + attrs.sourceId);
            var $destinationFields = $('#' + attrs.destId);
            var $chooser = element.fieldChooser($sourceFields, $destinationFields);*/
			
//			var fields = element[0].children;
//			var sourceFields = angular.element(fields[0]);
//          var destinationFields = angular.element(fields[1]);
//          var chooser = element.fieldChooser(sourceFields, destinationFields);
            
			scope.chooser = element;
			var fields = element[0].children;
			scope.sourceFields = angular.element(fields[0]);
			scope.destFields = angular.element(fields[1]);
			
			if((scope.fieldScopes.sourceScope.data == undefined && scope.fieldScopes.destinationScope.data == undefined) 
				|| (typeof scope.fieldScopes.sourceScope.data === 'undefined' 
					&& typeof scope.fieldScopes.destinationScope.data === 'undefined')) {
				ctrl.fieldChooser();
			}
			
			scope.api = {
				getSelectedData: function() {
                    return scope.fieldScopes.destinationScope.data;
				}
			};
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
			width:		'@',	// 200px (px 붙인다.)
			height:		'@',
			data:		'='		// Array
		},
		controller: 'psDualListboxCtrl',
		template: '<div ng-style="{width: width, height: height}" ng-transclude></div>',
		link: function(scope, element, attrs, ctrl) {
			
			if(angular.isDefined(attrs.id) == false || !attrs.id || attrs.id == undefined || attrs.id == '') {
            	attrs.id = psUtil.getUUID();
            	element.attr('id', attrs.id);
			}
			
//			console.log('psSourceFields');
			
			ctrl.addFieldScope('sourceScope', scope);
			
			scope.$watch('data', function(data) {
//				console.log('psSourceFields: data');
				if(data == undefined || !(typeof data === 'object')) return;
				
				element.empty();
				
				// create dom
				var fields = ctrl.createFields(data);
				element.append(fields);
				
//				console.log(element.parent());
//				scope.$parent.sourceFields = element;
				
				ctrl.fieldChooser();
			});
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
			width:		'@',	// 200px (px 붙인다.)
			height:		'@',
			data:		'='		// Array
		},
		controller: 'psDualListboxCtrl',
		template: '<div ng-style="{width: width, height: height}" ng-transclude></div>',					
		link: function(scope, element, attrs, ctrl) {
			
			if(angular.isDefined(attrs.id) == false || !attrs.id || attrs.id == undefined || attrs.id == '') {
            	attrs.id = psUtil.getUUID();
            	element.attr('id', attrs.id);
			}
			
//			console.log('psDestinationFields');
			
			ctrl.addFieldScope('destinationScope', scope);
			
			scope.$watch('data', function(data) {
//				console.log('psDestinationFields: data');
				if(data == undefined || !(typeof data === 'object')) return;
				
				element.empty();
				
				// create dom
				var fields = ctrl.createFields(data);
				element.append(fields);
				
//				scope.$parent.destinationFields = element;
				
				ctrl.fieldChooser();
			});
		}
	}
}]);