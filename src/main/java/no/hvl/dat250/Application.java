package no.hvl.dat250;

import no.hvl.dat250.model.User;

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
        fetchUsers(em);
        em.close();
    }

    public static void fetchUsers(EntityManager em) {
        Query q = em.createQuery("select u from User u");
        List<User> userList = q.getResultList();
        if (userList.size() == 0) {
            System.out.println("Creating user..");
            em.getTransaction().begin();
            User user = new User("Bob", "bob@mail.com", "badpassword", false);
            em.persist(user);
            em.getTransaction().commit();
            q = em.createQuery("select u from User u");
            userList = q.getResultList();
        }

        for (User user : userList) {
            System.out.println(user);
        }

    }
}
