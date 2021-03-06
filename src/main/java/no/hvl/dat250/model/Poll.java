package no.hvl.dat250.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@Entity
public class Poll {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String question;
	private int yesVote;
	private int noVote;
	private boolean isPublic;
	private String code;
	private int duration;
	private String email;
	
	@OneToMany(
			mappedBy = "poll",
			fetch = FetchType.LAZY,
			cascade = CascadeType.ALL
	)
	@JsonIgnoreProperties({"yesVote", "noVote", "poll"})
	private transient List<Device> deviceList;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isPublic() {
		return isPublic;
	}

	public void setPublic(boolean aPublic) {
		isPublic = aPublic;
	}

	public List<Device> getDeviceList() {
		return deviceList;
	}

	public void setDeviceList(List<Device> deviceList) {
		this.deviceList = deviceList;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getQuestion() {
		return this.question;
	}
	
	public void setQuestion(String question) {
		this.question = question;
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
		this.duration =   duration;
	}
	
	@Override
	public String toString() {
		return "Poll [id=" + id + ", question=" + question + ", yesVote=" + yesVote + 
				", noVote=" + noVote + ", public=" + isPublic + ", code=" + code + ", "
						+ "duration=" + duration + ", email=" + email + "]";
	}

}
