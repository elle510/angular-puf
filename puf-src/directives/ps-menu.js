/**
 * ps-menu directives
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/09/10
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 * example:
 * Array data
 * <ps-menu data="data"></ps-menu>
 * 
 * smartmenus 라이브러리에 종속적이다.
 * bootstrap 사용
 */

angular.module('ps.directives.menu', [])
.controller('psMenuCtrl', ['$scope', function($scope) {
	var ctrl = this;
	
	ctrl.init = function() {
		
		// DOM 생성후 아래 코드가 실행되어야 하므로
		// jquery.smartmenus.bootstrap.js 의 코드를 compile link에서 DOM 생성후 호출(ctrl.init())
		
		// init all navbars that don't have the "data-sm-skip" attribute set
		var $navbars = $('ul.navbar-nav:not([data-sm-skip])');
		$navbars.each(function() {
			var $this = $(this);
			$this.addClass('sm').smartmenus({

					// these are some good default options that should work for all
					// you can, of course, tweak these as you like
					subMenusSubOffsetX: 2,
					subMenusSubOffsetY: -6,
					subIndicators: false,
					collapsibleShowFunction: null,
					collapsibleHideFunction: null,
					rightToLeftSubMenus: $this.hasClass('navbar-right'),
					bottomToTopSubMenus: $this.closest('.navbar').hasClass('navbar-fixed-bottom')
				})
				.bind({
					// set/unset proper Bootstrap classes for some menu elements
					'show.smapi': function(e, menu) {
						var $menu = $(menu),
							$scrollArrows = $menu.dataSM('scroll-arrows');
						if ($scrollArrows) {
							// they inherit border-color from body, so we can use its background-color too
							$scrollArrows.css('background-color', $(document.body).css('background-color'));
						}
						$menu.parent().addClass('open');
					},
					'hide.smapi': function(e, menu) {
						$(menu).parent().removeClass('open');
					}
				})
				// set Bootstrap's "active" class to SmartMenus "current" items (should someone decide to enable markCurrentItem: true)
				.find('a.current').parent().addClass('active');

			// keep Bootstrap's default behavior for parent items when the "data-sm-skip-collapsible-behavior" attribute is set to the ul.navbar-nav
			// i.e. use the whole item area just as a sub menu toggle and don't customize the carets
			var obj = $this.data('smartmenus');
			if ($this.is('[data-sm-skip-collapsible-behavior]')) {
				$this.bind({
					// click the parent item to toggle the sub menus (and reset deeper levels and other branches on click)
					'click.smapi': function(e, item) {
						if (obj.isCollapsible()) {
							var $item = $(item),
								$sub = $item.parent().dataSM('sub');
							if ($sub && $sub.dataSM('shown-before') && $sub.is(':visible')) {
								obj.itemActivate($item);
								obj.menuHide($sub);
								return false;
							}
						}
					}
				});
			}

			var $carets = $this.find('.caret');

			// onresize detect when the navbar becomes collapsible and add it the "sm-collapsible" class
			var winW;
			function winResize() {
				var newW = obj.getViewportWidth();
				if (newW != winW) {
					if (obj.isCollapsible()) {
						$this.addClass('sm-collapsible');
						// set "navbar-toggle" class to carets (so they look like a button) if the "data-sm-skip-collapsible-behavior" attribute is not set to the ul.navbar-nav
						if (!$this.is('[data-sm-skip-collapsible-behavior]')) {
							$carets.addClass('navbar-toggle sub-arrow');
						}
					} else {
						$this.removeClass('sm-collapsible');
						if (!$this.is('[data-sm-skip-collapsible-behavior]')) {
							$carets.removeClass('navbar-toggle sub-arrow');
						}
					}
					winW = newW;
				}
			};
			winResize();
			$(window).bind('resize.smartmenus' + obj.rootId, winResize);
		});
	}
	
	ctrl.createMeunu = function(data) {
//		console.log('ctrl.createMeunu');
		var menu = '', li, href, 
		icon = '',
		caret = '', 
		subMenu = '';
		angular.forEach(data, function(value) {
//			console.log(value);
			
			// 링크(Route)
			if(value.route)
				href = 'ui-sref="' + value.route + '"';
			else if(value.url)
				href = 'href="' + value.url + '"';
			else
				href = 'href="#"';
			
			// 아이콘
			if(value.icon) {
				icon = '<i class="' + value.icon + '"></i> ';
			}else {
				icon = '';
			}
			
			// children 존재한다면
			if(value.children && value.children.length > 0) {
				caret = ' <span class="caret"></span>';
				subMenu = createSubMenu(value.children);
			}else {
				caret = '';
				subMenu = '';
			}
			
			li = '<li><a ' + href + '>' + icon + value.text + caret + '</a>' + subMenu + '</li>';
//			console.log(li);
			menu += li;
		});
		
		return menu;
	};
	
	function createSubMenu(children) {
		var subMenu = '<ul class="dropdown-menu">',
		href, li,
		icon = '',
		caret = '',
		_subMenu = '';
		angular.forEach(children, function(value) {
//			console.log(value);
			// 링크(Route)
			if(value.route)
				href = 'ui-sref="' + value.route + '"';
			else if(value.url)
				href = 'href="' + value.url + '"';
			else
				href = 'href="#"';
			
			// 아이콘
			if(value.icon) {
				icon = '<i class="' + value.icon + '"></i> ';
			}else {
				icon = '';
			}
			
			// children 존재한다면
			if(value.children && value.children.length > 0) {
				caret = ' <span class="caret"></span>';
				_subMenu = createSubMenu(value.children);
			}else {
				caret = '';
				_subMenu = '';
			}
			
			li = '<li><a ' + href + '>' + icon + value.text + caret + '</a>' + _subMenu + '</li>';
			subMenu += li;
		});
		
		subMenu += '</ul>';
//		console.log(subMenu);
		return subMenu;
	}
}])
.directive('psMenu', ['$compile', function($compile) {
	return {
		restrict: 'EA',
		transclude: false,
		replace: true,
		scope: {
			 id: 		'@',
			 className:	'@',
			 data:		'=',	// Array
			 api:		'=?'
		},
		controller: 'psMenuCtrl',
		template: '<ul class="nav navbar-nav"></ul>',
		compile: function(element, attrs, transclude) {
			var menu;
			return function postLink(scope, element, attrs, ctrl) {
				scope.$watch('data', function(data) {
					if(data == undefined) return;
//					console.log(data);
//					console.log(element);
					element.empty();
					
					// create dom
					menu = ctrl.createMeunu(data);
					element.append(menu);
					
					// init menu
					ctrl.init();
				});
				
				scope.$transcludeFn = transclude;
			}
		}
		/*
		link: function(scope, element, attrs, ctrl) {
			
			scope.$watch('data', function(value) {
				if(value == undefined) return;
				console.log(value);
				console.log(element);
				element.empty();
				
			 });
			
			ctrl.createMeunu();
			scope.updateDisplay();
		}
		*/
	}
}]);