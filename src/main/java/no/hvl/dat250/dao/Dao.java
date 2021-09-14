package no.hvl.dat250.dao;

import java.util.List;
import java.util.Optional;


/*
 * This DAO API and the other java classes implementing this API
 * is heavily based on baeldung.com's guide on how to do this.
 * Link to guide: https://www.baeldung.com/java-dao-pattern
 * this source was used on: 14.09.2021, 
 * The page was last modified on: March 21, 2020
 */

public interface Dao<T> {
    
    Optional<T> get(long id);
    
    List<T> getAll();
    
    void save(T t);
    
    void update(T t, Object[] params);
    
    void delete(T t);
}
