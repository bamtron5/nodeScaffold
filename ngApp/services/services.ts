namespace chThreeApp.Services {
  export class BoxerService{
    public BoxerResource;

    getBoxers() {
      return this.BoxerResource.query().$promise;
    }

    constructor(
      $resource: ng.resource.IResourceService
    ) {
      this.BoxerResource = $resource('/api/boxers');
    }
  }

  angular.module('ch-three-app').service('BoxerService', BoxerService);
}
