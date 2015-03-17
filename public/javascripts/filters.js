//removes white spaces
app.filter('removeSpaces', function(){
	return function (txt) {
		var str = txt.replace(/\s+/g, '');
		return str;
	};
});


// Returns genre name based on id
app.filter('checkGenre', function(){	
	var genreList = {
		    1: "Action",
		    2: "Animation",
		    3: "Comedy",
		    4: "Drama",
		    5: "Fantasy",
		    6: "Horror",
		    7: "Musical",
		    8: "Mystery",
		    9: "Reality",
		    10: "Sci-Fi",
		    11: "Thriller",
		    12: "Romance",
		    13: "Documentary"
		  };
	
	return function (txt) {
		return genreList[txt];
	};
});


//Returns genre id based on id
app.filter('checkGenreId', function(){	
	var genreList = {
		    1: "action",
		    2: "animation",
		    3: "comedy",
		    4: "drama",
		    5: "fantasy",
		    6: "horror",
		    7: "musical",
		    8: "mystery",
		    9: "reality",
		    10: "scifi",
		    11: "thriller",
		    12: "romance",
		    13: "documentary"
		  };
	
	return function (txt) {
		for(var key in genreList){
			if(genreList[key] == txt){
				return key;
			}
		}
	};
});

// Returns star rating
app.filter('starRating',['$sce', function($sce){
	var fl = "<i class=\"fa fa-star\"></i>";  // full star
	var emp = "<i class=\"fa fa-star-o\"></i>"; // empty star
	var hlf = "<i class=\"fa fa-star-half-full\"></i>"; // half star
	
	/*var starList = {
			1:   fl + emp + emp + emp + emp,
			1.5: fl + hlf + emp + emp + emp,
			2:   fl + fl + emp + emp + emp,
			2.5: fl + fl + hlf + emp + emp,
			3:   fl + fl + fl + emp + emp,
			3.5: fl + fl + fl + hlf + emp,
			4:   fl + fl + fl + fl + emp,
			4.5: fl + fl + fl + fl + hlf,
			5:   fl + fl + fl + fl + fl
	};*/
	
	return function (val) {
		//return $sce.trustAsHtml(starList[txt]);
		var star = '' ;
		var minus = true;
		var count = 0;

		while(minus){
		    if( val > .9){ //add a full star
		        val = val - 1;
		        star = star + fl ;
		        count = count +1;       
		    }else if(val != 0){  //add half a star
		        star = star + hlf;
		        count = count +1;
		    minus = false;
		    } else{ //exit loop
		    minus = false;
		    }
		}

		//add empty stars
		while(count != 5){
		   star = star + emp;   
		    count = count + 1;
		}
		
		return star;
		};
}]);