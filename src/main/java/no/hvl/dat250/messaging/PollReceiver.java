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

public class PollReceiver {

	private static final String EXCHANGE = "polls";
	private static final String HOST = "localhost";
	private static final String MONGO_URI = "mongodb://localhost:27017";
	
	public static void main(String[] args) throws Exception {
		
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost(HOST);
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
			forwardDweet(message);
		};
		
		channel.basicConsume(queueName, true, deliverCallback, consumerTag -> { });
	}
	
	private static Boolean forwardDatabase(String message) {
	
		try (MongoClient mongoClient = MongoClients.create(MONGO_URI)) {
			
			MongoDatabase database = mongoClient.getDatabase("feedapp");
			MongoCollection<Document> collection = database.getCollection("polls");
			
			Document entry = Document.parse(message);
			
			try {
				InsertOneResult result = collection.insertOne(entry);
				
				System.out.println("Transaction completed with id: " + result.getInsertedId());
				return true;
			} catch (MongoException e) {
				System.err.println("Transaction failed with error: " + e);
				return false;
			}
		}
	}
	
	private static Boolean forwardDweet(String message) {
		
		return true;
	}
}
