package hu.elte.alkfejl.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Review extends BaseEntity {

    @Column
    private Timestamp createDate;

    @Column
    private Byte stars;

    @Column(length = 300)
    private String description;

    @ManyToOne
    @JoinColumn
    private User user;

    @ManyToOne
    @JoinColumn
    private Product product;
}
