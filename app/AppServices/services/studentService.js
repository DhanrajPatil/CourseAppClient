/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('courseApp.AppServices')

        .factory('studentService', [ '$resource', 'userModel', 'host',
            function( $resource, userModel, host ){
                var studentResourceUrl  = host + '/students/:studentId';
                return $resource( studentResourceUrl,
                    { studentId : '@userId'},
                    {
                        getCourses: {
                            method: 'GET',
                            isArray : true,
                            url: studentResourceUrl + '/courses',
                            headers: { 'Authorization': userModel.getAuthKey }
                        },
                        getTeachers:{ 
                            method: 'GET',
                            isArray : true,
                            url: studentResourceUrl + '/teachers',
                            headers: { 'Authorization': userModel.getAuthKey }
                        },
                        getAll:{ 
                            method: 'GET',
                            isArray:true,
                            headers: { 'Authorization': userModel.getAuthKey }
                        },
                        applyCourse:{
                            method:'post',
                            params: { studentId : '@student.userId'},
                            url: studentResourceUrl + '/applyCourse',
                            headers: { 'Authorization': userModel.getAuthKey }
                        }
                    }
                );
            }
        ]);
