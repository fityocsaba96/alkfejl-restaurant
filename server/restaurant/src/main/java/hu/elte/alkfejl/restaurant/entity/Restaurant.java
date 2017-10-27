package hu.elte.alkfejl.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Restaurant extends BaseEntity{

    @Column
    private int zipCode;

    @Column
    private String address;

    @Column
    private byte openHourWeekday;

    @Column
    private byte closeHourWeekday;

    @Column
    private byte openHourWeekend;

    @Column
    private byte closeHourWeekend;

    @Column
    private String phoneNumber;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn
    private City city;
}
