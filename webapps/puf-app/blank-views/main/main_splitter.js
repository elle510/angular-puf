/**
 * 
 */

var splitterActiveFlag = false;
var splitterObj = false;
var MIN_LEFT = 60;
var MIN_RIGHT = 200;
var MIN_TOP = 60;
var MIN_BOTTOM = 60;

function splitterMouseDown(a, b) {
    if (!splitterActiveFlag) {
        if (b.setCapture) {
            b.setCapture();
        } else {
            document.addEventListener("mouseup", splitterMouseUp, true);
            document.addEventListener("mousemove", splitterMouseMove, true);
            a.preventDefault();
        }
        splitterActiveFlag = true;
        splitterObj = b;
        console.log(splitterObj.offsetLeft - 15);
    }
};

function splitterMouseUp(b) {
    if (splitterActiveFlag) {
//        var a = document.getElementById("toc");
//        var c = document.getElementById("content");
//        changeQSearchboxWidth();
//        a.style.width = (splitterObj.offsetLeft - 20) + "px";
//        c.style.left = (splitterObj.offsetLeft + 10) + "px";
        $('.left_sidebar').width(splitterObj.offsetLeft - 15);// + "px";
//        $('.menu-switch').offset({ left: splitterObj.offsetLeft - 15 });
//        $('.center').offset({ left: (splitterObj.offsetLeft) });
        if (splitterObj.releaseCapture) {
            splitterObj.releaseCapture();
        } else {
            document.removeEventListener("mouseup", splitterMouseUp, true);
            document.removeEventListener("mousemove", splitterMouseMove, true);
            b.preventDefault();
        }
        splitterActiveFlag = false;
        saveSplitterPos();
    }
};

function splitterMouseMove(a) {
    if (splitterActiveFlag) {
        if (a.clientX >= MIN_LEFT && a.clientX <= document.documentElement.clientWidth - MIN_RIGHT) {
            splitterObj.style.left = a.clientX + "px";
            if (!splitterObj.releaseCapture) {
                a.preventDefault();
            }
        }
    }
};

/* animation 을 위해 margin-left 사용 */
var leftsidebarWidth, menuswitchWidth;
function splitterOpen() {
	$('.left_sidebar').css('margin-left', '0px');
//	$('.left_sidebar').offset({ left: 0 });
//	$('.menu-switch').offset({ left: leftsidebarWidth });
//	$('.center').offset({ left: leftsidebarWidth + menuswitchWidth });
	$('.menu-switch .collapse').css('display', 'block');
	$('.menu-switch .open').css('display', 'none');
	
	$('.left_sidebar').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
		$('.splitter').css('display', 'block');
	});
}

function splitterClose() {
	leftsidebarWidth = $('.left_sidebar').width();
	menuswitchWidth = $('.menu-switch').width();
	$('.left_sidebar').css('margin-left', (leftsidebarWidth * -1) + 'px');
//	$('.left_sidebar').offset({ left: (leftsidebarWidth * -1) });
//	$('.menu-switch').offset({ left: 0 });
//	$('.center').offset({ left: menuswitchWidth });
	$('.splitter').css('display', 'none');
	$('.menu-switch .collapse').css('display', 'none');
	$('.menu-switch .open').css('display', 'block');
	$('.left_sidebar').off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend');
}

function changeQSearchboxWidth() {
    if (getInternetExplorerVersion() != "7") {
        spObj = document.getElementById("splitter");
        var b = document.getElementById("pkg_searchbox");
        var a = document.getElementById("cls_searchbox");
        if (spObj.offsetLeft > 220 && spObj.offsetLeft < 265) {
            if (b != null) {
                b.style.width = spObj.offsetLeft - 138 + "px"
            }
            if (a != null) {
                a.style.width = spObj.offsetLeft - 138 + "px"
            }
        }
        if (spObj.offsetLeft >= 265) {
            if (b != null) {
                b.style.width = "127px"
            }
            if (a != null) {
                a.style.width = "127px"
            }
        }
        if (spObj.offsetLeft <= 220) {
            if (b != null) {
                b.style.width = "82px"
            }
            if (a != null) {
                a.style.width = "82px"
            }
        }
    }
}

function saveSplitterPos() {
    var a = document.getElementById("splitter");
    if (a) {
        setCookie("splitterPosition", a.offsetLeft, new Date(3000, 1, 1, 1, 1), "/", document.location.domain)
    }
}

function getInternetExplorerVersion() {
    var c = -1;
    if (navigator.appName == "Microsoft Internet Explorer") {
        var a = navigator.userAgent;
        var b = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
        if (b.exec(a) != null) {
            c = parseFloat(RegExp.$1)
        }
    }
    return c
}

function setCookie(b, d, a, f, c, e) {
	document.cookie = b+"="+escape(d)+((a)?"; expires="+a.toGMTString():"")+((f)?"; path="+f:"")+((c)?"; domain="+c:"")+((e)?"; secure":"")
}

function getCookie(c) {
	var b = document.cookie;
	var e = c+"=";
	var d = b.indexOf("; "+e);
	if(d == -1) {
		d = b.indexOf(e);
		if(d != 0) {
			return null;
		}
	}else {
		d += 2;
	}
	var a = document.cookie.indexOf(";",d);
	if(a == -1) {
		a = b.length;
	}
	return unescape(b.substring(d+e.length, a));
}

function deleteCookie(a,c,b) {
	if(getCookie(a)) {
		document.cookie=a+"="+((c)?"; path="+c:"")+((b)?"; domain="+b:"")+"; expires=Thu, 01-Jan-70 00:00:01 GMT"
	}
};