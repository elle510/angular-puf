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
//			console.log('fieldChooser');
			$scope.chooser.fieldChooser($scope.sourceFields, $scope.destFields);
			
			// input hidden 추가 (template에서 처리시 fieldChooser() 실행오류가 생긴다.)
			// chooser 안에는 source와 destination 만 있어야 정상작동함
			if($scope.fieldScopes.destinationScope.title && $scope.chooser.find('label.fc-destination-label').length == 0) {
//				var offset_dest = $scope.destFields.position();
//				var chooser_width = $scope.chooser.outerWidth();
//				var dest_width = $scope.destFields.outerWidth();
//				
				$scope.chooser.prepend('<label class="fc-destination-label">' + $scope.fieldScopes.destinationScope.title + '</label>');
//				$scope.chooser.find('label.fc-destination-label').css("margin-left", chooser_width - dest_width);
			}
			
			if($scope.fieldScopes.sourceScope.title && $scope.chooser.find('label.fc-source-label').length == 0) {
//				var offset_source = $scope.sourceFields.position();
				$scope.chooser.prepend('<label class="fc-source-label">' + $scope.fieldScopes.sourceScope.title + '</label>');
//				$scope.chooser.find('label.fc-source-label').css("margin-left", offset_source.left);
			}
			
			// destination title 위치 조정
			if($scope.fieldScopes.destinationScope.title && $scope.chooser.find('label.fc-destination-label').length > 0) {
				// destFields 위치
				var offset_dest = $scope.destFields.position();
				// source label 가로길이
				var sourceLabelWidth = $scope.chooser.find('label.fc-source-label').outerWidth();
				// source label padding left
				var sourceLabelPaddingLeft = parseInt($scope.chooser.find('label.fc-source-label').css('padding-left').replace('px', ''));
				// chooser 부모의 padding left
				var chooserParentPaddingLeft = parseInt($scope.chooser.parent().css('padding-left').replace('px', ''));
				
				$scope.chooser.find('label.fc-destination-label').css("margin-left", offset_dest.left - sourceLabelWidth - chooserParentPaddingLeft + sourceLabelPaddingLeft);
			}
			
			if($scope.chooser.find('input[type="hidden"]').length == 0) {
				var input = '<input type="hidden" name="' + $scope.name + '">';
				$scope.chooser.prepend(input);
			}
			
			////////////////////////////////////////////////////////////////////////////
			// listChanged 처리
			$scope.chooser.on('listChanged', function(event, element) {
//				console.log(event);
//				console.log(element.attr('value'));
//				console.log($scope.chooser.getDestinationList());
//				console.log($scope.chooser.getDestinationList().getSelection());
//				console.log(typeof $scope.chooser.getDestinationList().getFields());
//				console.log($scope.chooser.getDestinationList().getFields());
				
				var divElem,
				destFields = $scope.chooser.getDestinationList().getFields();
				$scope.fieldScopes.destinationScope.data = [];
				angular.forEach(destFields, function(div) {
					divElem = angular.element(div);
					if(checkDestinationFields(divElem) == true) {
						$scope.fieldScopes.destinationScope.data.push({name: divElem.text(), value: divElem.attr('value')});
					}
				});
//				console.log($scope.fieldScopes.destinationScope.data);
				$scope.chooser.find('input[type="hidden"]').val($scope.fieldScopes.destinationScope.data);
			});
		}
	};
	
	function checkDestinationFields(divElem) {
		var b = true;
		// name과 value가 중복되면 같은 object로 판단
		angular.forEach($scope.fieldScopes.destinationScope.data, function(obj) {
			if(b) {
				if(obj.name == divElem.text() && obj.value == divElem.attr('value')) {
					b = false;
				}
			}
		});
		return b;
	}
	
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
			name:		'@',
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
			
			// data로 dom생성안하고 view에서 div로 직접한 경우 호출
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
			title: 		'@',
			icon: 		'@',
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
				if(data == undefined || !(typeof data === 'object') || data.length == 0) return;
				
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
			title: 		'@',
			icon: 		'@',
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
			
			// div append 완료후 input hidden 해준다.
			// data 없이 view에서 코드로 한 경우 input hidden 방안도 같이 고려
			scope.$watch('data', function(data) {
//				console.log('psDestinationFields: data');
				if(data == undefined || !(typeof data === 'object') || data.length == 0) return;
				
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