namespace chThreeApp.Services {
  export class BoxerService{
    public BoxerResource;

    getBoxers() {
      return this.BoxerResource.query().$promise;
    }

    //TODO should be typed
    update(id) {
      return this.BoxerResource.save({id: id}).$promise;
    }

    constructor(
      $resource: ng.resource.IResourceService
    ) {
      this.BoxerResource = $resource('/api/boxers/:id', {id: '@id'});
    }
  }

  angular.module('ch-three-app').service('BoxerService', BoxerService);
}
