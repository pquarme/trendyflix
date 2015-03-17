var app = angular.module('projectEcho', [ 'ngRoute', 'ngSanitize', 'angular-loading-bar', 'infinite-scroll', 'youtube-embed', '720kb.socialshare'])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
  }]);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/discover', {
		templateUrl : '/assets/partials/discover.html',
		controller : 'discoverController'
	}).when('/genre', {
		templateUrl : '/assets/partials/genre.html'
	}).when('/genre/:genreid', {
		templateUrl : '/assets/partials/discover.html',
		controller : 'genreController'
	}).when('/series/:seriesname', {
		templateUrl : '/assets/partials/series.html',
		controller : 'seriesController'
	}).when('/watch/:seriesname', {
		templateUrl : '/assets/partials/watchseries.html',
		controller : 'watchController',
		reloadOnSearch : false
	}).when('/search', {
		templateUrl : '/assets/partials/discover.html',
		controller : 'searchController'
	}).otherwise({
		redirectTo : '/discover'
	});

	// configure html5 to get links working
	// If you don't do this, you URLs will be base.com/#/home rather than
	// base.com/home
	$locationProvider.html5Mode(true);
});



//nav controller
app.controller('navController', function($scope, $location) {
	// changes class for the nav link that is active
	$scope.navClass = function(page) {
		//alert($scope.currentPage);
		return page === $location.path();
	};
	
	// when user search for a webseries
	$scope.search = function(){
		if(typeof $scope.searchQuery != 'undefined'){
			$location.path("/search");
			$location.search("q", $scope.searchQuery);
			console.log("Searching ----- " + $scope.searchQuery);
		}
	};
});
