/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.Authenticate', [
    'ui.router',
    'ngAnimate',
    'toastr',
    'courseApp.AppServices'
])

    .config([ '$stateProvider', 'toastrConfig', 'toastrModelProvider',
        function( $stateProvider, toastrConfig, toastrModelProvider) {
            $stateProvider
                .state('authenticate',{
                    url: '/authenticate',
                    views: {
                        'navBarView': {
                            templateUrl: 'AppServices/templates/navBar.html',
                            controller: 'navBarController'
                        },
                        'contentView': {
                            templateUrl: 'Authenticate/templates/authContainer.html'
                        }
                    }
                })
                .state('authenticate.signUp', {
                    url: '/signUp',
                    templateUrl: 'Authenticate/templates/signUp.html',
                    controller: 'signUpController'
                })
                .state('authenticate.logIn', {
                    url: '/logIn',
                    templateUrl: 'Authenticate/templates/logIn.html',
                    controller: 'logInController'
                });
                
            angular.extend(toastrConfig, toastrModelProvider.getToastConfig());
        }
    ]);
