namespace chThreeApp.Components {
  const name = 'boxerList';
  const template = '/ngApp/components/boxerList/boxerList.html';

  export class BoxerList {
    public boxers;
  }

  angular.module('ch-three-app').component(name, {
    templateUrl: template,
    controller: chThreeApp.Components.BoxerList,
    controllerAs: 'vm'
  });
}
