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
	currentStep,
	steps = ctrl.steps = $scope.steps = [];
	
	ctrl.addStep = function(step) {
//		console.log(step);
		steps.push(step);
		step.index = steps.length - 1;
		step.selected = false;
		step.completed = false;
		step.errored = false;
		
		if (currentStep === null || currentStep === undefined) {
			step.selected = true;
			currentStep = step;
			$scope.prevDisabled = true;
			$scope.finishDisabled = true;
		}
	};
	
	ctrl.prev = function() {
//		console.log('prev');
		if(currentStep.index > 0) {
			ctrl.goTo(steps[currentStep.index - 1]);
		}
	};
	
	ctrl.next = function() {
//		console.log('next');
		if(currentStep.index < steps.length-1) {
			ctrl.goTo(steps[currentStep.index + 1]);
		}
	};
	
	ctrl.finish = function() {
//		console.log('finish');
		var wizard = $scope.getWizardElement();
		if(wizard.triggerHandler('finishing', [currentStep])) {
			currentStep.selected = true;
			currentStep.completed = true;
			currentStep.errored = false;
			
			var wizardStep = currentStep.getWizardStepElement();
			wizardStep.addClass('done');
			
			// finish 완료 후 발생
			$scope.$emit("finished", currentStep.index);
	    }else {
	    	currentStep.selected = true;
	    	currentStep.completed = false;
	    	currentStep.errored = true;
	    }
		
	};
	
	ctrl.goTo = function(step) {
//		console.log('goTo');
		
		// step 이동전 발생
//		$scope.$emit('stepChanging', currentStep.index, step.index);
		var wizard = $scope.getWizardElement();
		if(wizard.triggerHandler('stepChanging', [currentStep, step])) {
			var oldIndex = currentStep.index;
			currentStep.selected = false;
			currentStep.completed = true;
			currentStep.errored = false;
			
			currentStep = step;
			
			// step 이동후 발생
			$scope.$emit('stepChanged', step.index, oldIndex);
		}else {
			currentStep.completed = false;
			currentStep.errored = true;
		}
	};
	
	$scope.$on('stepChanged', function(event, currentIndex, oldIndex) {
//		console.log('currentIndex: ' + currentIndex);
//		console.log('oldIndex: ' + oldIndex);
		currentStep.selected = true;
//		currentStep.completed = false;
		currentStep.errored = false;
		
		if(currentIndex <= 0) {
			 $scope.prevDisabled = true;
			 $scope.nextDisabled = false;
		}else if(currentIndex > 0 && currentIndex < steps.length-1) {
			$scope.prevDisabled = false;
			$scope.nextDisabled = false;
		}else if(currentIndex >= steps.length-1) {
			$scope.prevDisabled = false;
			$scope.nextDisabled = true;
		}
		
		// finish 버튼 활성/비활성(마지막 step의 completed는 체크하지 않는다. - finish 버튼 클릭시 체크함)
		for(var i=0; i<steps.length-1; i++) {
			if(steps[i].completed == false) {
				$scope.finishDisabled = true;
				break;
			}
			$scope.finishDisabled = false;
		}
		
		// step changed 시 resize 이벤트 발생(jqgrid width 설정을 위해)
		setTimeout(function() {
			$(window).trigger('resize');
		}, 1);
		
		if(typeof $scope.onStepChanged === 'function') {
			$scope.onStepChanged(event, currentIndex, oldIndex);
		}
	});
	
	$scope.$on('finished', function(event, currentIndex) {
		
		if(typeof $scope.onFinished === 'function') {
			$scope.onFinished(event, currentIndex);
		}
		
		if($scope.form) {
			$scope.form.submit();
		}
	});
	
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
        	onStepChanging: '=',	// function (event, currentIndex, newIndex) { return true; }
        	onStepChanged: 	'=',	// function (event, currentIndex, oldIndex) {}
        	onCanceled: 	'=',
        	onFinishing: 	'=',	// function (event, currentIndex) { return true; }
        	onFinished: 	'='		// function (event, currentIndex) {}
        },
        controller: 'psWizardCtrl',
//        template: '<div class="wizard" ng-class="className">' +
//        			'<div class="steps">' +
//        				'<ul>' +
//        					'<li ng-class="{disabled: !step.completed && !step.selected, current: step.selected && !step.completed, done: step.completed && !step.selected, editing: step.selected && step.completed}" ng-repeat="step in steps">' +
//        						'<a ng-click="goTo(step)"><span class="number">{{$index+1}}.</span>{{step.title}}</a>' +
//        					'</li>' +
//        				'</ul>' +
//        			'</div>' +
//        			'<div class="contents" ng-transclude>' +       				
//        			'</div>' +
//        			'<div class="actions">' +
//        			'</div>' +
//        		  '</div>',
        template: '<div class="wizard wizard-clearfix" ng-class="className">' +
        			'<div class="steps wizard-clearfix">' +
		    			'<ul ng-transclude></ul>' +
		    		'</div>' +
		    		'<div class="contents wizard-clearfix">' +
	    				'<div class="content" ' +
	    					 'ng-repeat="step in steps"' +
	    					 'ng-show="step.selected"' +
	    					 'ng-class="{current: step.selected, done: step.completed}"' +		    					 
//		    				 'ng-style="{height: contentHeight}"' +
	    					 'ps-wizard-content-transclude="step">' +
	    					 	'<div ng-if="step.templateUrl" ng-include="step.templateUrl"></div>' +
	    				'</div>' +
		    		'</div>' +
		    		'<div class="actions wizard-clearfix">' +
		    			'<div class="btns-wizard">' +
		    				'<button type="button" class="btn btn-wizard" ng-disabled="prevDisabled" ng-click="prev()">이전</button>' +
		    				'<button type="button" class="btn btn-wizard" ng-disabled="nextDisabled" ng-click="next()">다음</button>' +
		    				'<button type="button" class="btn btn-wizard" ng-disabled="finishDisabled" ng-click="finish()">마침</button>' +
		    			'</div>' +
        			'</div>' +
		    	  '</div>',
        link: function(scope, element, attrs, ctrl, transclude) {
        	/*transclude(scope.$parent, function(clone, scope) {
    			element.append(clone);
    		});*/
        	
//        	if(angular.isDefined(attrs.direction) == false) {
//        		attrs.direction = 'horizontal';
//        	}
        	if(scope.direction && scope.direction == 'vertical') {
        		element.addClass('vertical');
        	}
        	
        	if($(element).parent().get(0).tagName.toLowerCase() == 'form') {
        		scope.form = $(element).parent();
        	}
        	
        	scope.getWizardElement = function() {
        		return element;
        	};
        	
        	scope.prev = function() {
        		ctrl.prev();
        	};
        	
        	scope.next = function() {
        		ctrl.next();
        	};
        	
        	scope.finish = function() {
        		ctrl.finish();
        	};
        	
        	$(element).on('stepChanging', function(event, currentStep, newStep) {
//        		console.log(typeof currentStep.validateStep);
        		
        		var isValidateStep = true, 
        		isOnStepChanging = true;
        		if(typeof currentStep.validateStep === 'function') {
        			isValidateStep = currentStep.validateStep();
    	    	}
    	    	
        		if(typeof scope.onStepChanging === 'function') {
        			isOnStepChanging = scope.onStepChanging(event, currentStep.index, newStep.index);
        		}
        		
       		 	return (isValidateStep && isOnStepChanging) ? true : false;
        	});
        	
        	$(element).on('finishing', function(event, currentStep) {
//       		console.log('currentIndex: ' + currentIndex);
        		
        		var isValidateStep = true, 
        		isOnFinishing = true;
        		if(typeof currentStep.validateStep === 'function') {
        			isValidateStep = currentStep.validateStep();
    	    	}
        		
        		if(typeof scope.onFinishing === 'function') {
        			isOnFinishing = scope.onFinishing(event, currentStep.index);
        		}
        		
       		 	return (isValidateStep && isOnFinishing) ? true : false;
        	});
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
//	    	title:			'@',
	    	templateUrl:	'@',
	    	validateStep:	'='
	    },
//	    controller: function(scope) {
//	    	//Empty controller so other directives can require being 'under' a tab
//	    	scope.selected = false;
//	    },
	    template: '<li ng-class="{disabled: !completed && !selected, current: selected, done: completed && !selected, error: errored}">' +
					'<a ng-click="goToClick()" data-toggle="tooltip" title="{{title}}"><span class="number">{{index+1}}.</span>{{title}}</a>' +
				  '</li>',
//	    template: '<div ng-show="selected" ng-class="{current: selected, done: completed}" class="content" ng-transclude>' + 
//	    			'<div ng-if="templateUrl" ng-include="templateUrl"></div>' +
//	    		  '</div>',
	    /*compile: function(element, attrs, transclude) {
	    	
	    	return function postLink(scope, element, attrs, ctrl) {
	    		
	    		$scope.wztitle = $scope.title;
	    		ctrl.addStep(scope);
	    		
	    	};
	    },*/
	    link: function(scope, element, attrs, ctrl, transclude) {
//	    	scope.title = scope.$parent.$eval(scope.title);
//	    	scope.title = angular.isDefined(attrs.title) ? scope.$parent.$eval(attrs.title) : '';
	    	
	    	if(angular.isDefined(attrs.title)) {
	    		try {
	    			if(scope.$parent.$eval(attrs.title)) {
	    				scope.title = scope.$parent.$eval(attrs.title);
	    			}else {
	    				scope.title = attrs.title;
	    			}
	    			
	    		}catch(e) {
	    			scope.title = attrs.title;
	    		}
	    	}
	    	
	    	scope.selected = false;
	    	scope.goToClick = function() {
	    		if(scope.completed) {
	    			ctrl.goTo(scope);
	    		}
	    	};
    		ctrl.addStep(scope);
    		scope.$transcludeFn = transclude;
    		
    		scope.getWizardStepElement = function() {
        		return element;
        	};
        	
    		/*transclude(scope.$parent, function(clone, scope) {
    			element.append(clone);
    		});*/
	    }
	};
}])
.directive('psWizardContentTransclude', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attrs, controller, transclude) {		
			var step = scope.$eval(attrs.psWizardContentTransclude);
	    	
	    	step.$transcludeFn(step.$parent.$parent, function(contents) {
				element.append(contents);
	    	});
		}
	};
});