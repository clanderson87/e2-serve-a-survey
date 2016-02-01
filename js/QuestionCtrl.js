app.controller('QuestionCtrl',
  [
  '$scope',
  '$firebaseArray',
  '$firebaseObject',
  '$http',
  '$window',
  '$location',

    function(
      $scope,
      $firebaseArray,
      $firebaseObject,
      $http,
      $window,
      $location){


      this.createSurvey = function(){
        $location.path('/createSurvey');
      };//close createSurvey

      this.takeSurvey = function(){
        //location to a survey, possibly via a random number gen?
        //$location.path('/takeSurvey')
      };//close takeSurvey

      this.createMultipleChoice = function (){

      };//close createMultipleChoice

      //closes controller function
      }
  //closes controller dependancy bracket
  ]
//closes controller
)
