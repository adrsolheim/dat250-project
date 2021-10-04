package no.hvl.dat250.dao;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Consumer;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import no.hvl.dat250.model.Poll;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PollDAO implements Dao<Poll> {

    @Autowired
    private EntityManager entityManager;
    
    public PollDAO(EntityManager entityManager) {
    	//this.entityManager = entityManager;
    }
    
    @Override
    public Optional<Poll> get(long id) {
        return Optional.ofNullable(entityManager.find(Poll.class, id));
    }
    
    @Override
    public List<Poll> getAll() {
        Query query = entityManager.createQuery("select p from Poll p");
        return query.getResultList();
    }
    
    @Override
    public void save(Poll poll) {
        executeInsideTransaction(entityManager -> entityManager.persist(poll));
    }

    
    @Override
    public void update(Poll poll, Object[] params) {
    	
        poll.setQuestion((String) Objects.requireNonNull(params[0], "Question cannot be null"));
        poll.setYesVote((int) Objects.requireNonNull(params[1], "Yes vote cannot be null"));
        poll.setNoVote((int) Objects.requireNonNull(params[2], "No vote cannot be null"));
        poll.setIsPublic((boolean) Objects.requireNonNull(params[3], "isPublic cannot be null"));
        poll.setCode((String) Objects.requireNonNull(params[4], "Code cannot be null"));
        poll.setDuration((int) Objects.requireNonNull(params[5], "Duration cannot be null"));
        executeInsideTransaction(entityManager -> entityManager.merge(poll));
    }
    
    @Override 
    public void delete(Poll poll) {
        executeInsideTransaction(entityManager -> entityManager.remove(poll));
    }
    
    private void executeInsideTransaction(Consumer<EntityManager> action) {
        EntityTransaction tx = entityManager.getTransaction();
        try {
            tx.begin();
            action.accept(entityManager);
            tx.commit(); 
        }
        catch (RuntimeException e) {
            tx.rollback();
            throw e;
        }
    }
}