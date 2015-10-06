'use strict';
angular
  .module('app')
  .controller('profileController', ['$scope', '$state', '$stateParams', '$timeout', '$restful', '$http', '$auth','growl',
    function ($scope, $state, $stateParams, $timeout, $restful, $http, $auth,growl) {
      $scope.update = function(user) {
        $restful.post('profile/update',user,function (err,res) {
            if(!err) {
                console.log(res);
            }
        });
      }
    }]);

