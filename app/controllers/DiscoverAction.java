package controllers;


import play.Logger;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import models.*;

import java.util.*;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.text.json.JsonContext;
import com.avaje.ebean.text.json.JsonWriteOptions;

public class DiscoverAction extends Controller {

		@SuppressWarnings("unused")
		public static Result getDiscover(int pgNum){
			Logger.info("*** DiscoverAction ***");
			int rowCount = Series.find.findRowCount();
			
			List<Series> series = Series.find.orderBy("series_id").findPagingList(20).getPage(pgNum).getList();
         
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
