app.controller('AnswerCtrl',
  ['$firebaseArray',
  '$firebaseObject',
  '$location',
  'authFactory',
  'refFactory',

    function(
      $firebaseArray,
      $firebaseObject,
      $location,
      auth,
      refFactory){

        //alising this
        var vm = this;

        //accessing firebase
        var ref = refFactory.ref;
        var questionRef = refFactory.ref.child('questions');
        // console.log(questionRef);

        //auth getters
        var authData = auth.$getAuth();
        if (authData) {
          console.log("Logged in as:", authData.uid);
        } else {
          console.log("Logged out");
        }
        //aliasing array
        var list = $firebaseArray(questionRef);

        //answer asset
        vm.responseAsset = [];

        vm.checkSwitch = false;

        vm.getFirebaseList = function(){
          //lists all surveys from Firebase
          list.$loaded()
            .then(function(questionList) {
              //randomizing survey set returned by firebase
              var x = Math.floor((Math.random() * questionList.length - 1) + 1);
              var surveyObj = questionList[x];
              console.log(surveyObj)
              vm.surveyNameKey = surveyObj.$id;
              console.log(vm.surveyNameKey);
              //setting up a clone surveyArray from surveyObj
              vm.surveyArray = [];
              angular.forEach(surveyObj, function(element) {
                if(Array.isArray(element)) {
                vm.surveyArray.push(element);
              };
                console.log("vm.surveyArray is ", vm.surveyArray)
              });
              //making surveyObj accessable for submission
              vm.surveyObj = surveyObj;
          })
            .catch(function(error) {
              console.log("Error:", error);
            }
          );

        }();//close getFirebaseList. IIFE Calls upon controller load.

        vm.pushAnswerButtons = function(index){
        //pushes answer into the responseAsset for button questions
          if (vm.responseAsset.length < vm.surveyArray[0][1].length){
            //allows user to chose only up to the total number of makimum answers.
          vm.responseAsset.push(index)
        }
        console.log("after clicking, vm.responseAsset is ", vm.responseAsset)
        };

        //pushes the responseAssets to firebase,
        vm.submitAnswers = function(){
          //aliasing into firebase friendly keys
          var creator = vm.surveyObj.creator;
          var currentQuestionTitle = vm.surveyArray[0][0];
          var responseAsset = vm.responseAsset;
          var surveyNameKey = vm.surveyNameKey;
          //writing to firebase
          ref.child("answers")
            .child(creator)
              .child(surveyNameKey)
                .child(currentQuestionTitle)
                  .push(responseAsset);
          console.log("now vm.responseAsset is ", vm.responseAsset)
          //deletes index zero, reveals new question
          vm.surveyArray.shift();
          //zeroes responseAsset, saves on bandwidth
          vm.responseAsset = [];
          console.log("now vm.surveyArray is ", vm.surveyArray);
          //ends survey if no more questions
          if (vm.surveyArray.length < 1){
            $location.path('/login');
          }
        }

    }
  ]
)
