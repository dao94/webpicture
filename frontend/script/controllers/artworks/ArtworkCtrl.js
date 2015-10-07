'use strict';
angular
  .module('app')
  .controller('ArtworkCtrl', ['$scope', '$state', '$stateParams', '$timeout', '$restful', '$http', '$auth', 'growl', 'App', 'FileUploader',
    function ($scope, $state, $stateParams, $timeout, $restful, $http, $auth, growl, App, FileUploader) {
    	$scope.frm = {};
    	$scope.list_material = [];
    	$scope.list_style = [];
    	$scope.list_color = [];

    	$scope.uploader = new FileUploader({
            url: ApiPath + 'uploader',
            alias: 'file',
            queueLimit: 5,
            headers: {
            	Authorization: $auth.getToken()
            },
            formData: [
                {
                    key: 'request'
                }
            ]
    	});

    	$scope.uploader.onAfterAddingFile = function (item){
    		$scope.uploader.uploadAll();
    	};



    	$scope.save = function (frm){
    		console.log(frm);
    	}

    	App.getMaterial(function (err, resp){
    		if(err){
    			growl.warning(err,{ttl : 4000});
    			return;
    		}
    		$scope.list_material = resp.data;
    	});

    	App.getStyle(function (err, resp){
    		if(err){
    			growl.warning(err,{ttl : 4000});
    			return;
    		}
    		$scope.list_style = resp.data;
    	});

    	App.getColor(function (err, resp){
    		if(err){
    			growl.warning(err,{ttl : 4000});
    			return;
    		}
    		$scope.list_color = resp.data;
    	});

	}]);

