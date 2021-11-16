package no.hvl.dat250.dao;

import no.hvl.dat250.model.Device;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Consumer;

public class DeviceDAO implements Dao<Device> {

    @Autowired
    private EntityManager entityManager;

    public DeviceDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Optional<Device> get(long id) {
        return Optional.ofNullable(entityManager.find(Device.class, id));
    }

    @Override
    public List<Device> getAll() {
        Query query = entityManager.createQuery("SELECT d FROM Device d");
        return query.getResultList();
    }

    @Override
    public void save(Device device) {
        executeInsideTransaction(entityManager -> entityManager.persist(device));
    }

    @Override
    public void update(Device device, Object[] params) {
        //device.setPoll((Poll) Objects.requireNonNull(params[0], "Poll cannot be null"));
        device.setYesVote((int) Objects.requireNonNull(params[0], "YesVotes cannot be null"));
        device.setNoVote((int) Objects.requireNonNull(params[1], "NoVotes cannot be null"));
        executeInsideTransaction(entityManager -> entityManager.merge(device));
    }

    @Override
    public void delete(Device device) {
        executeInsideTransaction(entityManager -> entityManager.remove(device));
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