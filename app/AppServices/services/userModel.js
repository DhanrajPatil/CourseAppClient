/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


angular.module('courseApp.AppServices')

        .provider("userModel", [ '$base64', function($base64){
            var userTypes = [
                "STUDENT", "ADMIN", "TEACHER"
            ];
            
            var courseTypes = [
                'EDUCATION', 'SPORTS', 'GENERAL', 'EXERCIZE', 'SOFTWARE', 'NETWORK'
            ];
            
            var currentUser = {};
            
            var getUserTypes = function(context){
                if(context === "SIGNUP"){
                    return userTypes.filter(function(type){
                        return type !== "ADMIN";
                    });
                }
                else{
                    return userTypes;
                }
            };
            
            var getCourseTypes = function(){
                return courseTypes;
            };
            
            var getMyCurrentUser = function(){
                var user = {};
                angular.copy(currentUser, user);
                user.emailId = "";
                user.password = "";
                return user;
            };
            
            var setMyCurrentUser = function(user){
                currentUser = {};
                angular.copy(user, currentUser);
            };
            
            var getAuthKey = function(){
                var authenticationKey = '';
                authenticationKey = currentUser.emailId + ':' + currentUser.password;
                authenticationKey = $base64.encode(authenticationKey);
                return "Basic" + " " + authenticationKey;
            };
            
            return {
                
                generateAuthorizarionKey : getAuthKey,
                
                $get: function () {
                    return {
                        getAuthKey : getAuthKey,
                        getUserTypes : getUserTypes,
                        getCourseTypes: getCourseTypes,
                        getCurrentUser : getMyCurrentUser,
                        setCurrentUser : setMyCurrentUser
                    };
                }
            };
        }]);