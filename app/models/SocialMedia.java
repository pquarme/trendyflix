package models;

import javax.persistence.*;
import play.db.ebean.Model;
import com.fasterxml.jackson.annotation.JsonIgnore;

@SuppressWarnings("serial")
@Entity
@Table(name = "socialmedia")
public class SocialMedia extends Model{

	@Id
	private int id;
	
	public String website;
	public String twitter;
	public String facebook;
	public String instagram;
	
	@ManyToOne
	@JoinColumn(name = "series_id")
	@JsonIgnore
	public Series series;
}
