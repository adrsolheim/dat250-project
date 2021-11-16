package no.hvl.dat250.messaging;

import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;

/**
 * PollSender class for the RabbitMQ publish/subscribe messaging system
 * 
 * @author Anders
 */
public class PollSender {

	private static final String EXCHANGE = "polls";
	private static final String HOST = "localhost";
	
	private ConnectionFactory factory;
	
	/**
	 * PollSender sends String messages to the queue for the
	 * PollReceiver to retrieve and process
	 */
	public PollSender() {
		this.factory = new ConnectionFactory();
		this.factory.setHost(HOST);
		try {
			this.factory.setUri("amqps://uyfgdgzw:0kVf7tNkLJje_KXO5mxGnERzm3FlTqt6@hawk.rmq.cloudamqp.com/uyfgdgzw");
		} catch (Exception e) {
			System.err.println("Connection to CloudAMQP failed with error: " + e);
		}
	}
	
	/**
	 * Send a String message of a JSON object to the messaging queue
	 * @param message String representation of a JSON object
	 * @return Boolean if the operation was successful
	 * @throws Exception
	 */
	public Boolean sendResult(String message) {
		
		try (Connection connection = this.factory.newConnection();
				Channel channel = connection.createChannel()) {
				channel.exchangeDeclare(EXCHANGE, "fanout");
				
				channel.basicPublish(EXCHANGE, "", null, message.getBytes("UTF-8"));
				System.out.println(" [x] Sent '" + message + "'");
				return true;
		} catch (Exception e) {
			System.err.println(" [-] Sending '" + message + "' failed with error: " + e);
			return false;
		}
	}
}
