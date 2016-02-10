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
          console.log(list)
          list.$loaded()
            .then(function(questionList) {
              var x = Math.floor((Math.random() * questionList.length - 1) + 1);
              var pumpkin = questionList[x];
              console.log("x is ", x);
              console.log("pumpkin is ", pumpkin);
              console.log(Object.keys(pumpkin));

          })
            .catch(function(error) {
              console.log("Error:", error);
            }
          );
        }();

    }
  ]
)
