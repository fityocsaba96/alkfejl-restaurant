package hu.elte.alkfejl.restaurant.controller;

import hu.elte.alkfejl.restaurant.service.annotation.Role;
import hu.elte.alkfejl.restaurant.entity.User;
import hu.elte.alkfejl.restaurant.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static hu.elte.alkfejl.restaurant.entity.User.Role.ADMIN;
import static hu.elte.alkfejl.restaurant.entity.User.Role.GUEST;
import static hu.elte.alkfejl.restaurant.entity.User.Role.USER;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Role({ADMIN, USER})
    @GetMapping("/me")
    private ResponseEntity<User> read() {
        User read = userService.read();
        return ResponseEntity.ok(read);
    }

    @Role({ADMIN, USER})
    @PutMapping("/me")
    private ResponseEntity<User> update(@RequestBody @Valid User user) {
        try {
            User updated = userService.update(user);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Role(GUEST)
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody @Valid User user) {
        try {
            User registered = userService.register(user);
            return ResponseEntity.ok(registered);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Role(GUEST)
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.login(user));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
