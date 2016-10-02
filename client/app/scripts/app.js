'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
    .module('clientApp', [
        'ngRoute',
        'restangular'
    ])
    .config(function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://localhost:3000');

    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            //controllerAs: 'main'
        })
        .when('/movies', {
            templateUrl: 'views/movies.html',
            controller: 'MoviesCtrl',
            //controllerAs: 'movies'
                /*this had to be removed for the manually inputted
                title/urls in movies.js to show up. controllerAs
                statements are only needed for nested views.*/
        })
        .when('/create/movie', {
          templateUrl: 'views/movie-add.html',
          controller: 'MovieAddCtrl',
          //controllerAs: 'movieAdd'
        })
        .when('/movie/:id', {
          templateUrl: 'views/movie-view.html',
          controller: 'MovieViewCtrl',
          //controllerAs: 'movieView'
        })
        .when('/movie/:id/delete', {
          templateUrl: 'views/movie-delete.html',
          controller: 'MovieDeleteCtrl',
          //controllerAs: 'movieDelete'
        })
        .when('/movie/:id/edit', {
          templateUrl: 'views/movie-edit.html',
          controller: 'MovieEditCtrl',
          //controllerAs: 'movieEdit'
        })
        .otherwise({
            redirectTo: '/'
        });
    })
    .factory('MovieRestangular', function (Restangular) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setRestangularFields({
                id: '_id'
            });
        });
    })
    .factory('Movie', function (MovieRestangular) {
        return MovieRestangular.service('movie');
    })
    //create an angular directive to show embedded movie
    .directive('youtube', function () {
        return {
            restrict: 'E', //restrict to element
            scope: { //allows to pass in parameters attached to 'embed'
                src: '='
            },
            templateUrl: 'views/youtube.html'
        };
    })
    //add a filter to trust the non-trusted outside embedded URLS
    .filter('trusted', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl(url);
        };
    });
