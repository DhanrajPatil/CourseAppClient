/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('courseApp.AppServices')
        .provider( 'toastrModel', [
            function(){
                var defaultToastrConfig = {
                    allowHtml: true,
                    closeButton: true,
                    closeHtml: '<button>&times;</button>',
                    extendedTimeOut: 2000,
                    iconClasses: {
                        error: 'toast-error',
                        info: 'toast-info',
                        success: 'toast-success',
                        warning: 'toast-warning'
                    },  
                    messageClass: 'toast-message',
                    onHidden: null,
                    onShown: null,
                    onTap: null,
                    progressBar: true,
                    tapToDismiss: true,
                    templates: {
                        toast: 'directives/toast/toast.html',
                        progressbar: 'directives/progressbar/progressbar.html'
                    },
                    timeOut: 5000,
                    titleClass: 'toast-title',
                    toastClass: 'toast',
                    autoDismiss: false,
                    containerId: 'toast-container',
                    maxOpened: 0,
                    newestOnTop: true,
                    positionClass: 'toast-top-right',
                    preventDuplicates: false,
                    preventOpenDuplicates: false,
                    target: 'body'
                };
                
                var getToastrConfig = function(){
                    return defaultToastrConfig;
                };
                
                var setToastrConfig = function(config){
                    angular.extend(defaultToastrConfig, config);
                };
                
                return{
                    getToastConfig: getToastrConfig,
                    setToastConfig: setToastrConfig,
                    
                    $get: {
                        getToastConfig: getToastrConfig,
                        setToastConfig: setToastrConfig,
                    }
                };
            }
        ]);
