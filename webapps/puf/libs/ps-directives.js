/**
 * ps-directives
 * 모든 ps directive 의 모듈
 */
'use strict';

angular.module('ps.directives', ['ps.directives.stepper']);

angular.module('ps.directives.stepper', [])
.directive('psStepper', function ($compile) {
	return {
		restrict: 'AE',
        require: 'ngModel',	// get a hold of NgModelController
        //replace: true,
        scope: {
        	min: 		'=',
            max: 		'=',
            step: 		'=',
            direction: 	'@'		// vertical, horizontal, both
        },        
		template: function (element, attrs) {
			//console.log(attrs.optionValue);
			if(!angular.isDefined(attrs.direction)) {
				attrs.direction = 'vertical';
			}
			
			var temp;
			if(attrs.direction == 'vertical' || attrs.direction == 'horizontal') {
				var _direction;
				if(attrs.direction == 'vertical') {
					_direction = "input-group-btn-vertical";
				}else {
					_direction = "input-group-btn-horizontal";
				}
				
				temp = '<div class="input-group stepper">' +
							'<input type="text" class="form-control">' +
							'<div class="'+_direction+'">' +
								'<button class="btn btn-default" ng-disabled="isOverMax()" ng-click="increment()"><i class="fa fa-caret-up"></i></button>' +
								'<button class="btn btn-default" ng-disabled="isOverMin()" ng-click="decrement()"><i class="fa fa-caret-down"></i></button>' +
							'</div>' +
					   '</div>';
				
			}else {
				// both
				
			}
			
			return temp;
	    },
        link: function (scope, element, attrs, ngModelController) {
            
        	ngModelController.$render = function() {
        		element.find('input').val(ngModelController.$viewValue);
                // update the validation status
                checkValidity();
            };
            
            // when model change, cast to integer
            ngModelController.$formatters.push(function(value) {
                return parseInt(value, 10);
            });

            // when view change, cast to integer
            ngModelController.$parsers.push(function(value) {
                return parseInt(value, 10);
            });

            function checkValidity() {
                // check if min/max defined to check validity
                var valid = !(scope.isOverMin(true) || scope.isOverMax(true));
                // set our model validity
                // the outOfBounds is an arbitrary key for the error.
                // will be used to generate the CSS class names for the errors
                ngModelController.$setValidity('outOfBounds', valid);
            }
            
            function updateModel(offset) {
                // update the model, call $parsers pipeline...
                ngModelController.$setViewValue(ngModelController.$viewValue + offset);
                // update the local view
                ngModelController.$render();
            }
            
            scope.isOverMin = function(strict) {
                var offset = strict ? 0 : scope.step;
                return (angular.isDefined(scope.min) && (ngModelController.$viewValue - offset) < parseInt(scope.min, 10));
            };

            /**
             * @name isOverMax
             * @param strict
             * @description When the user clicks the increment button, increments the value by the step coefficient
             */
            scope.isOverMax = function(strict) {
                var offset = strict ? 0 : scope.step;
                return (angular.isDefined(scope.max) && (ngModelController.$viewValue + offset) > parseInt(scope.max, 10));
            };
            
            /**
             * @name increment
             * @description When the user clicks the increment button, increments the value by the step coefficient
             */
            scope.increment = function() {
                if(angular.isDefined(scope.step) && !isNaN(Number(scope.step))){
                    updateModel(+Number(scope.step));
                }
            };

            /**
             * @name decrement
             * @description UWhen the user clicks the increment button, decrements the value by the step coefficient
             */
            scope.decrement = function() {
                if(angular.isDefined(scope.step) && !isNaN(Number(scope.step))){
                    updateModel(-Number(scope.step));
                }
            };
            
            // check validity on start, in case we're directly out of bounds
            checkValidity();

            // watch out min/max and recheck validity when they change
            scope.$watch('min+max', function() {
                checkValidity();
            });
            
        }
    };
	
});

/*define(['angular'], function(angular) {
	
	return 
	
	var directiveName,
	directiveFactory,
	registerApp = function(app) {
		console.log(directiveName);
		app.register.directive(directiveName, directiveFactory);
	};
	
	return {
		directiveName: directiveName,
		directiveFactory: directiveFactory,
		registerApp: registerApp
	}
	
	
	
	var directive = function () {
        var directiveName,
        directiveFactory,
        
        registerApp = function (app) {
        	console.log(directiveName);
        	app.register.directive(directiveName, directiveFactory);
        };

        return {
        	directiveName: directiveName,
    		directiveFactory: directiveFactory,
    		registerApp: registerApp
        };
    }();
    // directive.registerApp(app);
    return directive;
	
});*/

