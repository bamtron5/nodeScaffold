var chThreeApp;
(function (chThreeApp) {
    var Components;
    (function (Components) {
        var name = 'boxerList';
        var template = '/ngApp/components/boxerList/boxerList.html';
        var BoxerList = (function () {
            function BoxerList() {
            }
            return BoxerList;
        }());
        Components.BoxerList = BoxerList;
        angular.module('ch-three-app').component(name, {
            templateUrl: template,
            controller: chThreeApp.Components.BoxerList,
            controllerAs: 'vm'
        });
    })(Components = chThreeApp.Components || (chThreeApp.Components = {}));
})(chThreeApp || (chThreeApp = {}));
