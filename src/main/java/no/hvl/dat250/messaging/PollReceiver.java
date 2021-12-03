package no.hvl.dat250.messaging;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertOneResult;

import org.bson.Document;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.LoggerContext;
import org.slf4j.LoggerFactory; 

/**
 * PollReceiver class for the RabbitMQ publish/subscribe messaging system
 * 
 * @author Anders
 */
public class PollReceiver {

	private static final String EXCHANGE = "polls";
	private static final String HOST = "localhost";
	private static final String MONGO_URI = "mongodb+srv://feedappadmin:feedapppass@feedapp.ajign.mongodb.net/feedapp?retryWrites=true&w=majority";
	
	/**
	 * PollReceiver retrieves messages sent by PollSender and
	 * forwards the messages to the analytics database
	 * @throws Exception
	 */
	public PollReceiver() {
		
		try {
		// Disable DEBUG and INFO messages
		LoggerContext loggerContext = (LoggerContext)LoggerFactory.getILoggerFactory();
		loggerContext.getLogger("org.mongodb.driver").setLevel(Level.ERROR);
		
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost(HOST);
		factory.setUri("amqps://uyfgdgzw:0kVf7tNkLJje_KXO5mxGnERzm3FlTqt6@hawk.rmq.cloudamqp.com/uyfgdgzw");
		Connection connection = factory.newConnection();
		Channel channel = connection.createChannel();
		
		channel.exchangeDeclare(EXCHANGE, "fanout");
		String queueName = channel.queueDeclare().getQueue();
		channel.queueBind(queueName, EXCHANGE, "");
		
		System.out.println(" [*] Receiver setup, waiting for new messages");
		
		// Message handler
		DeliverCallback deliverCallback = (consumerTag, delivery) -> {
			String message = new String(delivery.getBody(), "UTF-8");
			System.out.println(" [x] Received '" + message + "'");
			forwardDatabase(message);
		};
		
		channel.basicConsume(queueName, true, deliverCallback, consumerTag -> { });
		
		} catch (Exception e) {
			System.err.println(" [-] Receiver failed to setup with error: " + e);
		}
	}
	
	/**
	 * Forwards a JSON String of a poll result to the MongoDB database
	 * @param message String representation of a JSON object
	 * @return Boolean if the operation was successful
	 */
	private static Boolean forwardDatabase(String message) {
	
		try (MongoClient mongoClient = MongoClients.create(MONGO_URI)) {
			
			MongoDatabase database = mongoClient.getDatabase("feedapp");
			MongoCollection<Document> collection = database.getCollection("polls");
			
			Document entry = Document.parse(message);
			
			try {
				InsertOneResult result = collection.insertOne(entry);
				
				System.out.println(" [+] Database transaction completed with id: " + result.getInsertedId());
				return true;
			} catch (MongoException e) {
				System.err.println(" [-] Database transaction failed with error: " + e);
				return false;
			}
		}
	}
}
