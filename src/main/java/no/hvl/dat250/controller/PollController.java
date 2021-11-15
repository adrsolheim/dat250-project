package no.hvl.dat250.controller;

import no.hvl.dat250.dao.PollDAO;
import no.hvl.dat250.model.Poll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController("/api")
public class PollController {

    @Autowired
    private PollDAO pollDAO;

    @GetMapping("/api/polls")
    public List<Poll> polls() {
        return pollDAO.getAll();
    }

    @GetMapping("/api/polls/{id}")
    public ResponseEntity<Object> poll(@PathVariable long id) {
        Optional<Poll> poll = pollDAO.get(id);
        //return poll.orElseThrow(() -> new PollNotFoundException(
         //       String.format("User not found, id: %d",id)
        //));
        if(!poll.isPresent()) {
            return new ResponseEntity<>("Poll not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(poll, HttpStatus.FOUND);
    }

    @RequestMapping(value = "/api/polls", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createPoll(@RequestBody Poll poll) {
        pollDAO.save(poll);
        return new ResponseEntity<>("Poll is created successfully!", HttpStatus.CREATED);
    }

    @PutMapping("/api/polls/{id}")
    public ResponseEntity<Object> updatePoll(@PathVariable("id") long id, @RequestBody Poll poll) {
        Optional<Poll> dbPoll = pollDAO.get(id);
        if(!dbPoll.isPresent()) {
            return new ResponseEntity<>("Could not update. Poll does not exist", HttpStatus.NOT_FOUND);
        }
        Object[] params = {poll.getQuestion(), poll.getYesVote(), poll.getNoVote(),
                poll.getIsPublic(), poll.getCode(), poll.getDuration(), poll.getUserAccount()};
        pollDAO.update(dbPoll.get(), params);
        return new ResponseEntity<>("Poll successfully updated!", HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/api/polls/{id}")
    public ResponseEntity<Object> deletePoll(@PathVariable("id") long id) {
        Optional<Poll> dbPoll = pollDAO.get(id);
        if(!dbPoll.isPresent()) {
            return new ResponseEntity<>("Could not delete. Poll does not exist", HttpStatus.NOT_FOUND);
        }
        pollDAO.delete(dbPoll.get());
        return new ResponseEntity<>("Poll successfully deleted!", HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/polls/{id}/yes")
    public ResponseEntity<Object> voteYes(@PathVariable("id") long id) {
        Optional<Poll> dbPoll = pollDAO.get(id);
        if(!dbPoll.isPresent()) {
            return new ResponseEntity<>("Could not update. Poll does not exist", HttpStatus.NOT_FOUND);
        }
        Poll poll = dbPoll.get();
        Object[] params = {poll.getQuestion(), poll.getYesVote() + 1, poll.getNoVote(),
                poll.getIsPublic(), poll.getCode(), poll.getDuration(), poll.getUserAccount()};
        pollDAO.update(dbPoll.get(), params);
        return new ResponseEntity<>("You voted 'Yes'", HttpStatus.ACCEPTED);
    }

    @PutMapping("/api/polls/{id}/no")
    public ResponseEntity<Object> voteNo(@PathVariable("id") long id) {
        Optional<Poll> dbPoll = pollDAO.get(id);
        if(!dbPoll.isPresent()) {
            return new ResponseEntity<>("Couldn't find poll.", HttpStatus.NOT_FOUND);
        }
        Poll poll = dbPoll.get();
        Object[] params = {poll.getQuestion(), poll.getYesVote(), poll.getNoVote() + 1,
                poll.getIsPublic(), poll.getCode(), poll.getDuration(), poll.getUserAccount()};
        pollDAO.update(dbPoll.get(), params);
        return new ResponseEntity<>("You voted 'No'", HttpStatus.ACCEPTED);
    }
}

