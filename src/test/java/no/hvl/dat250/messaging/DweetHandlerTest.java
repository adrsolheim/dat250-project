package no.hvl.dat250.messaging;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import no.hvl.dat250.model.Poll;

public class DweetHandlerTest {

	DweetHandler handler;
	Poll poll;
	
	@Before
	public void setUp() throws Exception {
		
		handler = new DweetHandler();
		poll = new Poll();
		
		poll.setId(1420L);
		poll.setQuestion("This is a dweet test");
		poll.setYesVote(5);
		poll.setNoVote(5);
		poll.setPublic(false);
		poll.setIsPublic(false);
		poll.setCode("0");
		poll.setDuration(0);
		poll.setEmail("test");
	}

	@Test
	public void testPollStartEvent() {
		assertTrue(handler.pollStartEvent(poll));
	}

	@Test
	public void testPollEndEvent() {
		assertTrue(handler.pollEndEvent(poll));
	}

}
