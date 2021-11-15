package no.hvl.dat250.messaging;

import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;


public class PollSender {

	private static final String EXCHANGE = "polls";
	private static final String HOST = "localhost";
	
	private ConnectionFactory factory;
	
	public PollSender() {
		this.factory = new ConnectionFactory();
		this.factory.setHost(HOST);
	}
	
	public void sendResult(String message) throws Exception {
		
		try (Connection connection = this.factory.newConnection();
				Channel channel = connection.createChannel()) {
				channel.exchangeDeclare(EXCHANGE, "fanout");
				
				channel.basicPublish(EXCHANGE, "", null, message.getBytes("UTF-8"));
				System.out.println(" [x] Sent '" + message + "'");
		}
	}
}
