package no.hvl.dat250.controller;

import no.hvl.dat250.dao.UserDAO;
import no.hvl.dat250.model.UserAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserAccountController {

    @Autowired
    private UserDAO userDAO;

    @GetMapping("/users")
    public List<UserAccount> users() {
        return userDAO.getAll();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Object> user(@PathVariable long id) {
        Optional<UserAccount> user = userDAO.get(id);
        if(!user.isPresent()) {
            return new ResponseEntity<>("user not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.FOUND);
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createuser(@RequestBody UserAccount user) {
        userDAO.save(user);
        return new ResponseEntity<>("User created successfully!", HttpStatus.CREATED);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<Object> updateuser(@PathVariable("id") long id, @RequestBody UserAccount user) {
        Optional<UserAccount> dbuser = userDAO.get(id);
        if(!dbuser.isPresent()) {
            return new ResponseEntity<>("Could not update. user does not exist", HttpStatus.NOT_FOUND);
        }
        Object[] params = {user.getUsername(), user.getEmail(), user.getPassword(), user.isAdmin()};
        userDAO.update(dbuser.get(), params);
        return new ResponseEntity<>("User successfully updated!", HttpStatus.ACCEPTED);
    }

}
