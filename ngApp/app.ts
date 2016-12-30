namespace chThreeApp {
  angular.module('ch-three-app', ['ngResource', 'ui.router'])
    .config((
      $resourceProvider: ng.resource.IResourceServiceProvider,
      $stateProvider: ng.ui.IStateProvider,
      $urlRouterProvider: ng.ui.IUrlRouterProvider,
      $locationProvider: ng.ILocationProvider
    ) => {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: './ngApp/views/index.html',
          controller: chThreeApp.controllers.HomeController,
          controllerAs: 'vm'
        })

      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true);
    })
    .run(() => {});
}
