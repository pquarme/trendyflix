package models;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.*;

import play.db.ebean.Model;
import play.db.ebean.Model.Finder;

@SuppressWarnings("serial")
@Entity
@Table(name = "seasons")
public class Seasons extends Model{

	@Id
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "series_id")
	@JsonIgnore
	public Series series;
	
	public String poster;
	
	public int season_num;
	

	public List<Episodes> episodes =  new ArrayList<Episodes>();
	
}
