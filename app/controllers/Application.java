package controllers;

import play.*;
import play.mvc.*;
import views.html.main;


public class Application extends Controller {

	public static Result index(String any) {
		return ok(main.render());
	}

	// javascript routes for json data
	public static Result apiRoutes() {
		response().setContentType("text/javascript");
		return ok(Routes.javascriptRouter("apiRoutes", 
				controllers.routes.javascript.DiscoverAction.getDiscover(),
				controllers.routes.javascript.SeriesAction.getSeries(),
				controllers.routes.javascript.EpisodesAction.getEpisodes(),
				controllers.routes.javascript.GenreAction.getGenre(),
				controllers.routes.javascript.SearchAction.getSearch()
				));
	}
}
