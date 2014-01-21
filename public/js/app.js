var interfaceApp = angular.module('interfaceApp', ['ngRoute', 'ngSanitize']);

interfaceApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/games', {templateUrl: 'partials/games.html', controller: 'gamesController'});
  $routeProvider.when('/uitleg', {templateUrl: 'partials/uitleg.html', controller: 'gameController'});
  $routeProvider.when('/inprogress', {templateUrl: 'partials/inprogress.html', controller: 'progressController'});
  $routeProvider.when('/gameover', {templateUrl: 'partials/gameover.html', controller: 'gameoverController'});
  $routeProvider.when('/registreren', {templateUrl: 'partials/registreren.html', controller: 'registerController'});
  $routeProvider.otherwise({redirectTo: '/games'});
}]);
