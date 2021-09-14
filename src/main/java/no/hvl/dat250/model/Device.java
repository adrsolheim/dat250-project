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
	private int yes;
	private int no;
	
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
	
	@Override
	public String toString() {
		return "Device [id=" + id + ", yes=" + yes + ", no=" + no + "]";
	}
}