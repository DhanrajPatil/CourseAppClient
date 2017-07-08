/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.AppServices')

        .factory('teacherService', [ '$resource', 'userModel', 'host',
            function( $resource, userModel, host ){
                var teacherResourceUrl = host + "/teachers/:teacherId";
                var headersConfig = {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': userModel.getAuthKey
                };

                return $resource( teacherResourceUrl,
                    { teacherId: '@userId' },
                    {
                        getCourses: {
                            method: 'GET',
                            isArray : true,
                            url: teacherResourceUrl + '/courses',
                            headers: headersConfig
                        },
                        getAll:  { 
                            method: 'GET',
                            isArray: true,
                            headers: headersConfig
                        },
                        get:  { 
                            method: 'GET',
                            isArray: false,
                            headers: headersConfig
                        }
                    }
                );
            }
        ]);