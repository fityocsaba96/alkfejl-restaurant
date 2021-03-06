package hu.elte.alkfejl.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@Table(name = "`ORDER`")
public class Order extends BaseEntity {

    @Column
    private Timestamp createDate;

    @Column(length = 100)
    private String note;

    @ManyToOne
    @JoinColumn
    private User user;

    @NotNull
    @ManyToOne
    @JoinColumn
    private Status status;
}
