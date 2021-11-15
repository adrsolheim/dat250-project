package no.hvl.dat250.messaging;

public class Client {
	
	public static void main(String[] args) throws Exception {
		
		PollSender sender = new PollSender();
		
		String jsonString = "{'test1':'value1','test2':{'id':0,'name':'testName'}}";
		
		sender.sendResult(jsonString);
	}
}
