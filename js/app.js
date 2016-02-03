var app = angular.module('app', ['firebase', 'angular.filter', 'ngRoute', 'ui.bootstrap'])

//Setting Up routes
app.config(['$routeProvider', function($routeProvider){

  //route to prompt sign in or survey taking
  $routeProvider
    .when('/', {
      templateUrl: 'partials/questionTmpl.html',
      controller: 'QuestionCtrl as qCtrl'
    })
    .when('/login', {
      templateUrl: 'partials/loginTmpl.html',
      controller: 'AuthCtrl as aCtrl'
    })
    .otherwise({ redirectTo: '/#' });

}]);
