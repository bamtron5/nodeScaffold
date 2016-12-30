var chThreeApp;
(function (chThreeApp) {
    var Services;
    (function (Services) {
        var BoxerService = (function () {
            function BoxerService($resource) {
                this.BoxerResource = $resource('/api/boxers');
            }
            BoxerService.prototype.getBoxers = function () {
                return this.BoxerResource.query().$promise;
            };
            return BoxerService;
        }());
        Services.BoxerService = BoxerService;
        angular.module('ch-three-app').service('BoxerService', BoxerService);
    })(Services = chThreeApp.Services || (chThreeApp.Services = {}));
})(chThreeApp || (chThreeApp = {}));
