package hu.elte.alkfejl.restaurant.controller;

import hu.elte.alkfejl.restaurant.annotation.Role;
import hu.elte.alkfejl.restaurant.entity.Status;
import hu.elte.alkfejl.restaurant.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static hu.elte.alkfejl.restaurant.entity.User.Role.ADMIN;

@RestController
public class StatusController {

    private StatusService statusService;

    @Autowired
    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @Role(ADMIN)
    @GetMapping("/statuses")
    private ResponseEntity<Iterable<Status>> list() {
        Iterable<Status> list = statusService.list();
        return ResponseEntity.ok(list);
    }
}
