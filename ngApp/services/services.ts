namespace chThreeApp.Services {
  export class BoxerService{
    public BoxerResource;

    getBoxers() {
      return this.BoxerResource.query().$promise;
    }

    //TODO should be typed
    update(boxer) {
      return this.BoxerResource.save({id: boxer._id}, boxer).$promise;
    }

    constructor(
      $resource: ng.resource.IResourceService
    ) {
      this.BoxerResource = $resource('/api/boxers/:id', {id: '@id'});
    }
  }

  angular.module('ch-three-app').service('BoxerService', BoxerService);
}
