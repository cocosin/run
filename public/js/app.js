/**
 * Created by Constantine on 18.10.2015.
 */
!function (angular) {
    "use strict";
    angular.module('app', ['ui.router', 'SignIn']);
}(angular);

!function (angular) {
    'use strict';
    angular.module('app').constant('CONSTS', (function () {
        var consts = {
            host: '',
            hostApi: '',
            prefixPath: ''
        };

        angular.extend(consts, {
            pathToModules: consts.prefixPath + 'js/modules/' // Путь к директории модулей приложения
        });

        return consts;
    }()));
}(angular);
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
!function (angular) {
    "use strict";
    angular.module('Auth', []);
}(angular);

!function (angular) {
    "use strict";
    angular.module('SignIn', []);
}(angular);

!function (angular) {
    "use strict";
    angular.module('Auth').provider('auth', [
            function () {
                // auth methods must be here
            }
        ]
    );
}(angular);

!function (angular) {
    "use strict";
    angular.module('SignIn').controller('signInFormCtrl', [
        '$scope',
        '$http',
        function ($scope, $http) {
            $scope.test = 'test';
            console.log($scope.test);

            $scope.params = {
                login: 'qostya',
                password: '1234'
            };

            $scope.currUrl = '/login';

            $scope.sendSignIn = function() {
                $http.post($scope.currUrl, $scope.params).then(
                    function (data) {
                        $scope.messages = data.data;
                    }
                );
            }
        }
    ]);
}(angular);
