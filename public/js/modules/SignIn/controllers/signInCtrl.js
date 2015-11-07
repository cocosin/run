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
