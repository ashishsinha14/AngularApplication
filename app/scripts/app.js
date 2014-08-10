window.GPAC = {};
GPAC.POC = {};

GPAC.POC.Libs = angular.module('gpac.poc.libs', [
    'ngRoute',
    'ngGrid'
]);
GPAC.POC.Controllers = angular.module('gpac.poc.controllers', []);
GPAC.POC.Directives = angular.module('gpac.poc.directives', []);
GPAC.POC.Services = angular.module('gpac.poc.services', []);
GPAC.POC.Filters = angular.module('gpac.poc.filters', []);
GPAC.POC.Extensions = angular.module('gpac.poc.extensions', []);

GPAC.POC.App = angular.module('gpacPOC', [
        'gpac.poc.libs',
        'gpac.poc.controllers',
        'gpac.poc.directives',
        'gpac.poc.services',
        'gpac.poc.filters',
        'gpac.poc.extensions'
    ])

.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'views/home.html'
        });

    $locationProvider.html5Mode(false);
});