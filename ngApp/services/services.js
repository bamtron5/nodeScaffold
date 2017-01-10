var chThreeApp;
(function (chThreeApp) {
    var Services;
    (function (Services) {
        var BoxerService = (function () {
            function BoxerService() {
            }
            return BoxerService;
        }());
        Services.BoxerService = BoxerService;
        angular.module('ch-three-app').service('BoxerService', BoxerService);
    })(Services = chThreeApp.Services || (chThreeApp.Services = {}));
})(chThreeApp || (chThreeApp = {}));
