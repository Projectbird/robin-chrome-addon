(function (angular) {
    'use strict';

    var ref = new Firebase("https://projectbird.firebaseio.com");
    var authData = ref.getAuth();

    angular.module('ngViewExample', ['ngRoute'])
        .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
                $routeProvider
                    .when('/login/', {
                        templateUrl: './assets/view/login.html',
                        controller: 'login',
                        controllerAs: 'login'
                    })
                    .when('/index.html', {
                        templateUrl: './assets/view/login.html',
                        controller: 'login',
                        controllerAs: 'login'
                    })
                    .when('/profile/child/:childname', {
                        templateUrl: './assets/view/profile.html',
                        controller: 'child',
                        controllerAs: 'child'
                    })
                    .when('/signup', {
                        templateUrl: './assets/view/signup.html',
                        controller: 'signup',
                        controllerAs: 'signup'
                    });

                $locationProvider.html5Mode(true);
  }])


    .controller('MainCtrl', function ($scope, $route, $routeParams, $location) {
        $scope.name = "ChapterController";
        $scope.params = $routeParams;
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    })

    .controller('login', function ($scope, $route, $routeParams, $location) {
        $scope.name = "loginsss";
        $scope.params = $routeParams;
        $scope.showError = false;
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    })

    .controller('child', function ($scope, $route, $routeParams, $location) {
        $scope.name = "loginsss";
        $scope.params = $routeParams;
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;
    })

    .controller('signup', function ($scope, $route, $routeParams, $location) {
        $scope.name = "signup";
        $scope.params = $routeParams;
        $scope.$route = $route;
        $scope.$location = $location;
        $scope.$routeParams = $routeParams;

    })

    .controller("forms", function ($scope) {

        $scope.login = function () { // Saves options to chrome.storage
            ref.authWithPassword({
                email: $('input[name="email"]').val(),
                password: $('input[name="password"]').val()
            }, authHandler);
        };

        $scope.signup = function () {
            $scope.showError = null;
            ref.createUser({
                email: $('input[name="email"]').val(),
                password: $('input[name="password"]').val()
            }, function (error) {

                error ? errorCodes(error) : displayMessage("Created User");
            });

            function errorCodes(error) {

                switch (error.code) {
                    case "EMAIL_TAKEN":
                        displayMessage("The new user account cannot be created use.");
                        break;
                    case "INVALID_EMAIL":
                        displayMessage("The specified eeeeemail is not a valid email.");
                        break;
                    default:
                        displayMessage("Error creating user:", error);
                }
            }


            function displayMessage(message) {

                setTimeout(function () {
                    $scope.showError = true;
                    $scope.errorMessage = message;
                    $scope.$apply();
                }, 1000)
            }

        };





    });




    function getName(authData) {
        switch (authData.provider) {
            case 'password':
                return authData.password.email.replace(/@.*/, '');
            case 'twitter':
                return authData.twitter.displayName;
            case 'facebook':
                return authData.facebook.displayName;
        }
    }

    function authDataCallback(authData) {
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
            console.log("User is logged out");
        }
    }



    // Create a callback to handle the result of the authentication
    function authHandler(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
        }
    }




    function displayMessage(userData) {
        console.log("Successfully created user account with uid:", userData.uid);
        var usersRef = ref.child(userData.uid);
        usersRef.child('information').set({
            provider: "userData.provider",
            name: "getName(userData)"
        });
    }

})(window.angular);
