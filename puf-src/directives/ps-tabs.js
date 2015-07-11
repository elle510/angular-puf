/**
 * ps-tabs directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2014/06/21
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * <ps-tabset justified="true">
		<ps-tab heading="Justified">Justified content</ps-tab>
		<ps-tab heading="SJ">Short Labeled Justified content</ps-tab>
		<ps-tab heading="Long Justified">Long Labeled Justified content</ps-tab>
	</ps-tabset>
 * 
 * <ps-tabset>
   stacked (Defaults: false) : Whether tabs appear vertically stacked.
   justified (Defaults: false) : Whether tabs fill the container and have a consistent width.
   type (Defaults: 'tabs') : Navigation type. Possible values are 'tabs' and 'pills'.
   contentHeight (Defaults: null) : .tab-pane height
 * 
 * <ps-tab>
   heading or <tab-heading> : Heading text or HTML markup.
   active  (Defaults: false) : Whether tab is currently selected.
   disable  (Defaults: false) : Whether tab is clickable and can be activated. Note that this was previously the disabled attribute, which is now deprecated.
   select() (Defaults: null) : An optional expression called when tab is activated.
   deselect() (Defaults: null) : An optional expression called when tab is deactivated.
 */

angular.module('ps.directives.tabs', [])
.controller('TabsetController', ['$scope', function($scope) {
	var ctrl = this,
    tabs = ctrl.tabs = $scope.tabs = [];
	
	ctrl.select = function(selectedTab) {
		angular.forEach(tabs, function(tab) {
			if (tab.active && tab !== selectedTab) {
				tab.active = false;
				tab.onDeselect();
			}
		});
		selectedTab.active = true;
		selectedTab.onSelect();
	};
	
	ctrl.addTab = function addTab(tab) {
		tabs.push(tab);
		// we can't run the select function on the first tab
		// since that would select it twice
		if (tabs.length === 1) {
			tab.active = true;
		} else if (tab.active) {
			ctrl.select(tab);
		}
	};

	ctrl.removeTab = function removeTab(tab) {
		var index = tabs.indexOf(tab);
		//Select a new tab if the tab to be removed is selected
		if (tab.active && tabs.length > 1) {
			//If this is the last tab, select the previous tab. else, the next tab.
			var newActiveIndex = index == tabs.length - 1 ? index - 1 : index + 1;
			//ctrl.select(tabs[newActiveIndex]);
		}
		tabs.splice(index, 1);
		//tab.onRemove();
	};
}])
.directive('psTabset', ['$compile', function($compile) {
	 return {
		 restrict: 'EA',
		 transclude: true,
		 replace: true,
		 scope: {
			 type: 		'@',
			 //addTabFunc:	'=addTab',
			 api:		'=?'
		 },
		 controller: 'TabsetController',
		 controllerAs: 'tabsetCtrl',
		 template: '<div ng-class="{\'tabs-left\': vertical}">' +
		    			'<ul class="nav nav-{{type || \'tabs\'}}" ng-class="{\'nav-stacked\': stacked, \'nav-justified\': justified}" ng-transclude></ul>' +
		    			'<div class="tab-content">' +
		    				'<div class="tab-pane" ' +
		    					 'ng-repeat="tab in tabs" ' +
		    					 'ng-class="{active: tab.active}"' +
		    					 'ng-style="{height: contentHeight}"' +
		    					 'ps-tab-content-transclude="tab">' +
		    					 	'<div ng-if="tab.templateUrl" ng-include="tab.templateUrl"></div>' +
		    				'</div>' +
		    			'</div>' +
		    		'</div>',
//		 templateUrl: 'template/tabs/tabset.html',
		 link: function(scope, element, attrs) {
			 scope.stacked = angular.isDefined(attrs.stacked) ? scope.$parent.$eval(attrs.stacked) : false;
			 scope.justified = angular.isDefined(attrs.justified) ? scope.$parent.$eval(attrs.justified) : false;
			 scope.vertical = angular.isDefined(attrs.vertical) ? scope.$parent.$eval(attrs.vertical) : false;
			 
			 if(angular.isDefined(attrs.contentHeight)) {
//				 console.log(attrs.contentHeight);
//				 console.log($('.tab-pane'));
//	    		 element.find('.tab-pane').css("height", attrs.height);
//	    		 element.find('.tab-pane').css({height: attrs.height});
//				 $compile($('.tab-pane').css({height: attrs.height}))(scope);
				 scope.contentHeight = scope.$parent.$eval(attrs.contentHeight);
	    	}
			
			 /*
			 scope.addTabFunc = function(tab) {
				console.log('addTab');
				console.log(tab);
             	//tabsetCtrl.addTab(tab);
             };
			 */
			 
             scope.api = {
            	addTab: function(tab) {
            		//console.log('api.addTab');
            		//console.log(scope.tabsetCtrl);
            		//console.log(tab);
            		scope.tabsetCtrl.addTab(tab);
            	}
             };
		 }
	 };
}])
.directive('psTab', ['$parse', function($parse) {
	return {
	    require: '^psTabset',
	    restrict: 'EA',
	    replace: true,
//	    templateUrl: 'template/tabs/tab.html',
	    template: '<li ng-class="{active: active, disabled: disabled}">' +
	    			'<a ng-click="select()" ps-tab-heading-transclude>{{heading}}</a><a ng-if="removable" ng-click="onRemove()">X</a>' +
	    		  '</li>',
	    transclude: true,
	    scope: {
	    	templateUrl:'@',
	    	active: 	'=?',
	    	heading: 	'@',
	    	onSelect: 	'&select', 	//This callback is called in contentHeadingTransclude
	                          		//once it inserts the tab's content into the dom
	    	onDeselect: '&deselect',
	    	removable:	'=',
	    	onRemove:	'&remove'	// template에 onRemove() 를 설정하면 외부에서 remove에 설정한 함수 호출
	    },
	    controller: function() {
	    	//Empty controller so other directives can require being 'under' a tab
	    },
	    compile: function(element, attrs, transclude) {
	    	
	    	return function postLink(scope, element, attrs, tabsetCtrl) {
	    		scope.$watch('active', function(active) {
	    			if (active) {
	    				tabsetCtrl.select(scope);
	    			}
	    		});

	    		scope.disabled = false;
	    		if ( attrs.disabled ) {
	    			scope.$parent.$watch($parse(attrs.disabled), function(value) {
	    				scope.disabled = !! value;
	    			});
	    		}
	    		
	    		// template의 select()
	    		scope.select = function() {
	    			if ( !scope.disabled ) {
	    				scope.active = true;
	    			}
	    		};

	    		// template의 remove()
	    		scope.remove = function() {
	    			if ( !scope.disabled ) {
	    				//console.log('remove');
	    				tabsetCtrl.removeTab(scope);
	    				//$scope.$emit('$destroy');
	    			}
	    		};
	    		
	    		tabsetCtrl.addTab(scope);
	    		scope.$on('$destroy', function() {
	    			tabsetCtrl.removeTab(scope);
	    		});

	    		//We need to transclude later, once the content container is ready.
	    		//when this link happens, we're inside a tab heading.
	    		scope.$transcludeFn = transclude;
	    	};
	    }
	};
}])
.directive('psTabHeadingTransclude', function() {
	return {
	    restrict: 'A',
	    require: '^psTab',
	    link: function(scope, element, attrs, tabCtrl) {
	    	scope.$watch('headingElement', function updateHeadingElement(heading) {
	    		if (heading) {
	    			element.html('');
	    			element.append(heading);
	    		}
	    	});
	    }
	};
})
.directive('psTabContentTransclude', function() {
	return {
		restrict: 'A',
	    require: '^psTabset',
	    link: function(scope, element, attrs) {
	    	var tab = scope.$eval(attrs.psTabContentTransclude);
	    	
	    	//Now our tab is ready to be transcluded: both the tab heading area
	    	//and the tab content area are loaded.  Transclude 'em both.
	    	tab.$transcludeFn(tab.$parent, function(contents) {
	    		angular.forEach(contents, function(node) {
	    			if (isTabHeading(node)) {
	    				//Let psTabHeadingTransclude know.
	    				tab.headingElement = node;
	    			} else {
	    				element.append(node);
	    			}
	    		});
	    	});
	    }
	};
	
	/**
	 * 태그이름으로 tab heading인지 아닌지 true or false 리턴.
	 * @param element
	 * @return true/false
	 */
	function isTabHeading(node) {
		return node.tagName &&  (
			node.hasAttribute('ps-tab-heading') ||
			node.hasAttribute('data-ps-tab-heading') ||
			node.tagName.toLowerCase() === 'ps-tab-heading' ||
			node.tagName.toLowerCase() === 'data-ps-tab-heading'
		);
	}
});
