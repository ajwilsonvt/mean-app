/*I normally use JSLint style rules and always use double
quotes, but JSCS validateQuoteMarks is integrated into
Grunt, and spat errors if I used double quotes*/
'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:VideosCtrl
 * @description
 * # VideosCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('VideosCtrl', function ($scope, Video) {
        $scope.videos = Video.getList().$object;
    });

    /*To manually populate:
    .controller('VideosCtrl', function ($scope) {
        $scope.videos = [
            {
                title: '28 TYPES OF BALLERS ON THE COURT',
                url: 'https://www.youtube.com/embed/UcJci08essY'
            },
            {
                title: '26 TYPES OF RAPPERS IN THE STUDIO',
                url: 'https://www.youtube.com/embed/BlRJsaxAoUk'
            },
            {
                title: 'JAMAICAN RESTAURANTS NEVER HAVE FOOD!',
                url: 'https://www.youtube.com/embed/Wgacj80AjBY'
            }*/
