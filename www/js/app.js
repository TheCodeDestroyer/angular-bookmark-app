
angular.module('ba.filters', []);
angular.module('ba.services', []);
angular.module('ba.directives', []);
angular.module('ba.controllers', []);

angular.module('ba', [
    'ngCookies',
    'pascalprecht.translate',
    'ngStorage',
    'ngCordova',
    'ionic',
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
        $stateProvider.state('index', {url: '/index', abstract: true, templateUrl: 'js/index/partials/indMain.html', controller: 'indMainCtrl'});

        $stateProvider.state('index.home', {url: '/home', views: {
            'home-tab':{
                templateUrl: 'js/index/partials/indHome.html',
                controller: 'indHomeCtrl'
            }
        }});

        $urlRouterProvider.otherwise('/index/home');
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