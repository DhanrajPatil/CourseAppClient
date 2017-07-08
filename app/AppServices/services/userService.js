/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.AppServices')

    .factory("userService",[ '$resource', 'host',
        function ($resource, host) {
        
            var userResourceUrl = host + "/users/:userId";
            return $resource( userResourceUrl,
                {userId : '@userId'}
            );
        }
    ]);