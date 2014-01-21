interfaceApp.factory('gameFactory', function($http, $rootScope) {
	return {
		getGames: function(result)
		{
          $http.get($rootScope.hostURL+'/games').success(result);
		},
		getGame: function(result)
		{
			$http.get($rootScope.hostURL+'/games/'+$rootScope.currentGameID).success(result);
		},
		getPrototypeState: function(result)
		{
			$http.get($rootScope.hostURL+'/prototype').success(result);
		}
	};
});