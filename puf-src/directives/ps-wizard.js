/**
 * ps-wizard directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2016/01/03
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-wizard id="wizard" on-step-changing="onStepChanging" on-step-changed="onStepChanged" select-node="selectNode"></ps-wizard>
 * 
 */

angular.module('ps.directives.wizard', [])
.controller('psWizardCtrl', ['$scope', function($scope) {
	var ctrl = this,
	index = -1, // points to the current step in the steps array
	steps = ctrl.steps = $scope.steps = [];
	
//	ctrl.select = function(selectedTab) {
//		angular.forEach(tabs, function(tab) {
//			if (tab.active && tab !== selectedTab) {
//				tab.active = false;
//				tab.onDeselect();
//			}
//		});
//		selectedTab.active = true;
//		selectedTab.onSelect();
//	};
	
	ctrl.addStep = function addTab(step) {
//		console.log(step);
		steps.push(step);
		if (index == -1) {
			index = 0;
			steps[0].selected = true;
		}
		// we can't run the select function on the first tab
		// since that would select it twice
//		if (tabs.length === 1) {
//			tab.active = true;
//		} else if (tab.active) {
//			ctrl.select(tab);
//		}
	};

//	ctrl.removeStep = function removeTab(tab) {
//		var index = tabs.indexOf(tab);
//		//Select a new tab if the tab to be removed is selected
//		if (tab.active && tabs.length > 1) {
//			//If this is the last tab, select the previous tab. else, the next tab.
//			var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
//			//ctrl.select(tabs[newActiveIndex]);
//		}
//		tabs.splice(index, 1);
//		//tab.onRemove();
//	};
}])
.directive('psWizard', ['$compile', function($compile) {
	return {
		restrict: 'E',
		transclude: true,
		replace: true,
		scope: {
			id:				'@',
        	name:			'@',
        	className:		'@',
        	direction:		'@',
        	onStepChanging: '=',
        	onStepChanged: 	'=',
        	onCanceled: 	'=',
        	onFinishing: 	'=',
        	onFinished: 	'=',
        	selectNode:		'=?',
        	dblclick:		'=?'
        },
        controller: 'psWizardCtrl',
        template: '<div class="wizard" ng-class="className">' +
        			'<div class="steps">' +
        				'<ul>' +
        					'<li ng-class="{disabled: !step.completed && !step.selected, current: step.selected && !step.completed, done: step.completed && !step.selected, editing: step.selected && step.completed}" ng-repeat="step in steps">' +
        						'<a ng-click="goTo(step)"><span class="number">{{$index+1}}.</span>{{step.title}}</a>' +
        					'</li>' +
        				'</ul>' +
        			'</div>' +
        			'<div class="contents" ng-transclude>' +       				
        			'</div>' +
        			'<div class="actions">' +
        			'</div>' +
        		  '</div>',
//        template: '<div class="wizard" ng-class="className">' +
//        			'<div class="steps">' +
//		    			'<ul ng-transclude></ul>' +
//		    		'</div>' +
//		    		'<div class="content">' +
//		    				'<div class="content" ' +
//		    					 'ng-repeat="step in steps" ' +
//		    					 'ng-class="{current: step.selected, done: step.completed}"' +		    					 
//		    					 'ng-style="{height: contentHeight}"' +
//		    					 'ps-wizard-content-transclude>' +
//		    					 	'<div ng-if="step.templateUrl" ng-include="step.templateUrl"></div>' +
//		    				'</div>' +
//		    		'</div>' +
//		    	  '</div>',
        link: function(scope, element, attrs, ctrl, transclude) {
			 
        }
	};
}])
.directive('psWizardStep', ['$parse', function($parse) {
	return {
	    require: '^psWizard',
	    restrict: 'E',
	    transclude: true,
	    replace: true,
	    scope: {
	    	templateUrl:	'@',
	    	title:			'='
	    },
//	    controller: function(scope) {
//	    	//Empty controller so other directives can require being 'under' a tab
//	    	scope.selected = false;
//	    },
	    template: '<div ng-show="selected" ng-class="{current: selected, done: completed}" class="content" ng-transclude>' + 
	    			'<div ng-if="templateUrl" ng-include="templateUrl"></div>' +
	    		  '</div>',
	    /*compile: function(element, attrs, transclude) {
	    	
	    	return function postLink(scope, element, attrs, ctrl) {
	    		
	    		$scope.wztitle = $scope.title;
	    		ctrl.addStep(scope);
	    		
	    	};
	    },*/
	    link: function(scope, element, attrs, ctrl, transclude) {
	    	scope.selected = false;
    		ctrl.addStep(scope);
    		scope.$transcludeFn = transclude;
	    }
	};
}])
.directive('psWizardTransclude', function() {
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
.directive('psWizardStepTransclude', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, controller, transclude) {		
//			var step = scope.$eval(attrs.psWizardStepTransclude);
	    	console.log(scope);
	    	
	    	scope.$transcludeFn(scope.$parent, function(content) {
				element.append(content);
	    	});
		}
	};
});