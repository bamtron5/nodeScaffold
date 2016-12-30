var chThreeApp;
(function (chThreeApp) {
    angular.module('ch-three-app', ['ngResource', 'ui.router'])
        .config(function ($resourceProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
            url: '/',
            template: '<boxer-list></boxer-list>'
        });
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(true);
    })
        .run(function () { });
})(chThreeApp || (chThreeApp = {}));
