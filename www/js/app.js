
angular.module('ba.filters', []);
angular.module('ba.services', []);
angular.module('ba.directives', []);
angular.module('ba.controllers', []);

angular.module('ba', [
    'ngCookies',
    'pascalprecht.translate',
    'ngStorage',
    'ngCordova',
    'ngGrid',
    'ionic',
    'highcharts-ng',
    'ba.filters',
    'ba.services',
    'ba.directives',
    'ba.controllers'
]).
    config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function($stateProvider, $urlRouterProvider, $translateProvider) {
        'use strict';

        $translateProvider.useLocalStorage();
        $translateProvider.preferredLanguage('en-US');
        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/',
            suffix: '.json'
        });

        $stateProvider.state('login', {url: '/login', templateUrl: 'js/login/partials/liLogIn.html', controller: 'liAuthenticationCtrl', requireLogin: false});
        $stateProvider.state('liApplicationSettings', {url: '/login/settings', templateUrl: 'js/settings/partials/setApplication.html', controller: 'setApplicationCtrl', requireLogin: false});
        $stateProvider.state('main', {url: '/index', abstract: true, templateUrl: 'js/main/partials/mnMain.html', controller: 'mnMainCtrl'});

        $stateProvider.state('main.grid', {url: '/grid', views: {
            'menuContent':{
                templateUrl: 'js/main/partials/mnGrid.html'
            }
        }});

        $stateProvider.state('main.chart', {url: '/chart', views: {
            'menuContent':{
                templateUrl: 'js/main/partials/mnChart.html'
            }
        }});

        $urlRouterProvider.otherwise('/index/grid');
    }]).
    run(['$rootScope', 'cmnAuthenticationSvc', '$state', function($rootScope, cmnAuthenticationSvc, $state){
        'use strict';

        $rootScope.$on('$stateChangeStart', function(event, next) {

            var requireLogin = next.requireLogin === undefined || next.requireLogin;
            if (requireLogin && !cmnAuthenticationSvc.isAuthenticated()) {
                $state.go('login');
                event.preventDefault();
            }
        });
    }]);