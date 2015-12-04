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
			
			if($scope.sourceDataChanged == false || $scope.sourceDataChanged == undefined 
			|| $scope.destinationDataChanged == false || $scope.destinationDataChanged == undefined) return;
			
			console.log('fieldChooser');
			// true로 설정하여 1번만 호출하게 함
			$scope.sourceDataChanged = true;
			$scope.destinationDataChanged = true;
			
			// 한번 실행되면 실행 안되게 해야 하는지 확인 필요(두번이상 실행 할 경우 디자인 없어지는 현상있음)
			// 데모에서 테스트하면 됨
			$scope.chooser.fieldChooser($scope.sourceFields, $scope.destFields);
			
			$scope.api = {
				getSelectedData: function() {
					return $scope.fieldScopes.destinationScope.data;
				},
				getSourceFields: function() {
					var sourceFields = $scope.chooser.getSourceList().getFields(),
					fields = [];
					angular.forEach(sourceFields, function(div) {
						divElem = angular.element(div);
						if(checkFields(fields, divElem) == true) {
							fields.push({name: divElem.text(), index: divElem.attr('index'), value: divElem.attr('value')});
						}
					});
					
					return fields;
				},
				getDestinationFields: function() {
					var destinationFields = $scope.chooser.getDestinationList().getFields(),
					fields = [];
					angular.forEach(destinationFields, function(div) {
						divElem = angular.element(div);
						if(checkFields(fields, divElem) == true) {
							fields.push({name: divElem.text(), index: divElem.attr('index'), value: divElem.attr('value')});
						}
					});
					
					return fields;
				}
			};
			
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
			$scope.chooser.on('listChanged', function(event, selection, list) {
				console.log('listChanged');
//				console.log(event);
//				console.log(element.attr('value'));
//				console.log($scope.chooser.getDestinationList());
//				console.log($scope.chooser.getDestinationList().getSelection());
//				console.log(typeof $scope.chooser.getDestinationList().getFields());
//				console.log($scope.chooser.getDestinationList().getFields());
				
				var divElem,
				sourceFields = $scope.chooser.getSourceList().getFields(),
				destFields = $scope.chooser.getDestinationList().getFields();
				
				// source
				$scope.fieldScopes.sourceScope.data = [];
				angular.forEach(sourceFields, function(div) {
					divElem = angular.element(div);
					if(checkFields($scope.fieldScopes.sourceScope.data, divElem) == true) {
						$scope.fieldScopes.sourceScope.data.push({name: divElem.text(), index: divElem.attr('index'), value: divElem.attr('value')});
					}
				});
				
				// destination
				$scope.fieldScopes.destinationScope.data = [];
				angular.forEach(destFields, function(div) {
					divElem = angular.element(div);
					if(checkFields($scope.fieldScopes.destinationScope.data, divElem) == true) {
						$scope.fieldScopes.destinationScope.data.push({name: divElem.text(), index: divElem.attr('index'), value: divElem.attr('value')});
					}
				});
//				console.log($scope.fieldScopes.destinationScope.data);
				$scope.chooser.find('input[type="hidden"]').val($scope.fieldScopes.destinationScope.data);
			});
			
			/*$scope.destFields.on('selectionChanged', function(list) {
				console.log('selectionChanged');
			});*/
			
		}
	};
	
	function checkFields(datas, divElem) {
		var b = true;
		// name과 value가 중복되면 같은 object로 판단
		angular.forEach(datas, function(obj) {
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
			var div, indexTag, valueTag, nameTag;
			
			// index
			if(!(typeof value.index === 'undefined')) {
				indexTag = '<div index="' + value.index + '"';
			}else {
				indexTag = '<div';
			}
			
			// value
			if(!(typeof value.value === 'undefined')) {
				valueTag = ' value="' + value.value + '">';
			}else {
				valueTag = '>';
			}
			
			// name
			if(!(typeof value.name === 'undefined')) {
				nameTag = value.name + '</div>';
			}else {
				nameTag = '</div>';
			}
			
			div = indexTag + valueTag + nameTag;
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
		template: '<div tabIndex="1" class="field-chooser" ng-class="className" ng-style="{width: width, height: height}" ps-dual-listbox-transclude></div>',
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
			
			// data로 dom생성 하는 경우 호출(1번 호출만 해야 한다.)
			scope.sourceDataChanged = false;
			scope.fieldScopes.sourceScope.$watch('data', function(data) {
				if(data == undefined || !(typeof data === 'object') || scope.sourceDataChanged == true /*|| data.length == 0*/) return;
				console.log('psSourceFields: data');
				
//				scope.sourceFields.empty();
				
				// create dom
				var fields = ctrl.createFields(data);
				scope.sourceFields.append(fields);
				
//				console.log(element.parent());
//				scope.$parent.sourceFields = element;
				
				scope.sourceDataChanged = true;
				ctrl.fieldChooser();
				
			});
			
			// div append 완료후 input hidden 해준다.
			// data 없이 view에서 코드로 한 경우 input hidden 방안도 같이 고려
			scope.destinationDataChanged = false;
			scope.fieldScopes.destinationScope.$watch('data', function(data) {
				if(data == undefined || !(typeof data === 'object') || scope.destinationDataChanged == true/*|| data.length == 0*/) return;
				console.log('psDestinationFields: data');
				
//				scope.destFields.empty();
				
				// create dom
				var fields = ctrl.createFields(data);
				scope.destFields.append(fields);
				
//				scope.$parent.destinationFields = element;
				
				scope.destinationDataChanged = true;
				ctrl.fieldChooser();
				
			});
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
			
		}
	}
}])
.directive('psDualListboxTransclude', function() {
	return {
		restrict: 'A',
	    require: '^psDualListbox',
		link: function(scope, element, attrs, controller, transclude) {		
			transclude(scope.$parent, function(clone) {
				element.empty();
				element.append(clone);
			});
		}
	};
});;