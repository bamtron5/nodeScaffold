var chThreeApp;
(function (chThreeApp) {
    var Components;
    (function (Components) {
        var name = 'boxerCard';
        var template = '/ngApp/components/ui/boxerCard/boxerCard.html';
        var BoxerCard = (function () {
            function BoxerCard() {
            }
            return BoxerCard;
        }());
        Components.BoxerCard = BoxerCard;
        angular.module('ch-three-app').component(name, {
            templateUrl: template,
            controller: chThreeApp.Components.BoxerCard,
            controllerAs: 'vm',
            bindings: {
                boxer: '<'
            }
        });
    })(Components = chThreeApp.Components || (chThreeApp.Components = {}));
})(chThreeApp || (chThreeApp = {}));
