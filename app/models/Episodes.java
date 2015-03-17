package models;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import play.db.ebean.Model;

@SuppressWarnings("serial")
@Entity
@Table(name = "episodes")
public class Episodes extends Model{
	@Id
	private int id;
	
	public String episode_name;
	public String description;
	public String url;
	public int season_num;
	public int episode_num;
	
	@ManyToOne
	@JoinColumn(name = "series_id")
	@JsonIgnore
	public Series series;
}
