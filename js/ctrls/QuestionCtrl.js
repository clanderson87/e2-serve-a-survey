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
        var hide4= 0
        var asset = null;

        this.asset = asset;

        this.createSurvey = function(){
          $location.path('/createSurvey');
        }//close createSurvey

        this.takeSurvey = function(){
          //location to a survey, possibly via a random number gen?
          //$location.path('/takeSurvey')
        }//close takeSurvey

        this.backToQuestionSelector = function(){
          this.hide1 = 0;
          this.hide2 = 0;
          this.hide3 = 0;
          this.hide4 = 0;
        }

        this.chooseCheckbox = function (){
          //this shows the multiple choice creation div and sets the multiple choice question asset

          this.asset = ["Would you like to click me and create your multiple choice question?", ["Click me to edit answer 1", "Click me to edit answer 2", "Click me to edit answer 3"]]

          this.hide1 = 1;
          this.hide2 = 0;
          this.hide3 = 0;
          this.hide4 = 1;

        }//close chooseCheckbox

        this.chooseTextarea = function (){
          //this shows the multiple choice creation div and sets the textarea asset

          this.asset = ["Could you click this to ask a textarea question?"]
          this.hide1 = 0;
          this.hide2 = 1;
          this.hide3 = 0;
          this.hide4 = 1;

        }//close chooseTextarea

        this.chooseRadio = function (){
          //this shows the multiple choice creation div
          this.hide1 = 0;
          this.hide2 = 0;
          this.hide3 = 1;
          this.hide4 = 1;

        }//close chooseRadio

        this.saveAsset = function(){

        };

      }//close controller function
  ] //close controller dependancies bracket
) // close controller
