app.controller('AuthCtrl',
    ["$location",
        function($location){
                //aliasing this as vm
                var vm = this;
                //firebase reference
                var ref = new Firebase("https://survey-creator.firebaseio.com");
                //login function
                vm.login = function(){
                    ref.authWithOAuthPopup("google", function(error, authData) {
                        if (error) {
                            console.log("Login Failed", error);
                        } else {
                            console.log("Authenticated successfully with:", authData);
                            userRefObj = vm.authData;
                            userRefObj.username = authData.google.displayName;
                            ref.child("users").child(authData.uid).set(userRefObj);
                        };

                    })
                    //switiches view to survey creation
                    $location.path('/makeSurvey');
                }
            }
    ]
);
