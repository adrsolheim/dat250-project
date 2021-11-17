package no.hvl.dat250.messaging;

/**
 * Test client for publish/subscribe messaging system
 * 
 * @author Anders
 */
public class Client {
	
	public static void main(String[] args) throws Exception {
	
		PollReceiver receiver = new PollReceiver();
		PollSender sender = new PollSender();
		
		while(true) {
		String jsonString = "{\"test1\":\"value1\",\"test2\":{\"id\":0,\"name\":\"dweetTest\"}}";
		
		sender.sendResult(jsonString);
		Thread.sleep(2500);
		}
	}
}
