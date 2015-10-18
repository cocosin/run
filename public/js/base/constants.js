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