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
              //makes surveyList accessable
              vm.surveyList = surveyList;
              console.log(vm.surveyList)
            })
          }(); //grabs user's surveys from firebase. IIFE called on controller load.

        vm.displayResponses = function(surveyTitle){
          //aliasing surveyRef to thisSurveyObj
          var thisSurveyObj = ref.child('answers').child(authData.uid).child(surveyTitle);

          thisSurveyObj.once('value', function(snapshot){
            //making accessable questionObj
            vm.questionObj = {};
            snapshot.forEach(function(childSnapshot){
              //trying to get questionNames to appear. Works!
              var questionName = childSnapshot.key();
              //making childSnapshot usable
              var childData = childSnapshot.val();
              //adding childData as a property in accessable questionObj
              thisSurveyObj.child(questionName).once('value', function(grandChildSnapshot){
                //aliasing gCSnapshot as gCData
                var grandChildData = grandChildSnapshot.val();
                //making gCData accessable
                vm.grandChildData = grandChildData
                console.log("grandChildData is ", grandChildData);
                var gcdKeys = Object.keys(grandChildData)
                gcdKeys.forEach(function(key){
                  vm.questionObj[questionName] = grandChildData[key];
                })
                console.log(vm.questionObj)
            })

            // vm.questionKeys = Object.keys(vm.questionObj);
            // console.log("questionKeys is ", vm.questionKeys)
            // vm.questionKeys.forEach(function(key){
            //   console.log("vm.questionObj.keys is ", vm.questionObj[key])
            //   var subKeys = Object.keys(vm.questionObj[key])
            //   console.log("subKeys is ", subKeys)
            })
          })
        }



}])
              // //snapshotCeption
              //   //iterating over each answerKey in grandChildData
              //   for (answerKey in grandChildData){
              //     //pushing qustionName
              //     if (questionArray.indexOf(questionName) < 1){
              //       questionArray.push(questionName);
              //     }
              //     console.log("questionArray is ", questionArray);
              //     //accessing and aliasing actual answer using gCData and answerKey
              //     var grandChildAnswer = (grandChildData[answerKey]);
              //     //instantiating packagable asset
              //     var asset = [];
              //     //pushing questionName and grandChildAnswer together in asset
              //     asset.push(questionName, grandChildAnswer)
              //     console.log("asset is ", asset)
              //     //pushing the asset into an accessable array
              //     vm.answerArray.push(asset);
              //     console.log("vm.answerArray is ", vm.answerArray);
              // }
