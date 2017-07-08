/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('courseApp.AppServices')

        .factory( 'courseService', [ '$resource', 'userModel', 'host',
            function($resource, userModel, host){
                
                var courseResourceUrl = host + '/courses/:courseId';
                var headersConfig = {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': userModel.getAuthKey
                };
                
                return $resource( courseResourceUrl,
                    {courseId : '@courseId'},
                    {
                        getStudents : {
                            method: 'GET',
                            isArray: true,
                            url: courseResourceUrl + '/students',
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
                        }
                    }     
                );
            }
        ]);
