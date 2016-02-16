var app = angular.module('app', ['firebase', 'angular.filter', 'ngRoute', 'ngMaterial', 'ui.bootstrap'])
	
	.run(function($log){
		$log.debug("Is running");
	});

//Setting Up routes
app.config(['$routeProvider', function($routeProvider){

  //route to prompt sign in or survey taking
  $routeProvider
    .when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'AuthCtrl as authCtrl'
		})
		.when('/main', {
			templateUrl: 'partials/mainPage.html',
		})
}]);
