var app = angular.module('app', ['firebase', 'angular.filter', 'ngRoute', 'ui.bootstrap'])

//Setting Up routes
app.config(['$routeProvider', function($routeProvider){

  //route to prompt sign in or survey taking
  $routeProvider
    .when('/', {
      templateUrl: 'partials/loginTmpl.html',
      controller: 'AuthCtrl as aCtrl'
    })
    .when('/makeSurvey', {
      templateUrl: 'partials/questionTmpl.html',
      controller: 'QuestionCtrl as qCtrl'
    })
    .when('/takeSurvey', {
      templateUrl: 'partials/AnswerTmpl.html',
      controller: 'AnswerCtrl as anCtrl'
    })
    .when('/viewResponses', {
      templateUrl: 'partials/responseTmpl.html',
      controller: 'responseCtrl as rCtrl'
    })
    .otherwise({ redirectTo: '/#' });
}]);
