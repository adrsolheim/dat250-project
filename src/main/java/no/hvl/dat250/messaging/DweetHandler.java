package no.hvl.dat250.messaging;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;

import org.json.simple.JSONObject;

import no.hvl.dat250.model.Poll;

/**
 * DweetHandler class to send poll start/end event messages to Dweet.io
 * 
 * @author Anders
 */
public class DweetHandler {

	private static final String DWEET_GUID = "a4435486-dc8a-4ca2-92b3-ce93a0abfaa6";
	
	public DweetHandler() {
		
	}
	
	/**
	 * Sends a message to dweet.io that the poll has been started
	 * with some additional useful information
	 * @param Poll poll that is started
	 * @return Boolean true/false if the operation was succesful
	 */
	public Boolean pollStartEvent(Poll poll) {
		
		String message = startEventFormat(poll);
		
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
				System.out.println(" [+] Dweet poll start event completed successfully with response: " + response);
				}
			return true;
		} catch(Exception e) {
			System.err.println(" [-] Dweet poll start event failed with error: " + e);
			return false;
		}
	}
	
	/**
	 * Sends a message to dweet.io that the poll has been finished
	 * with some additional useful information
	 * @param Poll poll that is finished
	 * @return Boolean true/false if the operation was successful
	 */
	public Boolean pollEndEvent(Poll poll) {
		
		String message = endEventFormat(poll);
		
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
				System.out.println(" [+] Dweet poll end event completed successfully with response: " + response);
				}
			return true;
		} catch(Exception e) {
			System.err.println(" [-] Dweet poll end event failed with error: " + e);
			return false;
		}
	}
	
	/**
	 * Helper method that formats a poll object into a JSON String with 
	 * the desired info for poll start events.
	 * 
	 * @param Poll poll that you wish to format for the event
	 * @return String representation of JSON-object
	 */
	@SuppressWarnings("unchecked")
	private static String startEventFormat(Poll poll) {
		
		JSONObject json = new JSONObject();
		
		json.put("event", "pollstart");
		json.put("question", poll.getQuestion());
		json.put("code", poll.getCode());
		json.put("duration", poll.getDuration());
		
		return (json.toJSONString());
	}
	
	/**
	 * Helper method that formats a poll object into a JSON String with 
	 * the desired info for poll end events.
	 * 
	 * @param Poll poll that you wish to format for the event
	 * @return String representation of JSON-object
	 */
	@SuppressWarnings("unchecked")
	private static String endEventFormat(Poll poll) {
		
		JSONObject json = new JSONObject();
		
		json.put("event", "pollend");
		json.put("question", poll.getQuestion());
		json.put("Yes-votes", poll.getYesVote());
		json.put("No-votes", poll.getNoVote());
		
		return (json.toJSONString());
	}
}
