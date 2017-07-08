/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module("courseApp.AppServices")
    .filter('myfilter', function() {
        
        function strIncludes(str, filteringStr) {
            return (str.toLowerCase() + "").includes(filteringStr.toLowerCase());
        }
        
        return function(items, filteringObj) {
            var filtered = [];            

            angular.forEach(items, function(item) {
                item.some(function(value, key){
                    if ( strIncludes(value, filteringObj[key]) ) {
                        filtered.push(item);
                        return true;
                    }
                });                
            });

            return filtered;
        };
    });