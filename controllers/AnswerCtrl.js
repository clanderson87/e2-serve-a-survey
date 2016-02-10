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
              var surveyKeys = Object.keys(survey);
              // gets rid of $id
              var idIndex = surveyKeys.indexOf("$id");
              if (idIndex > 0){
                surveyKeys.splice(idIndex, 1)
              };
              // gets rid of $priority
              var priorityIndex = surveyKeys.indexOf("$priority");
              if (priorityIndex > 0){
                surveyKeys.splice(priorityIndex, 1)
              };
              // gets rid of creator
              var creatorIndex = surveyKeys.indexOf("creator");
              if (creatorIndex > 0){
                surveyKeys.splice(creatorIndex, 1)
              };
              console.log("surveyKeys is "+ surveyKeys);
              vm.surveyKeys = surveyKeys;
          })
            .catch(function(error) {
              console.log("Error:", error);
            }
          );
        }();



    }
  ]
)
