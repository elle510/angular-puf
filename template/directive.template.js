/**
 * directives template
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/09/10
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 */

angular.module('ps.directives.menu', [])
.controller('psMenuCtrl', ['$scope', function($scope) {
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
.directive('psMenu', ['$compile', function($compile) {
	return {
		restrict: 'EA',
		transclude: true,
		replace: true,
		scope: {
			id: 		'@',
			className:	'@',
			api:		'=?'
			//addTabFunc:	'=addTab',
		},
		controller: 'psMenuCtrl',
		template: '<a ng-click="func()"></a>',
		link: function(scope, element, attrs, ctrl) {
			ctrl.createMeunu();
			scope.updateDisplay();
			
			// template의 func()
    		scope.func = function() {
    			ctrl.createMeunu();
    		};
		}
	}
}])
// transclude Basic Template (ps-tabs 도 참고)
.directive('psTransclude', function() {
	return {
		restrict: 'A',
	    require: '^psMenu',
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {
	          element.empty();
	          element.append(clone);
	        });
		}
	};
})
// factory Basic Template (ps-tabs 도 참고)
// controller, directive 의 인자로 넘겨줘서 사용한다.
/*
angular.module('ps.directives.menu', [])
.controller('psMenuCtrl', ['$scope', 'psFactory', function($scope, psFactory) {
	psFactory.Container();
}
.directive('uiSplitbar', ['psFactory', function(psFactory) {
	psFactory.Splitbar();
}
*/
.factory('psFactory', function() {
	function BaseContainer() {
		this.size = 0;
		this.element = null;
    }
	
	// Splitbar container
	function SplitbarContainer() {
		this.size = 10;
		this.element = null;
	}

	return {
		Container: function(initialSize) {
	        return new BaseContainer(initialSize);
		},
		Splitbar: function() {
	        return new SplitbarContainer();
		},
		isSplitbar: function(container) {
			return container instanceof SplitbarContainer;
		}
	};
});