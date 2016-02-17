var app = angular.module('app', ['firebase', 'angular.filter', 'ngRoute', 'ngMaterial', 'ui.bootstrap'])
	
	.run(function($log){
		$log.debug("Is running");
	});

//Setting Up routes
app.config(['$routeProvider', function($routeProvider){

  //route to prompt sign in or survey taking
  $routeProvider
    .when('/', {
			templateUrl: 'partials/login.html',
			controller: 'AuthCtrl as authCtrl'
		})
		.when('/main', {
			templateUrl: 'partials/mainPage.html',
		})
    .when('/makeSurvey', {
      templateUrl: 'partials/questionTmpl.html',
      controller: 'QuestionCtrl as qCtrl'
    })
    .when('/takeSurvey', {
      templateUrl: 'partials/AnswerTmpl.html',
      controller: 'AnswerCtrl as anCtrl'
    })
    .otherwise({ redirectTo: '/#' });
}]);
