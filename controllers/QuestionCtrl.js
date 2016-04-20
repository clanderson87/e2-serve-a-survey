app.controller('QuestionCtrl',
  [
  '$location',
  'authFactory',
  'refFactory',
    function(
      $location,
      auth,
      refFactory){

        //setting up this alias
        var vm = this;

        //firebase vars and auth methods
        var ref = refFactory.ref;
        var authData = auth.$getAuth();

        if (authData) {
          console.log("Logged in as:", authData.uid);
        } else {
          console.log("Logged out");
        }

        //setting up empty/global vars for questions and hides
        var hide1 = 0;
        var hide2 = 0;
        var hide3 = 0;
        var hide4 = 0;
        var asset = null;
        var surveyName = "";
        var idealAnswer = "";

        vm.asset = asset;
        vm.authData = authData;
        vm.idealAnswer = idealAnswer;

        vm.createSurvey = function(){
          $location.path('/createSurvey');
        };//close createSurvey

        vm.setSurveyName = function(){
          vm.surveyName = $('.surveyName').val()
          console.log(vm.surveyName);
        };

        vm.takeSurvey = function(){
          //location to a survey, possibly via a random number gen?
          //$location.path('/takeSurvey')
        };//close takeSurvey

        vm.backToQuestionSelector = function(){
          //resets all hides and returns view back to main question selector
          vm.hide1 = 0;
          vm.hide2 = 0;
          vm.hide3 = 0;
          vm.hide4 = 0;
        };//close backToQuestionSelector

        vm.chooseCheckbox = function (){
          //this shows the multiple choice creation div and sets the multiple choice question asset

          vm.asset = ["Would you like to click me and create your multiple choice question?", ["Click me to edit answer 1", "Click me to edit answer 2", "Click me to edit answer 3"], "checkbox", idealAnswer];

          vm.hide1 = 1;
          vm.hide2 = 0;
          vm.hide3 = 0;
          vm.hide4 = 1;


        };//close chooseCheckbox

        vm.chooseTextarea = function (){
          //this shows the multiple choice creation div and sets the textarea asset

          vm.asset = ["Could you click this to create a textarea question?", [""], "textarea", idealAnswer];
          vm.hide1 = 0;
          vm.hide2 = 1;
          vm.hide3 = 0;
          vm.hide4 = 1;

        };//close chooseTextarea

        vm.chooseRadio = function(){
          //this shows the multiple choice creation div and sets the radio asset

          vm.asset = ["You wanna click me to ask a radio question?", ["Click me to edit answer 1", "Click me to edit answer 2", "Click me to edit answer 3"], "radio", idealAnswer];
          vm.hide1 = 0;
          vm.hide2 = 0;
          vm.hide3 = 1;
          vm.hide4 = 1;
        };//close chooseRadio

        vm.addAnswer = function(){
          //adds an answer to the checkbox and radio function
          var x = vm.asset[1].length + 1
          var addedAnswer = "Click me to edit answer "+ x;
          console.log(vm.asset[1]);
          vm.asset[1].splice(x, 0, addedAnswer);
          console.log(vm.asset[1]);
        };//close addAnswer

        vm.killAnswer = function(index){
          //deletes an answer from checkboxes and radios
          vm.asset[1].splice(index, 1);
        };//close killAnswer

        vm.saveAsset = function(){
          //saves an asset to Firebase

          ref.child("questions").child(vm.surveyName).push(vm.asset);
          console.log(vm.asset)
          vm.hide1 = 0;
          vm.hide2 = 0;
          vm.hide3 = 0;
          vm.hide4 = 0;
        };//close saveAsset

        vm.saveSurvey = function(){
          //saves survey to firebase
          ref.child("questions").child(vm.surveyName).child("creator").set(authData.uid);
        }

      }//close controller function
  ] //close controller dependancies bracket
) // close controller
