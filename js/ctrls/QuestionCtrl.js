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


        //firebase vars
        var ref = new Firebase("https://survey-creator.firebaseio.com/");

        //setting up empty vars for questions and hides
        var question = "";
        var answerA = "";
        var answerB = "";
        var answerC = "";
        var answerD = "";
        var answerE = "";
        var hide1= 0;
        var hide2= 0;
        var hide3= 0;

        this.createSurvey = function(){
          $location.path('/createSurvey');
        }//close createSurvey

        this.takeSurvey = function(){
          //location to a survey, possibly via a random number gen?
          //$location.path('/takeSurvey')
        }//close takeSurvey

        this.chooseCheckbox = function (){
          //this shows the multiple choice creation div
          this.hide1 = 1;
          this.hide2 = 0;
          this.hide3 = 0;

        }//close chooseCheckbox

        this.chooseTextarea = function (){
          //this shows the multiple choice creation div
          this.hide1 = 0;
          this.hide2 = 1;
          this.hide3 = 0;

        }//close chooseTextarea

        this.chooseRadio = function (){
          //this shows the multiple choice creation div
          this.hide1 = 0;
          this.hide2 = 0;
          this.hide3 = 1;

        }//close chooseRadio

        this.saveAsset = function(){

        };

      }//close controller function
  ] //close controller dependancies bracket
) // close controller
