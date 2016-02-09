app.controller('AuthCtrl',
    ["$location",
        function($location){
                var ref = new Firebase("https://survey-creator.firebaseio.com");
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
                    $location.path('/makeSurvey');
                }
            }
    ]
);
