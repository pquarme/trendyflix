package controllers;

import java.util.List;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.text.json.JsonContext;
import com.avaje.ebean.text.json.JsonWriteOptions;

import models.Series;
import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

public class SeriesAction extends Controller {

	public static Result getSeries(String seriesName){
		
		Logger.info("*** SeriesAction ***");
		Series series = Series.find.where().ieq("replace(series_name,' ','')", seriesName).findUnique(); // 'replace() replaces white space in string
		
		if(series == null){
			Logger.info("Error : Query = Series -> " + seriesName);
			return ok("Error - Result is empty!");
		}
		
		Logger.info("Series : " + series.name + " + Seasons : " + series.seasons.size());
		
		//Returns only specific fields
		JsonContext jsonContext = Ebean.createJsonContext();
		JsonWriteOptions options = new JsonWriteOptions();
		options.setRootPathProperties("name,description,poster,rating,seasons,social,genre");
		options.setPathProperties("seasons", "poster,season_num");
		options.setPathProperties("social", "website,twitter,facebook,instagram");
		options.setPathProperties("genre", "genre_id");
		return ok(jsonContext.toJsonString(series, true, options)).as("application/json");
	}

}