package hu.elte.alkfejl.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Size;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Restaurant extends BaseEntity {

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
}
