(function( $ ) {
	"use strict";
	
	$.fn.extend({
		
		createMetisMenu: function(json, initSelectedIndex) {
			var div = this,
			menu = '<nav class="sidebar-nav"><ul class="metisMenu">';
			
			if(typeof initSelectedIndex == 'undefined') {
				initSelectedIndex = 0;
			}
			
			$.each(json, function( index, value ) {
//	    		console.log( index + ": " + value.label );
	    		//menu += "<li class='category' data-target='"+value.id+"'><i class='"+value.icon+"'></i>"+value.label+"</li>";
	    		//value.url ? value.url : '#'
	    		if(index == initSelectedIndex) {
	    			menu += '<li class="active">';
	    		}else {
	    			menu += '<li>';
	    		}
	    		
	    		if(value.url) {
	    			menu += '<a href="'+value.url+'">';
	    		}else {
	    			menu += '<a href="#">';
	    		}
	    		
	    		if(value.icon) {
	    			menu += '<i class="sidebar-nav-item-icon fa '+value.icon+' fa-lg"></i> ';
	    		}
	    		
	    		menu += value.label + '<i class="fa fa-lg arrow"></i></a>';
	    		
	    		if(value.children) {
	    			//console.log($.createMetisSubMenu(value.children));
	    			menu += $.createMetisSubMenu(value.children);
	    		}
	    		menu += '</li>';
	    	});
			
			menu += '</ul></nav>';
			//console.log(menu);
			div[0].innerHTML = menu;
			//return menu;
		}
	});
	
	$.extend({
		
		createMetisMenu: function(json, initSelectedIndex) {
			var menu = '<nav class="sidebar-nav"><ul class="metisMenu">';
			
			if(typeof initSelectedIndex == 'undefined') {
				initSelectedIndex = 0;
			}
			
			$.each(json, function( index, value ) {
//	    		console.log( index + ": " + value.label );
	    		//menu += "<li class='category' data-target='"+value.id+"'><i class='"+value.icon+"'></i>"+value.label+"</li>";
	    		//value.url ? value.url : '#'
	    		if(index == initSelectedIndex) {
	    			menu += '<li class="active">';
	    		}else {
	    			menu += '<li>';
	    		}
	    		
	    		if(value.url) {
	    			menu += '<a href="'+value.url+'">';
	    		}else {
	    			menu += '<a href="#">';
	    		}
	    		
	    		if(value.icon) {
	    			menu += '<i class="sidebar-nav-item-icon fa '+value.icon+' fa-lg"></i> ';
	    		}
	    		
	    		menu += value.label + '<i class="fa fa-lg arrow"></i></a>';
	    		
	    		if(value.children) {
	    			//console.log($.createMetisSubMenu(value.children));
	    			menu += $.createMetisSubMenu(value.children);
	    		}
	    		menu += '</li>';
	    	});
			
			menu += '</ul></nav>';
			//console.log(menu);
			return menu;
		},
		createMetisSubMenu: function(children) {
			var subMenu = '<ul>';
			$.each(children, function(childIndex, childValue) {
				subMenu += '<li>';
				if(childValue.url) {
					subMenu += '<a href="'+childValue.url+'">';
				}else {
					subMenu += '<a href="#">';
				}
				
				if(childValue.icon) {
					subMenu += '<i class="sidebar-nav-item-icon '+childValue.icon+'"></i> ';
	    		}
				
				subMenu += childValue.label;// + '</a>';
				
				if(childValue.children) {
					subMenu += '<i class="fa plus-minus"></i></a>';
	    			subMenu += $.createMetisSubMenu(childValue.children);
	    		}else {
	    			subMenu += '</a>';
	    		}
				
				subMenu += '</li>';
			});
			subMenu += '</ul>';
			
			return subMenu;
		}
	});
	
	/*
    // ¿¹Á¦
    $.fn.openPopup = function() {
        // Open popup code.
    	console.log(this);
    	console.log($(this));
    };
 
    $.fn.closePopup = function() {
        // Close popup code.
    };
 	*/
})( jQuery );