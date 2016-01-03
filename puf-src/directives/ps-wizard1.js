/**
 * ps-wizard directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/07/13
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-wizard id="wizard" options="options" on-step-changing="onStepChanging" on-step-changed="onStepChanged" select-node="selectNode"></ps-wizard>
 * 
 * jquery-steps 라이브러리에 종속적이다.
 */

angular.module('ps.directives.wizard1', [])
.directive('psWizard1', ['$compile', '$parse', 'psUtil', function($compile, $parse, psUtil) {
	return {
        restrict: 'E',
        replace: true,
        transclude : true,
        scope: {
        	id:				'@',
        	name:			'@',
        	className:		'@',
        	direction:		'@',
        	options: 		'=',
        	onStepChanging: '=',
        	onStepChanged: 	'=',
        	onCanceled: 	'=',
        	onFinishing: 	'=',
        	onFinished: 	'=',
        	selectNode:		'=?',
        	dblclick:		'=?'
        },
        template: '<div ng-class="className" ps-wizard-transclude></div>',
        link: function(scope, element, attrs, ctrl) {
        	var wizard,
            opts,
            defaults = {
            	/* Appearance */
            	headerTag: 'ps-step-title',
        	    bodyTag: 'ps-step-content',
//        	    contentContainerTag: "div",
//        	    actionContainerTag: "div",
//        	    stepsContainerTag: "div",
//        	    cssClass: "wizard",
        	    stepsOrientation: scope.direction ? scope.direction : 'horizontal',//$.fn.steps.stepsOrientation.horizontal,

        	    /* Templates */
//        	    titleTemplate: '<span class="number">#index#.</span> #title#',
//        	    loadingTemplate: '<span class="spinner"></span> #text#',

        	    /* Behaviour */
//        	    autoFocus: false,
//        	    enableAllSteps: false,
//        	    enableKeyNavigation: true,
//        	    enablePagination: true,
//        	    suppressPaginationOnFocus: true,
//        	    enableContentCache: true,
//        	    enableCancelButton: true,
//        	    enableFinishButton: true,
//        	    preloadContent: false,
//        	    showFinishButtonAlways: false,
//        	    forceMoveForward: false,
//        	    saveState: false,
//        	    startIndex: 0,

        	    /* Transition Effects */
//        	    transitionEffect: $.fn.steps.transitionEffect.none,
//        	    transitionEffectSpeed: 200,

        	    /* Events */
        	    onStepChanging: scope.onStepChanging, 	// function (event, currentIndex, newIndex) { return true; },
        	    onStepChanged: scope.onStepChanged, 	// function (event, currentIndex, priorIndex) { }, 
        	    onCanceled: scope.onCanceled, 			// function (event) { },
        	    onFinishing: scope.onFinishing, 		// function (event, currentIndex) { return true; }, 
        	    onFinished: scope.onFinished, 			// function (event, currentIndex) { },
        	    onInit: function (event, currentIndex) { 
//        	    	scope.init();
        	    },
        	    
        	    /* Labels */
        	    labels: {
        	        cancel: $ps_locale.cancel,
        	        current: $ps_locale.wizard.current,
        	        pagination: $ps_locale.wizard.pagination,
        	        finish: $ps_locale.finish,
        	        next: $ps_locale.next,
        	        previous: $ps_locale.prev,
        	        loading: $ps_locale.loading
        	    }
            };
            
        	if(angular.isDefined(attrs.id) == false) {
				attrs.id = psUtil.getUUID();
			}
        	
//        	scope.init = function() {
//        		$compile(element[0].children[1])(scope.$parent);
//        	};
        	
        	//console.log(element.find('ps-step-content'));
//        	var contents = [];
//        	$.each(element.find('ps-step-content'), function(index, value) {
////        		contents.push($(value).empty());
//        		contents.push($(value).children().remove());
//        	});
//        	console.log(contents);
        	
        	element.steps(defaults);
        	//console.log(element[0]);
        	$compile(element[0].children[0])(scope.$parent);
        	//$compile(element[0].children[1])(scope.$parent);	// wizard 의 steps/content/actions 부분에서 content 부분 $compile
        	//$compile(element[0].children[2])(scope.$parent);
        	
//        	$.each(element.find('ps-step-content'), function(index, value) {
//        		$(value).append($compile(contents.shift())(scope.$parent));
//        	});
        	
        	/*
        	element.wrapInner('<div class="steps-wrapper">');
            var steps = element.children('.steps-wrapper').steps(defaults);
            $compile(steps)(scope.$parent);
            */
        	
        	/*
            scope.$watch('options', function (value) {
//            	console.log('wizard options');
            	opts = $.extend({}, defaults, value);
//            	element.empty(); wizard plugin 동작원리상 empty 하면 안된다.
            	element.steps(opts);
            	$compile(element[0].children[1])(scope.$parent);	// wizard 의 steps/content/actions 부분에서 content 부분 $compile
            });
            */
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
});
