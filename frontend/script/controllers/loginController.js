'use strict';
angular
  .module('app')
  .controller('LoginController', ['$scope', '$state', '$stateParams', '$timeout', '$restful', '$http', '$auth',
    function ($scope, $state, $stateParams, $timeout, $restful, $http, $auth) {

    	$scope.register = function(frm) {
    		$restful.post('login/register',frm, function (err, res) {
    			console.log(err);
    		})
    	}

}]);

