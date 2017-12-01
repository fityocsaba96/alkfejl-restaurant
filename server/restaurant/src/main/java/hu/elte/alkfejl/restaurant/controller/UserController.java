package hu.elte.alkfejl.restaurant.controller;

import hu.elte.alkfejl.restaurant.entity.request.LoginRequest;
import hu.elte.alkfejl.restaurant.service.annotation.Role;
import hu.elte.alkfejl.restaurant.entity.User;
import hu.elte.alkfejl.restaurant.service.UserService;
import hu.elte.alkfejl.restaurant.service.validator.LoginRequestValidator;
import hu.elte.alkfejl.restaurant.service.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static hu.elte.alkfejl.restaurant.entity.User.Role.ADMIN;
import static hu.elte.alkfejl.restaurant.entity.User.Role.GUEST;
import static hu.elte.alkfejl.restaurant.entity.User.Role.USER;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;
    private UserValidator userValidator;
    private LoginRequestValidator loginRequestValidator;

    @Autowired
    public UserController(UserService userService, UserValidator userValidator, LoginRequestValidator loginRequestValidator) {
        this.userService = userService;
        this.userValidator = userValidator;
        this.loginRequestValidator = loginRequestValidator;
    }

    @InitBinder("user")
    public void setupUserValidator(WebDataBinder binder) {
        binder.addValidators(userValidator);
    }

    @InitBinder("loginRequest")
    public void setupLoginRequestValidator(WebDataBinder binder) {
        binder.addValidators(loginRequestValidator);
    }

    @Role({ADMIN, USER})
    @GetMapping("/me")
    private ResponseEntity<User> read() {
        return ResponseEntity.ok(userService.read());
    }

    @Role({ADMIN, USER})
    @PutMapping("/me")
    private ResponseEntity<User> update(@RequestBody @Valid User user) {
        return ResponseEntity.ok(userService.update(user));
    }

    @Role(GUEST)
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody @Valid User user) {
        return ResponseEntity.ok(userService.register(user));
    }

    @Role(GUEST)
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody @Valid LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.login(loginRequest));
    }

    @Role({ADMIN, USER})
    @PostMapping("/logout")
    public ResponseEntity<Boolean> logout() {
        return ResponseEntity.ok(userService.logout());
    }
}
