app.controller('genreController', function($scope, cfpLoadingBar, $filter, $routeParams, $location) {
	
	$scope.genreId = 0;
	$scope.genreId = $filter('checkGenreId')($routeParams.genreid);
	
	
	if(typeof $scope.genreId === 'undefined'){
		console.log($scope.genreId);
		$location.path("/genre");
	}
	
	//set the title of the age if genre exits
	$scope.pageTitle = $routeParams.genreid.toUpperCase();
	
	/* scope variables */
	$scope.isBusy = false;
	$scope.rowCount;
	$scope.pageNum = 0;
	$scope.series = [];
	
	
	//function to get next page
	$scope.getNextPage = function(){
		$scope.isBusy = true; //alerts infinite scroll 
		
		//sets webservice for discover page
		var apiRoute = apiRoutes.controllers.GenreAction.getGenre($scope.genreId, $scope.pageNum);
		
		//initiates Loadingbar
		cfpLoadingBar.start();
		
		//calls play routes for json files
		apiRoute.ajax().done(function(result){
			for(var i =0; i < result.series.length; i++){
				$scope.series.push(result.series[i]); //sets result to $scope.series	
			}
			$scope.rowCount  = result.rowCount;
			console.log($scope.series);
			$scope.$evalAsync(cfpLoadingBar.complete()); //stops loading bar
		}).fail(function(res){
			console.log("Failed - " + res);
		});
		
		if($scope.series.length === $scope.rowCount){
			$scope.isBusy = true; //ends infinite-scroll
			console.log("length ---- " + $scope.series.length);
		}else{
			$scope.pageNum = $scope.pageNum + 1; //adds one to page
			$scope.isBusy = false; //alerts infinite scroll ajax call is done
		}
		
	};
	
});
