/**
* config()
* @description - log in page config file
*/


(function() {
    'use strict';

    angular
        .module('finApp.pages.logInPage', [])
        .config(config);

    //config.$inject = ['ionic'];

    function config($stateProvider: angular.ui.IStateProvider) {

        $stateProvider
            .state('page.logIn', {
                url: '/logIn',
                views: {
                    'container': {
                        templateUrl: 'templates/app/pages/logInPage/logInPage.html',
                        controller: 'finApp.pages.logInPage.LogInPageController',
                        controllerAs: 'vm'
                    }
                },
                params: {
                    user: null
                },
                resolve: {
                    requireNoAuth: function($state, $firebaseAuth, FirebaseFactory) {
                        let ref = FirebaseFactory.createFirebase();
                        let auth = $firebaseAuth(ref);
                        return auth.$requireAuth().then(function(auth) {
                            $state.go('home');
                        }, function(error) {
                            return;
                        });
                    }
                },
                parent: 'page'
            });
    }
})();
