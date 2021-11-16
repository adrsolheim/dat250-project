package no.hvl.dat250.model;

import javax.persistence.*;

@Entity
public class Device {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private int yesVote;
	private int noVote;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private Poll poll;

	public Poll getPoll() {
		return poll;
	}

	public void setPoll(Poll poll) {
		this.poll = poll;
	}

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