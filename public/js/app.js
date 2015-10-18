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
        function ($stateProvider, $parseProvider, $urlRouterProvider, CONSTS) {

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

        }
    ]);
}(angular);
!function (angular) {
    "use strict";
    angular.module('SignIn', []);
}(angular);

!function (angular) {
    "use strict";
    angular.module('SignIn').controller('signInFormCtrl', [
        '$scope',
        function ($scope) {
            $scope.test = 'test';
            console.log($scope.test);
        }
    ]);
}(angular);
