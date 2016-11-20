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
        .when('/videos', {
            templateUrl: 'views/videos.html',
            controller: 'VideosCtrl',
            //controllerAs: 'videos'
                /*this had to be removed for the manually inputted
                title/urls in videos.js to show up. controllerAs
                statements are only needed for nested views.*/
        })
        .when('/create/video', {
          templateUrl: 'views/video-add.html',
          controller: 'VideoAddCtrl',
          //controllerAs: 'videoAdd'
        })
        .when('/video/:id', {
          templateUrl: 'views/video-view.html',
          controller: 'VideoViewCtrl',
          //controllerAs: 'videoView'
        })
        .when('/video/:id/delete', {
          templateUrl: 'views/video-delete.html',
          controller: 'VideoDeleteCtrl',
          //controllerAs: 'videoDelete'
        })
        .when('/video/:id/edit', {
          templateUrl: 'views/video-edit.html',
          controller: 'VideoEditCtrl',
          //controllerAs: 'videoEdit'
        })
        .otherwise({
            redirectTo: '/'
        });
    })
    .factory('VideoRestangular', function (Restangular) {
        return Restangular.withConfig(function (RestangularConfigurer) {
            RestangularConfigurer.setRestangularFields({
                id: '_id'
            });
        });
    })
    .factory('Video', function (VideoRestangular) {
        return VideoRestangular.service('video');
    })
    //create an angular directive to show embedded video
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
