app.controller('AuthCtrl',
    ["$firebaseAuth",
    "$firebaseObject",
    "$location",
    "authFactory",

        function(
            $firebaseAuth,
            $firebaseObject,
            $location,
            authFactory){

                var currentUser = null;
                var ref = new Firebase("https://survey-creator.firebaseio.com");
                var userRef = ref.child('users');

                this.login = function(){
                    ref.authWithOAuthPopup("google", function(error, authData) {
                        if (error) {
                            console.log("Login Failed", error);
                        } else {
                            console.log("Authenticated successfully with:", authData);
                            userRefObj = authData;
                            userRefObj.username = authData.google.displayName;
                            ref.child("users").child(authData.uid).set(userRefObj);
                        };
                    })
                }
            }
    ]
);