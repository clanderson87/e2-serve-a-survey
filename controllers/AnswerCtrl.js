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

        var list = $firebaseArray(questionRef);

        vm.getFirebaseList = function(){
          list.$loaded()
            .then(function(questionList) {

              var x = Math.floor((Math.random() * questionList.length - 1) + 1);
              var survey = questionList[x];
              console.log(survey);
              var gopn = Object.getOwnPropertyNames(survey);
              console.log("gopn is "+ gopn);
              var surveyKeys = Object.keys(survey);
              console.log("surveyKeys is "+ surveyKeys);
              var y = Math.floor((Math.random() * surveyKeys.length - 1) + 1);

              var surveyProperty = surveyKeys[y];
              console.log("surveyProperty is "+ surveyProperty);
              console.log("Here goes nothing: "+ survey[surveyProperty])


          })
            .catch(function(error) {
              console.log("Error:", error);
            }
          );
        }();

    }
  ]
)
