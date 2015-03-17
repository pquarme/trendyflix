package models;

import java.util.*;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import play.db.ebean.*;

@SuppressWarnings("serial")
@Entity
@Table(name = "series")
public class Series extends Model {
	
	@Id
	public int series_id;
	
	public String description;
	
	@Column(name="series_name")
	public String name;
	
	public String poster;
	
	public String rating;
	
	@OneToMany(mappedBy = "series")
	public List<Seasons> seasons;
	
	@OneToMany(mappedBy = "series")
	public List<SocialMedia> social;
	
	@OneToMany(mappedBy = "series")
	public List<GenreSeries> genre;
	
	@OneToMany(mappedBy = "series")
	public List<Episodes> episodes;
	
	public static Finder<Long, Series> find = new Finder<Long, Series>(
			Long.class, Series.class);

}
