'use strict';

var dependencies = [
                    'app'
                   ];

define( dependencies, function(app) {
	
	var controller = function ($scope, $stateParams, $location) {
        //var appTitle = 'Customer Management';
        //$scope.appTitle = (config.useBreeze) ? appTitle + ' Breeze' : appTitle;
		
		$scope.pageTitle = "CRUD";
		
//		bulletinService.getNotice($routeParams.uid).then(function(data) {
//    		console.log(data);
//    		$scope.data = data;
//    	});
		
        $scope.refresh = function () {
            //console.log('refresh');
            
            /*bulletinService.getNotice($routeParams.uid).then(function(data) {
        		//console.log(data);
        		$scope.bulletin = data;
        	});*/
        };
        
        $scope.refresh();
        $scope.uid = $stateParams.uid;
        
		/*
		$scope.onSave = function (user) {
		    i18nNotifications.pushForNextRoute('crud.user.save.success', 'success', {id : user.$id()});
		    $location.path('/admin/users');
		};
		*/
        
    };
    
	app.register.controller('viewCtrl', ['$scope', '$stateParams', '$location', controller]);
	
});