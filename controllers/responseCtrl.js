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
                //aliasing the value of the snapshot to childData. childData should be the 'question' object itself. Unfortunately, it doesn't have an accessable name/title property
                var childData = childSnapshot.val()
                console.log("childData is ", childData);
                //getting the keys of childData;
                var childDataKeys = Object.keys(childData);
                console.log("childDataKeys is ", childDataKeys);
                //pushing childDataKeys into thisKeyArray
                thisKeyArray.push(childDataKeys);
                console.log("thisKeyArray is ", thisKeyArray);
                //instantiating accessable thisAnswerArray
                vm.thisAnswerArray = []
                //for Each Key in thisKeyArray
                thisKeyArray.forEach(function(answerKey){
                  console.log(answerKey);
                  //iterate over each answerKey
                  answerKey.forEach(function(answerGetter){
                    console.log(childData);
                    //calling question.answerGetter to access actual answer, usually renders an array
                    var answerArray = (childData[answerGetter])
                    console.log("answerArray is ", answerArray)
                    //for each item in answerArray, stringify the index and push it to accessable vm.thisAnswerArray
                    answerArray.forEach(function(answer){
                      vm.thisAnswerArray.push(answer.toString());
                      console.log("vm.thisAnswerArray is ", vm.thisAnswerArray);
                    })//close answerArray.forEach
                  })// close answerKey.forEach
                })//close thisKeyArray.forEach
              })//close snapshot.forEach
          });
          }


}])
