package no.hvl.dat250;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import no.hvl.dat250.messaging.PollReceiver;

@SpringBootApplication
public class Application {
    private static final String PERSISTENCE_UNIT_NAME = "feedapp";
    private static EntityManagerFactory factory;

    public static void main(String[] args) {
        
        SpringApplication.run(Application.class, args);
        
        PollReceiver receiver = new PollReceiver();
    }

    @Bean
    public EntityManager getEntityManager() {
        factory = Persistence.createEntityManagerFactory(PERSISTENCE_UNIT_NAME);
        return factory.createEntityManager();
    }
}
