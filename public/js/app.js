/**
 * Created by Constantine on 18.10.2015.
 */
!function (angular) {
    "use strict";
    angular.module('app', ['SignIn']);
}(angular);

!function (angular) {
    "use strict";
    angular.module('SignIn', []);
}(angular);

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