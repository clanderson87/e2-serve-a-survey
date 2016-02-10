app.controller('AnswerCtrl',
  ['$firebaseArray',
  '$firebaseObject',

    function(
      $firebaseArray,
      $firebaseObject){

        //alising this
        var vm = this;

        //accessing firebase
        var questionRef = new Firebase('https://survey-creator.firebaseio.com/questions');
        //aliasing array
        var list = $firebaseArray(questionRef);

        vm.getFirebaseList = function(){
          //lists all surveys from Firebase
          list.$loaded()
            .then(function(questionList) {
              //randomizing survey set returned by firebase
              var x = Math.floor((Math.random() * questionList.length - 1) + 1);
              var surveyObj = questionList[x];
              //setting up a clone surveyArray from surveyObj
              vm.surveyArray = [];
              angular.forEach(surveyObj, function(element) {
                if(Array.isArray(element)) {
                vm.surveyArray.push(element);
              }
                console.log(vm.surveyArray)
              });
              //making surveyObj accessable for submission
              vm.surveyObj = surveyObj;
          })
            .catch(function(error) {
              console.log("Error:", error);
            }
          );

        }();//close getFirebaseList. Calls upon controller load

        vm.submitAnswers = function(){

        }

    }
  ]
)
