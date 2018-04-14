/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.AppServices', [
    'ngResource',
    'base64'
])
    .config([ '$resourceProvider', 'userModelProvider', 
        function( $resourceProvider, userModelProvider ){
            var headersConfig = { 
                'Authorization': userModelProvider.generateAuthorizarionKey,
                'Access-Control-Allow-Origin': '*'
            };
            
            $resourceProvider.defaults.actions = {
                create: { 
                    method: 'POST',
                    headers: headersConfig
                },
                get:    { 
                    method: 'GET',
                    headers: headersConfig
                },
                getAll: { 
                    method: 'GET',
                    isArray:true,
                    headers: headersConfig
                },
                update: { 
                    method: 'PUT',
                    headers: headersConfig
                },
                remove: { 
                    method: 'DELETE',
                    headers: headersConfig
                }
            };
        }
    ])
    .constant('host', 'http://localhost:9090/CourseAppAPI/resources'); //localhost  OR  192.168.43.129