!function (angular) {
    "use strict";
    angular.module('SignIn').controller('SignInFormCtrl', [
        '$scope',
        function ($scope) {
            $scope.test = 'test';
            console.log($scope.test);
        }
    ]);
}(angular);
