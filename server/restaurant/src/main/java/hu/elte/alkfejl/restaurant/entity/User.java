package hu.elte.alkfejl.restaurant.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @Size(min = 1, max = 50, message = "Email size should be 1-50 characters")
    @Column(length = 50, unique = true)
    private String email;

    @Size(min = 1, max = 50, message = "Last name size should be 1-50 characters")
    @NotNull
    @Column(length = 50)
    private String lastName;

    @Size(min = 1, max = 50, message = "First name size should be 1-50 characters")
    @NotNull
    @Column(length = 50)
    private String firstName;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Size(min = 6, max = 60, message = "Password size should be 6-60 characters")
    @NotNull
    @Column(length = 60)
    private String passwordHash;

    @Min(value = 1000, message = "ZIP code should be 4 characters long")
    @Max(value = 9999, message = "ZIP code should be 4 characters long")
    @NotNull
    @Column
    private Short zipCode;

    @Size(min = 1, max = 50, message = "Address size should be 1-50 characters")
    @NotNull
    @Column(length = 50)
    private String address;

    @Size(min = 10, max = 12, message = "Phone number should be 10-12 characters")
    @NotNull
    @Column(length = 12)
    private String phoneNumber;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isAdmin;

    @NotNull(message = "No restaurant selected")
    @ManyToOne
    @JoinColumn
    private Restaurant restaurant;

    @NotNull(message = "No city selected")
    @ManyToOne
    @JoinColumn
    private City city;

    public enum Role {
        GUEST, USER, ADMIN
    }
}
