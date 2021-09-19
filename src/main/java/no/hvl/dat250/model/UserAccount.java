package no.hvl.dat250.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String email;
    private String password;
    private boolean admin;
    @OneToMany(
            mappedBy = "UserAccount",
            cascade = CascadeType.ALL
    )
    List<Poll> pollList = new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }
    @Override
    public String toString() {
        return "UserAccount [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password + ", admin=" + admin;
    }
}