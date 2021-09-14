package no.hvl.dat250.dao;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Consumer;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import no.hvl.dat250.model.UserAccount;

public class UserDAO implements Dao<UserAccount> {
    
    private EntityManager entityManager;
    
    public UserDAO(EntityManager entityManager) {
    	this.entityManager = entityManager;
    }
    
    @Override
    public Optional<UserAccount> get(long id) {
        return Optional.ofNullable(entityManager.find(UserAccount.class, id));
    }
    
    @Override
    public List<UserAccount> getAll() {
        Query query = entityManager.createQuery("SELECT e FROM User e");
        return query.getResultList();
    }
    
    @Override
    public void save(UserAccount user) {
        executeInsideTransaction(entityManager -> entityManager.persist(user));
    }
    
    @Override
    public void update(UserAccount user, Object[] params) {
    	
        user.setUsername((String) Objects.requireNonNull(params[0], "Name cannot be null"));
        user.setEmail((String) Objects.requireNonNull(params[1], "Email cannot be null"));
        user.setPassword((String) Objects.requireNonNull(params[3], "Password cannot be null"));
        user.setAdmin((boolean) Objects.requireNonNull(params[1], "Admin cannot be null"));
        executeInsideTransaction(entityManager -> entityManager.merge(user));
    }
    
    @Override 
    public void delete(UserAccount user) {
        executeInsideTransaction(entityManager -> entityManager.remove(user));
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