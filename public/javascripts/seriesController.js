app.controller('seriesController', function($scope, $routeParams, cfpLoadingBar){
		
	console.log($routeParams.seriesname);
	
	//sets webService for series info
	var apiRoute = apiRoutes.controllers.SeriesAction.getSeries($routeParams.seriesname);
	
	//initiates Loadingbar
	cfpLoadingBar.start();
	
	//calls service for json files
	apiRoute.ajax().done(function(result) {
		if (result == "Error - Result is empty!") {
			console.log("redirect");
			$scope.$evalAsync(cfpLoadingBar.complete()); //stops loading bar
		} else {
			$scope.series = result;
			console.log($scope.series);
			$scope.$evalAsync(cfpLoadingBar.complete()); //stops loading bar
		}
	}).fail(function(res) {
		console.log("Failed - " + res);
	});
	
});