app.factory('authFactory',
  ['$firebaseAuth',
  '$firebaseObject',

  function (
      $firebaseAuth,
      $firebaseObject){

        var ref = new Firebase("https://survey-creator.firebaseio.com");
        return $firebaseAuth(ref);
      }
  ]
)