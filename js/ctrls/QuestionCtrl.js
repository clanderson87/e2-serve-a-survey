app.controller('QuestionCtrl',
  [
  '$scope',
  '$firebaseArray',
  '$firebaseObject',
  '$window',
  '$location',
  'authFactory',

    function(
      $scope,
      $firebaseArray,
      $firebaseObject,
      $window,
      $location,
      auth){


        //firebase vars
        var ref = new Firebase("https://survey-creator.firebaseio.com/");

        //setting up empty/global vars for questions and hides
        var hide1= 0;
        var hide2= 0;
        var hide3= 0;
        var hide4= 0;
        var asset = null;
        var user = "chris";
        var surveyName = "";

        this.asset = asset;

        this.createSurvey = function(){
          $location.path('/createSurvey');
        };//close createSurvey

        this.setSurveyName = function(){
          this.surveyName = $('.surveyName').val()
          console.log(this.surveyName);
        };

        this.takeSurvey = function(){
          //location to a survey, possibly via a random number gen?
          //$location.path('/takeSurvey')
        };//close takeSurvey

        this.backToQuestionSelector = function(){
          //resets all hides and returns view back to main question selector

          this.hide1 = 0;
          this.hide2 = 0;
          this.hide3 = 0;
          this.hide4 = 0;
        };//close backToQuestionSelector

        this.chooseCheckbox = function (){
          //this shows the multiple choice creation div and sets the multiple choice question asset

          this.asset = ["Would you like to click me and create your multiple choice question?", ["Click me to edit answer 1", "Click me to edit answer 2", "Click me to edit answer 3"]];

          this.hide1 = 1;
          this.hide2 = 0;
          this.hide3 = 0;
          this.hide4 = 1;


        };//close chooseCheckbox

        this.chooseTextarea = function (){
          //this shows the multiple choice creation div and sets the textarea asset

          this.asset = ["Could you click this to create a textarea question?", [""]];
          this.hide1 = 0;
          this.hide2 = 1;
          this.hide3 = 0;
          this.hide4 = 1;

        };//close chooseTextarea

        this.chooseRadio = function (){
          //this shows the multiple choice creation div and sets the radio asset

          this.asset = ["You wanna click me to ask a radio question?", ["Click me to edit answer 1", "Click me to edit answer 2", "Click me to edit answer 3"]];
          this.hide1 = 0;
          this.hide2 = 0;
          this.hide3 = 1;
          this.hide4 = 1;

        };//close chooseRadio

        this.saveAsset = function(){
          ref.child("question").child(this.surveyName).push(this.asset);
          console.log(this.asset)
          this.hide1 = 0;
          this.hide2 = 0;
          this.hide3 = 0;
          this.hide4 = 0;
        };//close saveAsset

      }//close controller function
  ] //close controller dependancies bracket
) // close controller
