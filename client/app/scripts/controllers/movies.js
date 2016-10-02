/*I normally use JSLint style rules and always use double
quotes, but JSCS validateQuoteMarks is integrated into
Grunt, and spat errors if I used double quotes*/
'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('MoviesCtrl', function ($scope, Movie) {
        $scope.movies = Movie.getList().$object;
    });

    /*To manually populate:
    .controller('MoviesCtrl', function ($scope) {
        $scope.movies = [
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
