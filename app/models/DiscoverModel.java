package models;

import java.util.List;

import javax.persistence.Entity;

import play.db.ebean.Model;

@SuppressWarnings("serial")
@Entity
public class DiscoverModel extends Model {
	public List<Series> series;
	
	public int rowCount;
}
