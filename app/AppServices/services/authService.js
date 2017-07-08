/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.AppServices')
        .factory("authService", [ '$resource', 'userModel', 'host',
            function( $resource, userModel, host ){
                
                var authResourseUrl = host + "/authorize";
                
                return $resource( authResourseUrl,
                    { emailId:'@emailId', context:'@context' },
                    {
                        logIn: {
                            method: 'GET',
                            isArray: false,
                            headers: { 'Authorization': userModel.getAuthKey }
                        },
                        signUp: {
                            method: 'POST',
                            headers: { 'Authorization': userModel.getAuthKey }
                        },
                        emailIdCheck: {
                            method: 'GET',
                            isArray: false,
                            url: authResourseUrl + '/emailIdCheck'
                        }
                    }
                );
            }
        ]);