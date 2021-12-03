package no.hvl.dat250.messaging;

import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

import com.google.gson.Gson;

import no.hvl.dat250.model.Poll;

public class PollSenderTest {

	Poll poll;
	PollSender sender;
	
	@Before
	public void setUp() throws Exception {
		poll = new Poll();
		sender = new PollSender();
		
		poll.setId(1420L);
		poll.setQuestion("This is a sender test");
		poll.setYesVote(5);
		poll.setNoVote(5);
		poll.setPublic(false);
		poll.setIsPublic(false);
		poll.setCode("0");
		poll.setDuration(0);
		poll.setEmail("test");
	}

	@Test
	public void testSendResult() {
		
		String jsonString = new Gson().toJson(poll);
		assertTrue(sender.sendResult(jsonString));
	}

}
