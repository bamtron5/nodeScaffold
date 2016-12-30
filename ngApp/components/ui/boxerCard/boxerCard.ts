namespace chThreeApp.Components {
  //component config
  //boxerCard translates to <boxer-card></boxer-card>
  const name = 'boxerCard'
  const template = '/ngApp/components/ui/boxerCard/boxerCard.html';

  export class BoxerCard {
    public hello:string;
    constructor() {
      this.hello = 'Hello from BoxerCard class'
    }
  }

  angular.module('ch-three-app').component(name, {
    templateUrl: template,
    controller: chThreeApp.Components.BoxerCard,
    controllerAs: 'vm'
  });
}
