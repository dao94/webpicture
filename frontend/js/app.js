'use strict';

var ApiPath = 'http://picture.local.com/backend/public/api/v1/';

angular.module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ui.utils',
    'ui.load',
    'ui.jq',
    'oc.lazyLoad',
    'pascalprecht.translate',
    'ngMaterial',
    'angular-growl'
])

.directive('formatnumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
      modelCtrl.$parsers.push(function(data) {
        if(data != '' && data != undefined){
            //convert data from view format to model format
            var string  = data.toString().replace(/^(0*)/,"");
            string      = string.replace(/(\D)/g,"");
            string      = string.replace(/^$/,"0");
            string      = string.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
            
             if (string!=data) {
               modelCtrl.$setViewValue(string);
               modelCtrl.$render();
             }   
                      
            return string; //converted
        }
        return;
      });
     /* 
      modelCtrl.$formatters.push(function(data) {
        //convert data from model format to view format
        if(data != '' && data != undefined){
            var string  = data.toString().replace(/','/,"");
            
            if (string!=data) {
               modelCtrl.$setViewValue(string);
               modelCtrl.$render();
             }
             return string;
        }
        return;
      });
    */
    }
  }
});