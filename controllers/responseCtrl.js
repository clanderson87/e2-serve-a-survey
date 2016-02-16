app.controller('responseCtrl',
  ['$firebaseArray',
  '$firebaseObject',
  'authFactory',
  'refFactory',
    function(
      $firebaseArray,
      $firebaseObj,
      auth,
      refFactory){

        //aliasing this
        var vm = this;

        //checking for auth
        var authData = auth.$getAuth();
        if (authData) {
          console.log("Logged in as:", authData.uid);
        } else {
          console.log("Logged out");
        };

        //grabbing initial ref, users Surveys
        var ref = refFactory.ref;
        var userSurveys = $firebaseArray(ref.child('answers').child(authData.uid));

        vm.surveysList = [];

        var getUserSurveys = function(){
          userSurveys.$loaded()
            .then(function(surveyList){
              vm.surveyList = surveyList;
              console.log(vm.surveyList)
              surveyList.forEach(function(question){
                console.log(question);
              });
            })
          }();

        vm.displayResponses = function(surveyTitle){
          var thisSurveyObj = ref.child('answers').child(authData.uid).child(surveyTitle).once('value', function(snapshot){
              var thisKeyArray = [];
              snapshot.forEach(function(childSnapshot){
                var childData = childSnapshot.val()
                console.log("childData is ", childData);
                var childDataKeys = Object.keys(childData);
                console.log("childDataKeys is ", childDataKeys);
                thisKeyArray.push(childDataKeys);
                console.log("thisKeyArray is ", thisKeyArray);
                vm.thisAnswerArray = []
                thisKeyArray.forEach(function(answerKey){
                  answerKey.forEach(function(answerGetter){
                    var answerArray = (childData[answerGetter])
                    console.log("answerArray is ", answerArray)
                    answerArray.forEach(function(answer){
                      vm.thisAnswerArray.push(answer.toString());
                      console.log("vm.thisAnswerArray is ", vm.thisAnswerArray);
                    })
                  });
                })
              })
          });
          }


}])
