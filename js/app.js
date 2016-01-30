var app = angular.module('App', ['firebase', 'angular.filter', 'ngRoute', 'ui.bootstrap'])

//Setting Up routes
app.config(['$routeProvider', function($routeProvider){

  //route to prompt sign in or survey taking
  $routeProvider
    .when('/', {
      templateUrl: 'partials/splash.html',
      controller: 'MainController as mainCtrl'
    })
    .otherwise({ redirectTo: '/shoppingList' });

}]);
