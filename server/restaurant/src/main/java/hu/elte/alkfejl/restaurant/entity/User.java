package hu.elte.alkfejl.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Email;

import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity {

    @Email(message = "Invalid email format")
    @NotNull
    @Column(length = 50, unique = true)
    private String email;

    @Size(min = 1, message = "Last name should not be blank")
    @NotNull
    @Column(length = 50)
    private String lastName;

    @Size(min = 1, message = "First name should not be blank")
    @NotNull
    @Column(length = 50)
    private String firstName;

    @Size(min = 6, message = "Password should be at least 6 characters long")
    @NotNull
    @Column(length = 60)
    private String passwordHash;

    @Min(value = 1000, message = "ZIP code should be 4 characters long")
    @Max(value = 9999, message = "ZIP code should be 4 characters long")
    @NotNull
    @Column
    private Short zipCode;

    @Size(min = 1, message = "Address should not be blank")
    @NotNull
    @Column(length = 50)
    private String address;

    @Size(min = 10, max = 12, message = "Phone number should be between 10 and 12 characters long")
    @NotNull
    @Column(length = 12)
    private String phoneNumber;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isAdmin;

    @NotNull
    @ManyToOne
    @JoinColumn
    private Restaurant restaurant;

    @NotNull
    @ManyToOne
    @JoinColumn
    private City city;

    public enum Role {
        GUEST, USER, ADMIN
    }
}
