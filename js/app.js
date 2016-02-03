var app = angular.module('app', ['firebase', 'angular.filter', 'ngRoute', 'ui.bootstrap'])

//Setting Up routes
app.config(['$routeProvider', function($routeProvider){

  //route to prompt sign in or survey taking
  $routeProvider
    .when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'AuthCtrl as authCtrl'
		})
}]);
