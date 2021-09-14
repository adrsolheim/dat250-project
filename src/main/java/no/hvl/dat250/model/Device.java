package no.hvl.dat250.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Device {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private int yesVote;
	private int noVote;
	
	public int getYesVote() {
		return this.yesVote;
	}
	
	public void setYesVote(int yesVote) {
		this.yesVote = yesVote;
	}
	
	public int getNoVote() {
		return this.noVote;
	}
	
	public void setNoVote(int noVote) {
		this.noVote = noVote;
	}
	
	@Override
	public String toString() {
		return "Device [id=" + id + ", yesVote=" + yesVote + ", noVote=" + noVote + "]";
	}
}