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
