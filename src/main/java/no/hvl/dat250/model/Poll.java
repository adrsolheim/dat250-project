package no.hvl.dat250.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Poll {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String question;
	private int yes;
	private int no;
	private boolean isPublic;
	private String code;
	private int duration;
	
	public String getQuestion() {
		return this.question;
	}
	
	public void setQuestion(String question) {
		this.question = question;
	}
	
	public int getYes() {
		return this.yes;
	}
	
	public void setYes(int yes) {
		this.yes = yes;
	}
	
	public int getNo() {
		return this.no;
	}
	
	public void setNo(int no) {
		this.no = no;
	}
	
	public boolean getIsPublic() {
		return this.isPublic;
	}
	
	public void setIsPublic(boolean isPublic) {
		this.isPublic = isPublic;
	}
	
	public String getCode() {
		return this.code;
	}
	
	public void setCode(String code) {
		this.code = code;
	}
	
	public int getDuration() {
		return this.duration;
	}
	
	public void setDuration(int duration) {
		this.duration = duration;
	}
	
	@Override
	public String toString() {
		return "Poll [id=" + id + ", question=" + question + ", yes=" + yes + 
				", no=" + no + ", public=" + isPublic + ", code=" + code + ", "
						+ "duration=" + duration + "]";
	}
}
