'use strict';
angular
  .module('app')
  .controller('ArtworkCtrl', ['$scope', '$state', '$stateParams', '$timeout', '$restful', '$http', '$auth', 'growl', 'App', 'FileUploader',
    function ($scope, $state, $stateParams, $timeout, $restful, $http, $auth, growl, App, FileUploader) {
    	$scope.frm = {};
    	$scope.list_material = [];
    	$scope.list_style = [];
    	$scope.list_color = [];

    	$scope.list_images = [];
    	$scope.feature_image = [];
    	$scope.uploadProcessing = 0;
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

    	$scope.uploader.onAfterAddingAll  = function (addedItems){
    		$scope.uploadProcessing = 0;
			$scope.uploader.uploadAll();
    	};


    	$scope.uploader.onProgressAll = function (process){
			$scope.uploadProcessing = process;
    	}
    	$scope.uploader.onCompleteItem = function (item, response, status, headers){
			if(!response.error){
				if($scope.list_images.length == 0){
					$scope.setFeatureImage(response.data);
				}
				$scope.list_images.push(response.data);
			}
    	}
    	$scope.uploader.onCompleteAll = function (){
    		$scope.uploadProcessing = 0;
    	}


    	$scope.setFeatureImage = function (image){
    		$scope.feature_image = image;
    	}
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

