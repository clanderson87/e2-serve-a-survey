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
          //aliasing surveyRef to thisSurveyObj
          var thisSurveyObj = ref.child('answers').child(authData.uid).child(surveyTitle);

          thisSurveyObj.once('value', function(snapshot){
            //instantiating accessable answerArray
            vm.answerArray = []
            //instantiating questionArray
            var questionArray = [];
            snapshot.forEach(function(childSnapshot){
              //trying to get questionNames to appear. Works!
              var questionName = childSnapshot.key();

              //snapshotCeption
              thisSurveyObj.child(questionName).once('value', function(grandChildSnapshot){
                //aliasing gCSnapshot as gCData
                var grandChildData = grandChildSnapshot.val();
                console.log("grandChildData is ", grandChildData);
                //iterating over each answerKey in grandChildData
                for (answerKey in grandChildData){
                  //pushing qustionName
                  if (questionArray.indexOf(questionName) < 1){
                    questionArray.push(questionName);
                  }
                  console.log("questionArray is ", questionArray);
                  //accessing and aliasing actual answer using gCData and answerKey
                  var grandChildAnswer = (grandChildData[answerKey]);
                  //instantiating packagable asset
                  var asset = [];
                  //pushing questionName and grandChildAnswer together in asset
                  asset.push(questionName, grandChildAnswer)
                  console.log("asset is ", asset)
                  //pushing the asset into an accessable array
                  vm.answerArray.push(asset);
                  console.log("vm.answerArray is ", vm.answerArray);
              }
            })
          })

              /* ---------- commenting this out for later OVER THOUGHT EVERYTHING?!??!?------
              // snapshot.forEach(function(childSnapshot){
              //   //aliasing the value of the snapshot to childData. childData should be the 'question' object itself. Unfortunately, it doesn't have an accessable name/title property
              //   var childData = childSnapshot.val()
              //   console.log("childData is ", childData);
              //   //getting the keys of childData;
              //   var childDataKeys = Object.keys(childData);
              //   console.log("childDataKeys is ", childDataKeys);
              //   //pushing childDataKeys into thisKeyArray
              //   thisKeyArray.push(childDataKeys);
              //   console.log("thisKeyArray is ", thisKeyArray);
              //   //instantiating accessable thisAnswerArray
              //   vm.thisAnswerArray = []
              //   //for Each answerKey in thisKeyArray
              //   thisKeyArray.forEach(function(answerKey){
              //     console.log(answerKey);
              //     //iterate over each answerKey
              //     answerKey.forEach(function(answerGetter){
              //       console.log(childData);
              //       //calling question.answerGetter to access actual answer, usually renders an array
              //       var answerArray = (childData[answerGetter])
              //       console.log("answerArray is ", answerArray)
              //       //for each item in answerArray, stringify the index and push it to accessable vm.thisAnswerArray
              //       answerArray.forEach(function(answer){
              //         vm.thisAnswerArray.push(answer.toString());
              //         console.log("vm.thisAnswerArray is ", vm.thisAnswerArray);
              //       })//close answerArray.forEach
              //     })// close answerKey.forEach
              //   })//close thisKeyArray.forEach
              // })//close snapshot.forEach
              ------------end overthought section ----------*/
          });
          }


}])
