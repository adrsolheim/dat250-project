package no.hvl.dat250.controller;

import java.util.List;

import org.apache.http.HttpStatus;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import no.hvl.dat250.Application;
import no.hvl.dat250.model.Poll;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = Application.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class PollControllerTest {

	Poll testpoll;
	
	@LocalServerPort
	private int port;
	
	@Before
	public void setUp() throws Exception {
		
		RestAssured.port = port;
		
		testpoll = new Poll();
		testpoll.setQuestion("This is a RestAssured test");
		testpoll.setYesVote(5);
		testpoll.setNoVote(5);
		testpoll.setPublic(false);
		testpoll.setIsPublic(false);
		testpoll.setCode("0");
		testpoll.setDuration(0);
		testpoll.setEmail("test@restassured.no");
		testpoll.setDeviceList(List.of());
	}

	@Test
	public void testPolls() {
		
		when().
				get("/api/polls").
		then().
				statusCode(HttpStatus.SC_OK).
				contentType(ContentType.JSON).
				body("id", hasItems(1001, 1002, 1003, 1004));
	}

	@Test
	public void testPoll() {

		when().
				get("/api/polls/{id}", 1001).
		then().
				statusCode(HttpStatus.SC_MOVED_TEMPORARILY).
				contentType(ContentType.JSON).
				body("question", is("Ananas på pizza?")).
				body("id", is(1001));
	}

	@Test
	public void testPollForUser() {

		when().
				get("/api/polls/user/{email}", "andsim@uib.no").
		then().
				statusCode(HttpStatus.SC_MOVED_TEMPORARILY).
				contentType(ContentType.JSON).
				body("id", hasItems(1001, 1005)).
				body("question", hasItems("Ananas på pizza?", "Har du høydeskrekk?"));
	}

	@Test
	public void testPollEnd() {

		when().
				put("/api/polls/finish/{id}", 1001).
		then().
				statusCode(HttpStatus.SC_ACCEPTED).
				contentType(ContentType.TEXT).
				assertThat().
				body(equalTo("Poll finished successfully!"));
	}

	@Test
	public void testPollStart() {

		when().
				put("/api/polls/start/{id}", 1002).
		then().
				statusCode(HttpStatus.SC_ACCEPTED).
				contentType(ContentType.TEXT).
				assertThat().
				body(equalTo("Poll start event sent successfully!"));
	}

	@Test
	public void testUpdatePoll() {
		
		given().
				contentType("application/json").
				body(testpoll).
		when().
				put("/api/polls/{id}", 1004).
		then().
				statusCode(HttpStatus.SC_ACCEPTED).
				contentType(ContentType.TEXT).
				assertThat().
				body(equalTo("Poll successfully updated!"));
				
	}
	@Test
	public void testCreatePoll() {
		
		testpoll.setId(1420L);
		
		given().
				contentType("application/json").
				body(testpoll).
		when().
				post("/api/polls").
		then().
				statusCode(HttpStatus.SC_CREATED).
				contentType(ContentType.TEXT).
				assertThat().
				body(equalTo("Poll is created successfully!"));
	}

	@Test
	public void testDeletePoll() {
		
		when().
				delete("/api/polls/{id}", 1420).
		then().
				statusCode(HttpStatus.SC_ACCEPTED).
				contentType(ContentType.TEXT).
				assertThat().
				body(equalTo("Poll successfully deleted!"));
	}

	@Test
	public void testVoteYes() {

		when().
				put("/api/polls/{id}/yes", 1001).
		then().
				statusCode(HttpStatus.SC_ACCEPTED).
				contentType(ContentType.TEXT).
				assertThat().
				body(equalTo("You voted 'Yes'"));
	}

	@Test
	public void testVoteNo() {
		
		when().
				put("/api/polls/{id}/no", 1001).
		then().
				statusCode(HttpStatus.SC_ACCEPTED).
				contentType(ContentType.TEXT).
				assertThat().
				body(equalTo("You voted 'No'"));
	}
}
