package controllers;

import java.util.*;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.text.json.JsonContext;
import com.avaje.ebean.text.json.JsonWriteOptions;

import models.*;
import play.Logger;
import play.libs.Json;
import play.mvc.*;

public class EpisodesAction extends Controller {
	
	public static Result getEpisodes(String seriesName){
		
		Logger.info("*** EpisodesAction ***");
		Series series = Series.find.where().ieq("replace(series_name,' ','')", seriesName).findUnique(); // 'replace() replaces white space in string
		
		//Checks if series is null
		if(series == null){
			Logger.info("Error : Query = Series -> " + seriesName);
			return ok("Error - Result is empty!");
		}
		
		/*
		 * Put episodes into seasons
		 * @Todo need to know how merge many to many relation with ebean
		 */
		Ebean.sort(series.episodes,"episode_num asc"); //sort episode by episode number
	
		List<Seasons> seasons = series.seasons;
		List<Episodes> episodes = series.episodes;
		
		for(Episodes episode : episodes){
			seasons.get(episode.season_num - 1).episodes.add(episode);
		}
		
		Logger.info("Series : " + series.name + " + Seasons : " + series.seasons.size() + "Episodes : " + series.episodes.size());
		//Returns only specific fields
		JsonContext jsonContext = Ebean.createJsonContext();
		JsonWriteOptions options = new JsonWriteOptions();
		options.setRootPathProperties("name,description,poster,rating,seasons,genre");
		options.setPathProperties("seasons", "poster,season_num, episodes");
		options.setPathProperties("seasons.episodes", "episode_num, episode_name, description, url, season_num");
		options.setPathProperties("genre", "genre_id");
		return ok(jsonContext.toJsonString(series, true, options)).as("application/json");
	}
}
