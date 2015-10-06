'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(['$rootScope', '$state', '$stateParams','$auth',
      function ($rootScope,   $state,   $stateParams,$auth) {
          $rootScope.$state       = $state;
          $rootScope.$stateParams = $stateParams;     
          $rootScope.user         = $auth.getUser() || false;   

          $rootScope.$on('$stateChangeSuccess', function (ev, data, bcb) {
            window.scrollTo(0, 0);
          });

          $rootScope.$on('$stateChangeStart', function (ev, toState, toParams){
            $rootScope.user = $auth.getUser() || false;

            if(toState.name.indexOf('app') !== -1){
              if(!$auth.getUser() || $auth.getUser()['token']['exp']  <= (Date.now() / 1000) && !$auth.getToken()){
                  $auth.clearUser();
                  $rootScope.user = $auth.getUser() || false;
                  ev.preventDefault();

                  window.location = 'http://picture.local.com/frontend/#/access/login';
                  return ;
              }
            }

            if(toState.name == 'access.login') {
              $auth.clearUser();
              $rootScope.user = $auth.getUser() || false;
            }

            $rootScope.logout = function() {
              $auth.clearUser();
              $rootScope.user = '';
              $state.go('access.login');
            }

          });

          $auth.setToken();
      }
  ])
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
          $urlRouterProvider
              .otherwise('/app/dashboard');
          
          $stateProvider
              .state('app', {
                  abstract: true,
                  url: '/app',
                  templateUrl: "tpl/app.html"
              })
              .state('app.dashboard', {
                  url: '/dashboard',
                  templateUrl: 'tpl/app_dashboard.html',
                  resolve: load( ['script/controllers/dashboardController.js'] )
              })
              .state('app.profile', {
                  url: '/profile',
                  templateUrl: 'tpl/page_profile.html',
                  resolve:load(['script/controllers/profileController.js'])
              })


              // others
              .state('access', {
                  url: '/access',
                  templateUrl: 'tpl/login/index.html',
              })
              .state('access.login', {
                  url: '/login',
                  templateUrl: 'tpl/login/page_signin.html',
                  resolve: load( ['js/controllers/signin.js'] )
              })
              .state('access.register', {
                  url: '/register',
                  templateUrl: 'tpl/login/page_signup.html',
                  resolve: load( ['script/controllers/loginController.js'] )
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/login/page_forgotpwd.html'
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/login/page_404.html'
              })


          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        if(JQ_CONFIG[src]){
                          return $ocLazyLoad.load(JQ_CONFIG[src]);
                        }
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            name = module.name;
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }


      }
    ]
  );
