var chThreeApp;
(function (chThreeApp) {
    var controllers;
    (function (controllers) {
        var HomeController = (function () {
            function HomeController() {
                console.log('console');
                this.hello = 'hello world';
            }
            return HomeController;
        }());
        controllers.HomeController = HomeController;
    })(controllers = chThreeApp.controllers || (chThreeApp.controllers = {}));
})(chThreeApp || (chThreeApp = {}));
