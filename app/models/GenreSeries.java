package models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import play.db.ebean.*;
import play.db.ebean.Model.Finder;

@SuppressWarnings("serial")
@Entity
@Table(name = "genreseries")
public class GenreSeries extends Model {
	@Id
	private int id;
		
	@ManyToOne
	@JoinColumn(name = "series_id")
	@JsonIgnore
	public Series series;
	
	public int genre_id;
	
	public static Finder<Long, GenreSeries> find = new Finder<Long, GenreSeries>(
			Long.class, GenreSeries.class);
}
