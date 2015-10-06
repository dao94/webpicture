'use strict';
angular
  .module('app')
  .controller('ArtworkCtrl', ['$scope', '$state', '$stateParams', '$timeout', '$restful', '$http', '$auth','growl',
    function ($scope, $state, $stateParams, $timeout, $restful, $http, $auth,growl) {
    	$scope.frm = {};
    	$scope.save = function (frm){
			console.log('save', frm);
    	}
	}]);

