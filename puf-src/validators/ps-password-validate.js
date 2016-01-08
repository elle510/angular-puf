/**
 * ps-password-validate directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/08/09
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <input id="inputPassword" type="password" ng-model="password" class="immediate-help" placeholder="Password" ps-password-validate required>
 * 
 * 참고사이트(<span my-dir="exp"></span>)
 * http://jsfiddle.net/simpulton/5gWjY/
 * 
 * ng-model controller
 * https://docs.angularjs.org/api/ng/type/ngModel.NgModelController
 */

angular.module('ps.validators.password', [])
.directive('psPasswordValidate', ['$compile', function($compile) {
	return {
		// restrict to an attribute type.
        restrict: 'A',
        
        // element must have ng-model attribute.
        require: 'ngModel',
        
        // scope 		= the parent scope
        // element 		= the element the directive is on
        // attrs 		= a dictionary of attributes on the element
        // modelCtrl 	= the controller for ngModel.
        link: function (scope, element, attrs, modelCtrl) {
        	//console.log(element[0].form);
//        	console.log(element[0].name);
        	var showFlag = element[0].form.name + '.' + element[0].name + '.$error.passwordValidate';
        	
        	// error message tag
        	var span = angular.element('<span class="error-msg" ng-show="' + showFlag + '">' + $ps_locale.validators.passwordErrorMsg + '</span>');
        	$compile(span)(scope);
        	$(element[0]).after(span);
        	
        	var focus_out = false, 
        	display = span.css('display');
        	$(element[0]).focusout(function(eventObject) {
        		if(modelCtrl.$viewValue == '' || modelCtrl.$viewValue == undefined) return;
        		focus_out = true;
//        		console.log(eventObject.target.value);
        		span.css('display', display);
        	});
        	
        	// add a parser that will process each time the value is 
            // parsed into the model when the user updates it.
        	// value - view value
        	modelCtrl.$parsers.unshift(function(value) {
        		if(focus_out == false) {        			
        			span.css('display', 'none');
        		}
        		
                scope.pwdValidLength = (value && value.length >= 8 ? 'valid' : undefined);
                scope.pwdHasLetter = (value && /[A-z]/.test(value)) ? 'valid' : undefined;
                scope.pwdHasNumber = (value && /\d/.test(value)) ? 'valid' : undefined;
                
                // if it's valid, return the value to the model, 
                // otherwise return undefined.
                if(scope.pwdValidLength && scope.pwdHasLetter && scope.pwdHasNumber) {
                	modelCtrl.$setValidity('passwordValidate', true);
                    return value;
                } else {
                	modelCtrl.$setValidity('passwordValidate', false);                    
                    return undefined;
                }
        		
            });
            
        	// add a formatter that will process each time the value 
            // is updated on the DOM element.
        	/*modelCtrl.$formatters.unshift(function(value) {
                // validate.
        		modelCtrl.$setValidity('regexValidate', regex.test(value));
                
                // return the value or nothing will be written to the DOM.
                return value;
            });*/
            
        }
    };
}]);