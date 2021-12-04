package no.hvl.dat250.model;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class DeviceTest {

	Device device = new Device();
	Poll poll = new Poll();
	
	@Before
	public void setUp() throws Exception {
		
		device.setYesVote(10);
		device.setNoVote(10);
		device.setPoll(poll);
	}

	@Test
	public void testGetPoll() {
		assertEquals(poll, device.getPoll());
	}

	@Test
	public void testSetPoll() {
		Poll debug = new Poll();
		device.setPoll(debug);
		
		assertEquals(debug, device.getPoll());
	}

	@Test
	public void testGetYesVote() {
		assertEquals(10, device.getYesVote());
	}

	@Test
	public void testSetYesVote() {
		device.setYesVote(5);
		assertEquals(5, device.getYesVote());
	}

	@Test
	public void testGetNoVote() {
		assertEquals(10, device.getNoVote());
	}

	@Test
	public void testSetNoVote() {
		device.setNoVote(5);
		assertEquals(5, device.getNoVote());
	}

	@Test
	public void testToString() {
		assertEquals("Device [id=null, yesVote=10, noVote=10]", device.toString());
	}

}
