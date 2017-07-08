/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Declare app level module which depends on views, and components
angular.module('courseApp', [
    'ui.router',
    'courseApp.Student',
    'courseApp.Authenticate',
    'courseApp.Teacher',
    'courseApp.AppServices'
  ])
    .config([ '$urlRouterProvider',
        function( $urlRouterProvider ) {
            $urlRouterProvider.otherwise('/authenticate/logIn');
        }
    ]);
    

