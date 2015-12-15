/**
 * ps-dual-select directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/12/14
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-dual-select></ps-dual-select>
 * 
 */

angular.module('ps.directives.dualSelect', [])
.controller('psDualSelectCtrl', ['$scope', function($scope) {
	var ctrl = this;
	
	ctrl.createOptions = function(data) {
//		console.log('ctrl.createFields');
		var options = '';
		angular.forEach(data, function(value) {
//			console.log(value.value);
//			console.log(typeof value.value);
			var option, indexTag, valueTag, labelTag;
			
			// index
			if(typeof value.index !== 'undefined') {
				indexTag = '<option index="' + value.index + '"';
			}else {
				indexTag = '<option';
			}
			
			// value
			if(typeof value.value !== 'undefined') {
				valueTag = ' value="' + value.value + '">';
			}else {
				valueTag = '>';
			}
			
			// label
			if(typeof value.label !== 'undefined') {
				labelTag = value.label + '</option>';
			}else {
				labelTag = '</option>';
			}
			
			option = indexTag + valueTag + labelTag;
//			console.log(option);
			options += option;
		});
		
		return options;
	};
	
	ctrl.addData = function(val) {
		$.each($scope.selectableData, function(index, value) {
			if(value.value == val) {
				$scope.selectedData.push($scope.selectableData.splice(index, 1)[0]);
				return false;	// break;
			}
		});
	};
	
	ctrl.removeData = function(val) {
		$.each($scope.selectedData, function(index, value) {
			if(value.value == val) {
				$scope.selectableData.push($scope.selectedData.splice(index, 1)[0]);
				return false;	// break;
			}
		});
	};
	
	ctrl.setIndexData = function(newPos, val) {
		$.each($scope.selectedData, function(index, value) {
			if(value.value == val) {
				$scope.selectedData.splice(newPos, 0, $scope.selectedData.splice(index, 1)[0]);
				return false;	// break;
			}
		});
	};
}])
.directive('psDualSelect', ['$compile', function($compile) {
	return {
		restrict: 'EA',
		transclude: true,
		replace: true,
		scope: {
			id: 				'@',
			className:			'@',
			size:				'@',
			selectableTitle:	'@',
			selectedTitle:		'@',
			selectableData:		'=',
			selectedData:		'=',
			api:				'=?'
		},
		controller: 'psDualSelectCtrl',
		template: '<div class="row dual-select" ng-class="className">' +
					'<div class="col-md-5 dual-select-box">' + 
						'<label class="dual-select-title">{{selectableTitle}}</label>' +
						'<select class="dual-select-picker" ng-attr-size="{{size}}" multiple></select>' +
					'</div>' +
					'<div class="dual-select-btn">' +
						'<button type="button" class="btn btn-default arrow-add-all" ng-click="addAll()"><i class="fa fa-angle-double-right"></i></button>' +
						'<button type="button" class="btn btn-default arrow-add" ng-click="add()"><i class="fa fa-angle-right"></i></button>' +
						'<button type="button" class="btn btn-default arrow-remove" ng-click="remove()"><i class="fa fa-angle-left"></i></button>' +
						'<button type="button" class="btn btn-default arrow-remove-all" ng-click="removeAll()"><i class="fa fa-angle-double-left"></i></button>' +
					'</div>' +
					'<div class="col-md-5 dual-select-box">' + 
						'<label class="dual-select-title">{{selectedTitle}}</label>' +
						'<select class="dual-select-picker" ng-attr-size="{{size}}" multiple></select>' +
					'</div>' +
					'<div class="dual-select-btn">' +
						'<button type="button" class="btn btn-default arrow-up-first" ng-click="upFirst()"><i class="fa fa-angle-double-up"></i></button>' +
						'<button type="button" class="btn btn-default arrow-up" ng-click="up()"><i class="fa fa-angle-up"></i></button>' +
						'<button type="button" class="btn btn-default arrow-down" ng-click="down()"><i class="fa fa-angle-down"></i></button>' +
						'<button type="button" class="btn btn-default arrow-down-last" ng-click="downLast()"><i class="fa fa-angle-double-down"></i></button>' +
					'</div>' +
				  '</div>',
		link: function(scope, element, attrs, ctrl) {
			
			var divs = element[0].children,
			selectableSelect = angular.element(divs[0]).find('select.dual-select-picker'),
			selectedSelect = angular.element(divs[2]).find('select.dual-select-picker');
			
			if(angular.isDefined(attrs.size) == false) {
				attrs.size = 5;
			}
			
			scope.$watch('selectableData', function(data) {
				if(data === undefined || !Array.isArray(data)) return;
//				console.log('selectableData: data');
				
//				scope.destFields.empty();
				
				// create dom
				var options = ctrl.createOptions(data);
				selectableSelect.append(options);
				
//				element.trigger('completeDestinationFields');
			});
			
			scope.$watch('selectedData', function(data) {
				if(data === undefined || !Array.isArray(data)) return;
//				console.log('selectedData: data');
				
//				scope.destFields.empty();
				
				// create dom
				var options = ctrl.createOptions(data);
				selectedSelect.append(options);
				
//				element.trigger('completeDestinationFields');
			});
			
			scope.addAll = function() {
				selectableSelect.find('option').each(function() {
					selectedSelect.append('<option value="' + $(this).val() + '">' + $(this).text() + '</option>');
					$(this).remove();
					
//					element.trigger('add', $(this).val());
					ctrl.addData($(this).val());
				});
			};
			
			scope.add = function() {
				selectableSelect.find('option:selected').each(function() {
					selectedSelect.append('<option value="' + $(this).val() + '">' + $(this).text() + '</option>');
					$(this).remove();
					
//					element.trigger('add', $(this).val());
					ctrl.addData($(this).val());
				});
			};
			
			scope.remove = function() {
				selectedSelect.find('option:selected').each(function() {
					selectableSelect.append('<option value="' + $(this).val() + '">' + $(this).text() + '</option>');
					$(this).remove();
					
					ctrl.removeData($(this).val());
				});
			};
			
			scope.removeAll = function() {
				selectedSelect.find('option').each(function() {
					selectableSelect.append('<option value="' + $(this).val() + '">' + $(this).text() + '</option>');
					$(this).remove();
					
					ctrl.removeData($(this).val());
				});
			};
			
			scope.upFirst = function() {
				var newPos = 0;
				selectedSelect.find('option:selected').each(function() {
					selectedSelect.find('option').eq(newPos).before('<option value="' + $(this).val() + '" selected="selected">' + $(this).text() + '</option>');
					$(this).remove();
					
					ctrl.setIndexData(newPos, $(this).val());
					
					newPos++;
				});
			};
			
			scope.up = function() {
				// 최상위에 있는 option 인지 체크
				var selectedItem = selectedSelect.find('option:selected');
				if(selectedSelect.find('option').index(selectedItem[0]) == 0) {
					return false;
				}
				selectedSelect.find('option:selected').each(function() {
					var newPos = selectedSelect.find('option').index(this) - 1;
					if(newPos > -1) {
						selectedSelect.find('option').eq(newPos).before('<option value="' + $(this).val() + '" selected="selected">' + $(this).text() + '</option>');
						$(this).remove();
						
						ctrl.setIndexData(newPos, $(this).val());
					}
				});
			};
			
			scope.down = function() {
				var countOptions = selectedSelect.find('option').size();
				// 최하위에 있는 option 인지 체크
				var selectedItem = selectedSelect.find('option:selected');
				if(selectedSelect.find('option').index(selectedItem[selectedItem.length-1]) == countOptions - 1) {
					return false;
				}
				$(selectedSelect.find('option:selected').get().reverse()).each(function() {
		            var newPos = selectedSelect.find('option').index(this) + 1;
		            if(newPos < countOptions) {
		            	selectedSelect.find('option').eq(newPos).after('<option value="' + $(this).val() + '" selected="selected">' + $(this).text() + '</option>');
		                $(this).remove();
		                
		                ctrl.setIndexData(newPos, $(this).val());
		            }
		        });
			};
			
			scope.downLast = function() {
				var countOptions = selectedSelect.find('option').size();
				selectedSelect.find('option:selected').each(function() {
		            var newPos = countOptions - 1;
		            selectedSelect.find('option').eq(newPos).after('<option value="' + $(this).val() + '" selected="selected">' + $(this).text() + '</option>');
	                $(this).remove();
	                
	                ctrl.setIndexData(newPos, $(this).val());
		        });
			};
		}
	}
}]);