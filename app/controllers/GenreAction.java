package controllers;

import java.util.List;

import models.DiscoverModel;
import models.Series;
import play.Logger;
import play.mvc.Controller;
import play.mvc.Result;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.text.json.JsonContext;
import com.avaje.ebean.text.json.JsonWriteOptions;

public class GenreAction extends Controller{
	
	@SuppressWarnings("unused")
	public static Result getGenre(int genreId, int pgNum){
		Logger.info("*** GenreAction ***");
		int rowCount = Series.find.where().eq("genre.genre_id", genreId).findRowCount();
		
		List<Series> series = Series.find.where().eq("genre.genre_id", genreId).findPagingList(20).getPage(pgNum).getList();
		
		for(int i =0; i < series.size(); i++){
			Logger.info("Series : "+series.get(i).name );
		}			
		
		//create a  new discover model
		DiscoverModel discover =  new DiscoverModel();
		discover.series = series;  //add series object
		discover.rowCount = rowCount; //add row count
		
		//Returns only specific fields
		JsonContext jsonContext = Ebean.createJsonContext();
		JsonWriteOptions options = new JsonWriteOptions();
		options.setRootPathProperties("series, rowCount");
		options.setPathProperties("series", "name, poster");
		return ok(jsonContext.toJsonString(discover, true, options)).as("application/json");
	}
		
}
