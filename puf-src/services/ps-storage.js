/**
 * factory template
 * 
 * version <tt>$ Version: 1.0 $</tt> date:2015/11/04
 * author <a href="mailto:hrahn@nkia.co.kr">Ahn Hyung-Ro</a>
 * 
 */

angular.module('ps.services.storage', [])
.factory('psStorage', ['$window', '$location', function($window, $location) {
	var root = {};
	
	// storage 제공유무를 판단하기 위한 상수
	root.NotSupport = 'NotSupport';
	
	// localStorage 저장                
    root.setLocalStorage = function(key, value) {
    	if(isSupportStorage() == false) return this.NotSupport;
    	localStorage.setItem(key, value);
//    	localStorage[key] = value;
    };
    
    // localStorage 조회
    root.getLocalStorage = function(key) {
    	if(isSupportStorage() == false) {
    		return this.NotSupport;
    	}else {
    		return localStorage.getItem(key);
//    		localStorage[key];
    	}
    };
    
    // localStorage 삭제                
    root.removeLocalStorage = function(key) {
    	if(isSupportStorage() == false) return this.NotSupport;
    	localStorage.removeItem(key);
    };
    
    // sessionStorage 저장                
    root.setSessionStorage = function(key, value) {
    	if(isSupportStorage() == false) return this.NotSupport;
    	sessionStorage.setItem(key, value);
//    	sessionStorage[key] = value;
    };
    
    // sessionStorage 조회
    root.getSessionStorage = function(key) {
    	if(isSupportStorage() == false) {
    		return this.NotSupport;
    	}else {
    		return sessionStorage.getItem(key);
//    		sessionStorage[key];
    	}
    };
    
	var isSupportStorage = function() {
		if(typeof(Storage) !== 'undefined') {
		    // Code for localStorage/sessionStorage.
//			console.log('Storage');
			return true;
		} else {
		    // Sorry! No Web Storage support..
//			console.log('No Web Storage support');
			return false;
		}
	};
	
    return root;
}]);
