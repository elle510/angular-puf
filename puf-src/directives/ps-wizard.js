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
//        template: '<div></div>',
        template: function (element, attrs) {
        	//console.log(element[0]);
        	var wizard, div;
        	if(!angular.isDefined(attrs.form)) {
        		attrs.form = 'true';
        	}
        	
        	if(!angular.isDefined(attrs.id)) {
        		var d = new Date();
        		attrs.id = 'wizard' + d.getTime();
        	}
        	
        	if(attrs.form == "true") {
        		wizard = '<form';
        		if(angular.isDefined(attrs.id)) {
        			wizard += ' id="' + attrs.id + '"';
        		}
        		if(angular.isDefined(attrs.name)) {
        			wizard += ' name="' + attrs.name + '"';
        		}
        		wizard += ' action="#" ps-wizard-transclude></form>';
        	}else {
        		wizard = '<div';
        		if(angular.isDefined(attrs.id)) {
        			wizard += ' id="' + attrs.id + '"';
        		}
        		if(angular.isDefined(attrs.name)) {
        			wizard += ' name="' + attrs.name + '"';
        		}
        		wizard += ' ps-wizard-transclude></div>';
        	}
        	console.log(wizard);
        	
			if(angular.isDefined(attrs.className)) {
				div = '<div class="' + attrs.className + '">' + wizard + '</div>';
			}else {
				div = '<div>' + wizard + '</div>';
			}
			// ps-wizard-transclude 을 이용해서 완성된 DOM을 만든다.
			// link에서는 $("#wizard").steps(); 만 한다.
			console.log(div);
			element.removeAttr('id');
			console.log(element);
			return div;
        },
        link: function (scope, element, attrs) {
            var wizard,
            opts,
            defaults = {
            	/* Appearance */
            	headerTag: "h1",
        	    bodyTag: "div"
//        	    contentContainerTag: "div",
//        	    actionContainerTag: "div",
//        	    stepsContainerTag: "div",
//        	    cssClass: "wizard",
//        	    stepsOrientation: $.fn.steps.stepsOrientation.horizontal,

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
//        	    onStepChanging: function (event, currentIndex, newIndex) { return true; },
//        	    onStepChanged: function (event, currentIndex, priorIndex) { }, 
//        	    onCanceled: function (event) { },
//        	    onFinishing: function (event, currentIndex) { return true; }, 
//        	    onFinished: function (event, currentIndex) { },

        	    /* Labels */
//        	    labels: {
//        	        cancel: "Cancel",
//        	        current: "current step:",
//        	        pagination: "Pagination",
//        	        finish: "Finish",
//        	        next: "Next",
//        	        previous: "Previous",
//        	        loading: "Loading ..."
//        	    }
            };
            console.log('link');
            console.log(element);
            element.removeAttr('id');
            console.log(element);
            console.log(attrs.id);
            opts = $.extend({}, defaults, value);
            $('#' + attrs.id).steps(opts);
            console.log(attrs.id);
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
