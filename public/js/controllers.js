var controllers = {};

controllers.gamesController = function($scope, $rootScope, $http, $routeParams, $location, gameFactory)
{
	$rootScope.hostURL = 'http://162.243.11.151:2403';
	$rootScope.lastScore = 0;
	
	gameFactory.getGames(function(results)
	{
		$scope.games = results;
	});

	$scope.goToGame = function(id, name)
	{
		$rootScope.currentGameName = name;
		$rootScope.currentGameID = id;
		$location.path('uitleg');
	}
};

controllers.gameController = function($scope, $rootScope, $http, $routeParams, $location, gameFactory)
{
	gameFactory.getGame(function(result)
	{
		$scope.game = result;
	});

	$scope.startGame = function()
	{
		var date = new Date();
		time = date.getTime();
    	dpd.gamesessions.post({gameID: $rootScope.currentGameID, gameName: $rootScope.currentGameName, player: 'player' , timestart: time, state: 'started'}, function(result, error)
		{
			if(!error)
			{
				$rootScope.activeGameID = result.id;
			}
			else
			{
				return alert(error.message || "an error occurred");
			}
		});
	};
}

controllers.progressController = function($scope, $rootScope, $location)
{
	dpd.on('session:end', function(session)
	{
		$rootScope.lastScore = session.score;
		console.log($rootScope.lastScore);
		$scope.$apply(function()
		{
			$location.path('gameover');
		});
	});
	
	dpd.on('session:cancelled', function(session)
	{
		$rootScope.lastScore = session.score;
		console.log($rootScope.lastScore);
		$scope.$apply(function()
		{
			$location.path('gameover');
		});
	});
	
	$scope.endGame = function()
	{
		dpd.gamesessions.put($rootScope.activeGameID, { state: 'cancelled' }, function(result, error)
		{
			if(!error)
			{
				console.log(result);
			}
			else
			{
				return alert(error.message || "an error occurred");
			}
		});
	}
}

controllers.gameoverController = function($scope, $rootScope, $http)
{
	$http.get($rootScope.hostURL+'/scores?gameID='+$rootScope.currentGameID).success(function(scores, error)
	{
		$scope.scores = scores;
	}).error(function(err)
	{
		console.log(error);
	});
	
	$scope.setScore = function()
	{
		dpd.scores.post({gameID: $rootScope.currentGameID, username: $scope.newScore.username, score: $rootScope.lastScore}, function(score, error)
		{
			if(!error)
			{
				$scope.scores.push(score);
				$scope.$apply(function()
				{
					$scope.newScoreAdded = true;
				});
			}
			else
			{
				return alert(error.message || "an error occurred");
			}
		});
	}	
}

controllers.registerController = function($scope, $rootScope, $http)
{
	$scope.createAccount = function(test)
	{
		dpd.users.post({username: $scope.regUsername, password: $scope.regPassword}, function(result, error)
		{
			if(!error)
			{
				console.log(result);
			}
			else
			{
				alert(error.message);
			}
		});
	}
}


interfaceApp.controller(controllers);