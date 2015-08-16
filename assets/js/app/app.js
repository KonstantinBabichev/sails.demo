'use strict';

/**
 * @ngdoc overview
 * @name fuzzyApp
 * @description
 * # fuzzyApp
 *
 * Main module of the application.
 */
var fuzzyMap = angular
  .module('fuzzyMap', [
    'ngRoute',
    'ngResource',
    'ngSanitize'
    //'ngCookies',

    //'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    console.log('config');
    $routeProvider
      .when('/', {
        templateUrl:'templates/list.html',
        controller: 'PlacesController as placesList',
        resolve: {
          initialPlaces: function (placesFactory) {
            console.log('when /');
            return placesFactory.query();
          }
        }
      })
      .when('/place/:id', {
        templateUrl:'templates/place.html',
        controller: 'PlaceController as placesList',
        resolve: {
          initialPlaces: function (placesFactory, $routeParams, $route) {
            return placesFactory.query($route.current.params.id);
          }
        }
      })
      .when('/blog/:id', {
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: true
    });
  });
