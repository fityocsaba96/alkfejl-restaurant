package hu.elte.alkfejl.restaurant.service;

import hu.elte.alkfejl.restaurant.entity.Status;
import hu.elte.alkfejl.restaurant.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StatusService {

    private StatusRepository statusRepository;

    @Autowired
    public StatusService(StatusRepository statusRepository) {
        this.statusRepository = statusRepository;
    }

    public Iterable<Status> list() {
        return statusRepository.findAll();
    }

    public Status findOne(Long id) {
        return statusRepository.findOne(id);
    }
}
