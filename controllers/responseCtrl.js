app.controller('responseCtrl',
  ['$firebaseArray',
  'authFactory',
  'refFactory',
    function(
      $firebaseArray,
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

        //grabbing initial ref
        var ref = refFactory.ref;
        var userSurveys = $firebaseArray(ref.child('answers').child(authData.uid));

        var getUserSurveys = function(){
          userSurveys.$loaded()
            .then(function(surveyList){
              console.log(surveyList)

            })
          }();



}])
