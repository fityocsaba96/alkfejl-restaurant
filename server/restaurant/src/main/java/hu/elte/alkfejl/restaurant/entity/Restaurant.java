package hu.elte.alkfejl.restaurant.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@EqualsAndHashCode(callSuper = true)
public class Restaurant extends BaseEntity{

    @Column
    private Short zipCode;

    @Column(length = 50)
    private String address;

    @Column
    private Byte openHourWeekday;

    @Column
    private Byte closeHourWeekday;

    @Column
    private Byte openHourWeekend;

    @Column
    private Byte closeHourWeekend;

    @Column(length = 12)
    private String phoneNumber;

    @ManyToOne
    @JoinColumn
    private City city;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "restaurant")
    private List<User> users;
}
