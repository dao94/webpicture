angular.module('app')
	.service('App', [ '$http', '$resource', '$restful', function ( $http, $resource, $restful){
		
		var App = {
			getMaterial: function (callback){
				$restful.get('artworks/material/show', function (error, resp){
					callback(error, resp)
				});
			},

			getStyle: function (callback){
				$restful.get('artworks/style/show', function (error, resp){
					callback(error, resp)
				});
			},
			getColor: function (callback){
				$restful.get('artworks/color/show', function (error, resp){
					callback(error, resp)
				});
			},


		};
		return App;
	}])