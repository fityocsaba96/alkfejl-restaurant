package hu.elte.alkfejl.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode (callSuper = true)
public class User extends BaseEntity{

    @Column(nullable = false, length = 50)
    private String email;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 60)
    private String passwordHash;

    @Column(nullable = false)
    private Short zipCode;

    @Column(nullable = false, length = 50)
    private String address;

    @Column(nullable = false, length = 12)
    private String phoneNumber;

    @Column(columnDefinition = "BOOLEAN DEFAULT FALSE", nullable = false)
    private Boolean isAdmin;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn
    private Restaurant restaurant;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn
    private City city;
}
