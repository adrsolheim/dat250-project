package no.hvl.dat250;

//import no.hvl.dat250.model.User;
import no.hvl.dat250.model.*;
import no.hvl.dat250.dao.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Query;
import java.util.List;

public class Application {
    private static final String PERSISTENCE_UNIT_NAME = "feedapp";
    private static EntityManagerFactory factory;

    public static void main(String[] args) {
        factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
        EntityManager em = factory.createEntityManager();
        
        // fetchUsers(em);
        fetchAll(em);
        
        em.close();
    }

    public static void fetchUsers(EntityManager em) {
        Query q = em.createQuery("select u from UserAccount u");
        List<UserAccount> userList = q.getResultList();
        if (userList.size() == 0) {
            System.out.println("Creating user..");
            em.getTransaction().begin();
            UserAccount user = new UserAccount();
            user.setUsername("Bob");
            user.setEmail("bob@mail.com");
            user.setPassword("badpassword");
            user.setAdmin(false);
            em.persist(user);
            em.getTransaction().commit();
            q = em.createQuery("select u from UserAccount u");
            userList = q.getResultList();
        }

        for (UserAccount user : userList) {
            System.out.println(user);
        }

    }
    
    public static void fetchAll(EntityManager em) {
    	
    	System.out.println("Fetching all data...");
    	 UserDAO userManager = new UserDAO(em);
         PollDAO pollManager = new PollDAO(em);
         DeviceDAO deviceManager = new DeviceDAO(em);
         
         List<UserAccount> users = userManager.getAll();
         List<Poll> polls = pollManager.getAll();
         List<Device> devices = deviceManager.getAll();
         
         for (UserAccount user : users) {
             System.out.println(user);
         }
         
         for (Poll poll : polls) {
             System.out.println(poll);
         }
         
         for (Device device : devices) {
             System.out.println(device);
         }
         
    }
}
