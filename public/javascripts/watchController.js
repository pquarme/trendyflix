app.controller('watchController', function($scope, $location, $routeParams, cfpLoadingBar) {
	
	/* Values */
	$scope.plyrVars = {    //stores values for the player
			autoplay: 0
	};
	
	$scope.activeEpisode; //current playing episode obj
	$scope.activeEpisodeUrl; //stores url for current video playing
	$scope.seasons;    //stores current seasons from query  	
	
	$scope.activeSeasonVal = '1';  //saves current season value - default is 1
	$scope.activeEpisodeVal= '1'; //saves current episode value - default is 1
	
	//set url for social sharing
	$scope.socialshareText = "TrendyFlix - "+ $routeParams.seriesname;
	$scope.socialshareUrl = $location.absUrl();
	console.log("activeUrl ---------------- "+$scope.socialshareUrl);
	
	
	/*
	 * Checks if query is set in location
	 * */
	//checks for season
	if($location.search()['s'] !== undefined){
		$scope.activeSeasonVal = $location.search()['s']; //saves activeSeason to location val
		console.log("Season = " + $scope.activeSeasonVal);
	}	
	//checks for episode
	if($location.search()['e'] !== undefined){
		$scope.activeEpisodeVal = $location.search()['e']; //sets activeEpisode to location val
		console.log("Episode = " + $scope.activeEpisodeVal);
	}
	
	//sets webService for series info
	var apiRoute = apiRoutes.controllers.EpisodesAction.getEpisodes($routeParams.seriesname);
	
	//initiates Loadingbar
	cfpLoadingBar.start();
	
	//calls service for json files
	apiRoute.ajax().done(function(result) {
		if (result == "Error - Result is empty!") {
			console.log("redirect");
			$scope.$evalAsync(cfpLoadingBar.complete()); //stops loading bar
		} else {
			$scope.series = result;
			$scope.seasons = $scope.series.seasons;
			console.log($scope.seasons);
			$scope.initializePlayer(); //calls initializePlayer 
			$scope.$evalAsync(cfpLoadingBar.complete()); //stops loading bar
		}
	}).fail(function(res) {
		console.log("Failed - " + res);
	});
	
	//Initialize player settings after calling api
	$scope.initializePlayer = function(){
		$scope.activeSeasonIndex = '0'   //saves current index for episode
		$scope.activeEpisodeIndex = '0'; //saves current index for episode in activeSeason object
		
		//checks if season exists
		try{
			$scope.activeSeasonIndex = $scope.activeSeasonVal - 1;
			$scope.activeSeason = $scope.series.seasons[$scope.activeSeasonIndex];
		}catch(err){
			console.log("Season doesn't exist");
			$scope.activeSeasonIndex = '0';
		}
		
		//checks if episode exists
		try{
			$scope.activeSeason = $scope.series.seasons[$scope.activeSeasonIndex]; 
			$scope.activeEpisodeIndex = $scope.activeSeason.episodes.map(function(e) { return e.episode_num; }).indexOf(parseInt($scope.activeEpisodeVal));
			console.log(" Url episode index -> " + $scope.activeEpisodeIndex );
			//initialize player			
			$scope.playVideo($scope.activeSeason.episodes[$scope.activeEpisodeIndex]); 
		}catch(err){
			console.log("Episode doesn't exist");
			//initializes player with checked values
			$scope.activeSeason = $scope.series.seasons[$scope.activeSeasonIndex]; 
			$scope.playVideo($scope.activeSeason.episodes[0]); 
		}
	};
		
	//toggle autoplay value
	var called = false;
	$scope.setAutoPlay = function(){
		if(called){
			$scope.plyrVars.autoplay = 0;
			called = false;
			console.log('autoplay - ' + $scope.plyrVars.autoplay);
			return;
		}
		$scope.plyrVars.autoplay = 1;
		if($scope.plyrVars.autoplay === 1){ ///stores a value for the current season in autoplay queue
			$scope.autoPlaySeason = $scope.activeSeason.season_num;  //stores season num for autoplay
			console.log('autoplay - ' + $scope.plyrVars.autoplay);
			console.log('autoplay starting from Season - '+$scope.autoPlaySeason);
		}
		called = true;
	};
	
	/*plays specific video
	 * passed param is episode object
	 */
	//$scope.activeUrl = window.location.href;
	$scope.playVideo = function(episodeObj){
		$scope.activeEpisode = episodeObj;
		$scope.activeEpisodeUrl = $scope.activeEpisode.url; //sets activeEpisodeUrl for player
		if($scope.activeEpisode.season_num !== $scope.autoPlaySeason){
			$scope.autoPlaySeason = $scope.activeEpisode.season_num;
			console.log("Changing autoplayseason number , New Number  - "+ $scope.autoPlaySeason);
		}
		
		//set current season and episode in url
		$location.search('s' , $scope.activeEpisode.season_num);
		$location.search('e' , $scope.activeEpisode.episode_num);
		
		//changes the current active season
		$scope.changeSeason($scope.activeEpisode.season_num);		
	};
	
	//determine if current video has ended
	$scope.$on('youtube.player.ended', function ($event, player){
		console.log("Video has ended");
		$scope.autoPlaySeasonIndex = $scope.autoPlaySeason -1; 
		$scope.autoPlayEpisodeIndex = $scope.series.seasons[$scope.autoPlaySeasonIndex].episodes.indexOf($scope.activeEpisode);
		console.log("autoPlayEpisodeIndex - "+$scope.autoPlayEpisodeIndex);
		
		//check is autoplay is set to play next video
		if($scope.plyrVars.autoplay === 1){
			console.log("playingNextVideo");
			/*
			 * if the next video for autoplay is in the next season
			 * add 1 to the season num and play the first episode
			 */
			console.log("Checking season length to autoPlayEpisodeIndex+1  " + $scope.series.seasons[$scope.autoPlaySeasonIndex].episodes.length + '    ----    ' + ($scope.autoPlayEpisodeIndex + 1));
			if(($scope.autoPlayEpisodeIndex + 1) === $scope.series.seasons[$scope.autoPlaySeasonIndex].episodes.length) { 
				//makes sure the season exist before player next video
				if ($scope.activeEpisode.season_num < $scope.series.seasons.length){ 
					$scope.autoPlaySeasonIndex = $scope.autoPlaySeasonIndex + 1;
					console.log("Season is done - play next Season Index - " + $scope.autoPlaySeasonIndex );
					$scope.playVideo($scope.series.seasons[$scope.autoPlaySeasonIndex].episodes[0]); //plays the first episode in the next season					
				}else{
					console.log("*** G.O.A.T - SEASON IS COMPLETE ***");
				}
			}else { 
				console.log("Playing next Episode in current season");
				$scope.playVideo($scope.series.seasons[$scope.autoPlaySeasonIndex].episodes[$scope.autoPlayEpisodeIndex + 1]);  //plays next video /index for the next video is the current video
			}
		}
	});
	
	//Check if current video playing matches passed value
	$scope.checkActiveVideo = function(val){
		return val === $scope.activeEpisodeUrl;
	};
	
	//changes the current active season
	$scope.changeSeason = function(val){
		$scope.activeSeason = $scope.series.seasons[(val - 1)];
	};
});



/* auto run functions in angular
app.run(function ($rootScope, $location) {
    $rootScope.$on('$locationChangeSuccess', function ($scope) {
    	$scope.activeUrl = $location.absUrl();
        console.log('$locationChangeSuccess changed!', new Date());
    });
}); */