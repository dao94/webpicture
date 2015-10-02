'use strict';
angular
  .module('app')
  .controller('dashboardController', ['$scope', '$state', '$stateParams', '$timeout', '$restful', '$http', '$auth','growl',
    function ($scope, $state, $stateParams, $timeout, $restful, $http, $auth,growl) {
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

        $scope.loading = function() {
            $restful.post('home/test','',function (err,res) {
                console.log(res);
            })
        }
        $scope.loading();
	}]);

