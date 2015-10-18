!function (angular) {
    'use strict';
    angular.module('app').config([
        '$stateProvider',
        '$parseProvider',
        '$urlRouterProvider',
        'CONSTS',
        '$locationProvider',
        function ($stateProvider, $parseProvider, $urlRouterProvider, CONSTS, $locationProvider) {

            $urlRouterProvider.otherwise(function($injector) {
                //var isLogged = $injector.invoke(['Authentication', function(Authentication) {
                //    return Authentication.isLogged();
                //}]);
               return '/signin';
            });
            $stateProvider
                .state('signIn', {
                    url: '/signin',
                    views: {
                        '': {
                            templateUrl: CONSTS.pathToModules + '/SignIn/views/sign_in.html',
                            controller: 'signInFormCtrl'
                        }
                    }
                });

            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

        }
    ]);
}(angular);