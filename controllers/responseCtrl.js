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

        var getUserSurveys = function(){
          userSurveys.$loaded()
            .then(function(surveyList){
              //makes surveyList accessable
              vm.surveyList = surveyList;
            })
          }(); //grabs user's surveys from firebase. IIFE called on controller load.

        vm.displayResponses = function(surveyTitle){
          //aliasing surveyRef to thisSurveyObj
          var thisSurveyObj = ref.child('answers').child(authData.uid).child(surveyTitle);

          thisSurveyObj.once('value', function(snapshot){
            //making accessable answerObj
            vm.answerObj = {};
            //iterating over the snapshot of the survey for each question in the survey
            snapshot.forEach(function(childSnapshot){
              //getting questionName
              var questionName = childSnapshot.key();
              //snapshotCeption so we can make the returned object more shallow
              //this repeats for each and every question in the survey object
              thisSurveyObj.child(questionName).once('value', function(grandChildSnapshot){
                //aliasing gCSnapshot as gCData, making it usable
                var grandChildData = grandChildSnapshot.val();
                //getting a loopable array of keys within grandChildData
                var gcdKeys = Object.keys(grandChildData)
                //looping through those keys to add their answers to answerObj
                gcdKeys.forEach(function(key){
                  //checking is vm.answerObj has a [questionName] property
                  if(vm.answerObj.hasOwnProperty([questionName]) === false){
                    //if not, put the value of key into vm.answerObj[questionName] property
                    vm.answerObj[questionName] = grandChildData[key];
                  } else {
                    //aliasing the array at the newly minted vm.answerObj[questionName] location so I can use .push without the console bitching me out
                    var thisAnswerArray = vm.answerObj[questionName];
                    //pushing the other keys into thisAnswerArray
                    thisAnswerArray.push(grandChildData[key].toString());
                  }
                })

            })

            })

          })
        }



}])
