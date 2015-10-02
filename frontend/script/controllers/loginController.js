'use strict';
angular
  .module('app')
  .controller('LoginController', ['$scope', '$state', '$stateParams', '$timeout', '$restful', '$http', '$auth','growl',
    function ($scope, $state, $stateParams, $timeout, $restful, $http, $auth,growl) {
    	$scope.user = {};
    	$scope.btnLogin = false;
    	$scope.register = function(user) {
    		$restful.post('login/register',user, function (err, res) {
    			if(!res.error) {
    				growl.success(res.message,{ttl : 4000});
    				$scope.user = {};
    				$timeout(function() {
    					$state.go('access.login');
    				},3000);
    			}
    			else{
    				growl.warning(res.error_message,{ttl : 4000});
    			}
    		})
    	}

    	$scope.login = function(user) {
    		$scope.btnLogin = true;
    		$restful.post('login/login',user, function (err, res) {
    			$scope.btnLogin = false;
    			if(!res.error) {
    				$auth.setUser(res.data);
					$auth.setToken(res.data.token.token);
					
    				growl.success(res.message,{ttl : 3000});
    				$scope.user = {};
    				$timeout(function() {
    					$state.go('app.dashboard');
    				},3000);

    			} else {
    				growl.warning(res.error_message,{ttl : 4000});
    			}

    		})	
    	}
	}]);

