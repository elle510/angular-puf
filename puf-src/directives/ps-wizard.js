/**
 * ps-tree directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/07/13
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-wizard id="wizard" options="options" changed="changed" select-node="selectNode"></ps-wizard>
 * 
 * jstree 라이브러리에 종속적이다.
 */

angular.module('ps.directives.wizard', [])
.directive('psWizard', ['$compile', function($compile) {
	return {
        restrict: 'E',
        replace: true,
        transclude : true,
        scope: {
        	id:			'@',
        	name:		'@',
        	className:	'@',
        	form: 		'@',
        	options: 	'=',
        	changed:	'=?',
        	selectNode:	'=?',
        	dblclick:	'=?'
        },
        template: '<div></div>',
        compile: function(element, attrs, transclude) {
        	//console.log(element[0]);
        	var wizard, strHtml;
        	if(!angular.isDefined(attrs.form)) {
        		attrs.form = 'true';
        	}
        	
        	if(!angular.isDefined(attrs.id)) {
        		var d = new Date();
        		attrs.id = 'wizard' + d.getTime();
        	}
        	
        	if(attrs.form == "true") {
        		strHtml = '<form';
        		if(angular.isDefined(attrs.id)) {
        			strHtml += ' id="' + attrs.id + '"';
        		}
        		if(angular.isDefined(attrs.name)) {
        			strHtml += ' name="' + attrs.name + '"';
        		}
        		strHtml += ' action="#" ps-wizard-transclude></form>';
        	}else {
        		strHtml = '<div';
        		if(angular.isDefined(attrs.id)) {
        			strHtml += ' id="' + attrs.id + '"';
        		}
        		if(angular.isDefined(attrs.name)) {
        			strHtml += ' name="' + attrs.name + '"';
        		}
        		strHtml += ' ps-wizard-transclude></div>';
        	}
//        	console.log(strHtml);
        	
			if(angular.isDefined(attrs.className)) {
//				div = '<div class="' + attrs.className + '">' + wizard + '</div>';
				element.addClass(attrs.className);
			}/*else {
				div = '<div>' + wizard + '</div>';
			}*/
			
			element.removeAttr('id');
			wizard = angular.element(strHtml);
			element.append(wizard);
//			console.log(element);
			
//			wizard.steps();
			return function postLink(scope, element, attrs/*, controller*/) {
        		//console.log('compile');
        		//$compile(element)(scope);
				var wizard,
	            opts,
	            defaults = {
	            	/* Appearance */
	            	headerTag: 'step-title',
	        	    bodyTag: 'step-content',
//	        	    contentContainerTag: "div",
//	        	    actionContainerTag: "div",
//	        	    stepsContainerTag: "div",
//	        	    cssClass: "wizard",
//	        	    stepsOrientation: $.fn.steps.stepsOrientation.horizontal,

	        	    /* Templates */
//	        	    titleTemplate: '<span class="number">#index#.</span> #title#',
//	        	    loadingTemplate: '<span class="spinner"></span> #text#',

	        	    /* Behaviour */
//	        	    autoFocus: false,
//	        	    enableAllSteps: false,
//	        	    enableKeyNavigation: true,
//	        	    enablePagination: true,
//	        	    suppressPaginationOnFocus: true,
//	        	    enableContentCache: true,
//	        	    enableCancelButton: true,
//	        	    enableFinishButton: true,
//	        	    preloadContent: false,
//	        	    showFinishButtonAlways: false,
//	        	    forceMoveForward: false,
//	        	    saveState: false,
//	        	    startIndex: 0,

	        	    /* Transition Effects */
//	        	    transitionEffect: $.fn.steps.transitionEffect.none,
//	        	    transitionEffectSpeed: 200,

	        	    /* Events */
//	        	    onStepChanging: function (event, currentIndex, newIndex) { return true; },
//	        	    onStepChanged: function (event, currentIndex, priorIndex) { }, 
//	        	    onCanceled: function (event) { },
//	        	    onFinishing: function (event, currentIndex) { return true; }, 
//	        	    onFinished: function (event, currentIndex) { },

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
	            console.log(scope.options);
	            opts = $.extend({}, defaults, scope.options);
	            wizard = element.children();
//	            console.log(wizard);
	            wizard.steps(opts);
//	            $('#' + attrs.id).steps(opts);
        	};
        }
    };
}])
.directive('psWizardTransclude', function() {
	return {
		link: function(scope, element, attrs, controller, transclude) {
	        transclude(scope.$parent, function(clone) {
	          element.empty();
	          element.append(clone);
	        });
		}
	};
});
