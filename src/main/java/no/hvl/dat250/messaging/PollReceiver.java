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

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

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
	private static final String MONGO_URI = "mongodb://localhost:27017";
	private static final String DWEET_GUID = "a4435486-dc8a-4ca2-92b3-ce93a0abfaa6";
	
	/**
	 * PollReceiver retrieves messages sent by PollSender and
	 * forwards the messages to the database, dweet.io and connected
	 * IoT devices to the poll.
	 * @throws Exception
	 */
	public PollReceiver() throws Exception {
		
		// Disable DEBUG and INFO messages
		LoggerContext loggerContext = (LoggerContext)LoggerFactory.getILoggerFactory();
		loggerContext.getLogger("org.mongodb.driver").setLevel(Level.ERROR);
		
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
			notifyDevices();
		};
		
		channel.basicConsume(queueName, true, deliverCallback, consumerTag -> { });
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
	
	/**
	 * Forwards a JSON String of a poll result to Dweet.io
	 * @param message String representation of a JSON object
	 * @return Boolean if the operation was successful
	 */
	private static Boolean forwardDweet(String message) {
		
		HttpURLConnection connection = null;
		
		try {
			URL url = new URL("https://dweet.io:443/dweet/for/" + DWEET_GUID);
			connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("POST");
			connection.setRequestProperty("Content-Type", "application/json; utf-8");
			connection.setRequestProperty("Accept", "application/json");
			connection.setDoOutput(true);
			
			try(OutputStream os = connection.getOutputStream()) {
				byte[] input = message.getBytes("utf-8");
				os.write(input, 0, input.length);
			}
			try(BufferedReader br = new BufferedReader(
				new InputStreamReader(connection.getInputStream(), "utf-8"))) {
				StringBuilder response = new StringBuilder();
				String responseLine = null;
				
				while ((responseLine = br.readLine()) != null) {
					response.append(responseLine.trim());
				}
				System.out.println(" [+] Dweet transaction completed successfully with response: " + response);
				}
			return true;
		} catch(Exception e) {
			System.err.println(" [-] Dweet transaction failed with error: " + e);
			return false;
		}
	}
	
	// TODO Notify all connected IoT devices to the poll that it is closed
	private static void notifyDevices() {
		
	}
}
