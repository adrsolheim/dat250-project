package no.hvl.dat250.model;

import static org.junit.Assert.*;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

public class PollTest {

	
	Poll testpoll = new Poll();
	Device device = new Device();
	
	@Before
	public void setUp() throws Exception {
		
		testpoll.setId(1001L);
		testpoll.setQuestion("Dette er en test");
		testpoll.setYesVote(5);
		testpoll.setNoVote(5);
		testpoll.setPublic(false);
		testpoll.setIsPublic(false);
		testpoll.setCode("0");
		testpoll.setDuration(0);
		testpoll.setEmail("test");
		
		device.setPoll(testpoll);
		device.setYesVote(0);
		device.setNoVote(0);
		
		testpoll.setDeviceList(List.of(device));
	}

	@Test
	public void testGetId() {
		assertEquals(1001L, testpoll.getId().longValue());
	}

	@Test
	public void testSetId() {
		testpoll.setId(1002L);
		assertEquals(1002L, testpoll.getId().longValue());
	}

	@Test
	public void testIsPublic() {
		assertFalse(testpoll.isPublic());
	}

	@Test
	public void testSetPublic() {
		testpoll.setPublic(true);
		assertTrue(testpoll.isPublic());
	}

	@Test
	public void testGetDeviceList() {
		assertEquals(List.of(device), testpoll.getDeviceList());
	}

	@Test
	public void testSetDeviceList() {
		Device debug = new Device();
		testpoll.setDeviceList(List.of(debug));
		
		assertEquals(List.of(debug), testpoll.getDeviceList());
	}

	@Test
	public void testGetEmail() {
		assertEquals("test", testpoll.getEmail());
	}

	@Test
	public void testSetEmail() {
		testpoll.setEmail("test2");
		assertEquals("test2", testpoll.getEmail());
	}

	@Test
	public void testGetQuestion() {
		assertEquals("Dette er en test", testpoll.getQuestion());
	}

	@Test
	public void testSetQuestion() {
		testpoll.setQuestion("Dette er en test2");
		assertEquals("Dette er en test2", testpoll.getQuestion());
	}

	@Test
	public void testGetYesVote() {
		assertEquals(5, testpoll.getYesVote());
	}

	@Test
	public void testSetYesVote() {
		testpoll.setYesVote(10);
		assertEquals(10, testpoll.getYesVote());
	}

	@Test
	public void testGetNoVote() {
		assertEquals(5, testpoll.getNoVote());
	}

	@Test
	public void testSetNoVote() {
		testpoll.setNoVote(10);
		assertEquals(10, testpoll.getNoVote());
	}

	@Test
	public void testGetIsPublic() {
		assertFalse(testpoll.getIsPublic());
	}

	@Test
	public void testSetIsPublic() {
		testpoll.setIsPublic(true);
		assertTrue(testpoll.getIsPublic());
	}

	@Test
	public void testGetCode() {
		assertEquals("0", testpoll.getCode());
	}

	@Test
	public void testSetCode() {
		testpoll.setCode("1");
		assertEquals("1", testpoll.getCode());
	}

	@Test
	public void testGetDuration() {
		assertEquals(0, testpoll.getDuration());
	}

	@Test
	public void testSetDuration() {
		testpoll.setDuration(1);
		assertEquals(1, testpoll.getDuration());
	}

	@Test
	public void testToString() {
		assertEquals("Poll [id=1001, question=Dette er en test, yesVote=5, "
				+ "noVote=5, public=false, code=0, duration=0, email=test]",
				testpoll.toString());
	}

}
