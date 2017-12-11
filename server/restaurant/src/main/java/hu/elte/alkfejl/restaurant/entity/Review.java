package hu.elte.alkfejl.restaurant.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.sql.Timestamp;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Review extends BaseEntity {

    @Column
    private Timestamp createDate;

    @Min(value = 1, message = "Minimum is 1 stars")
    @Max(value = 5, message = "Maximum is 5 stars")
    @NotNull(message = "No rating selected")
    @Column
    private Byte stars;

    @Size(min = 10, max = 300, message = "Description size should be 10-300 characters")
    @NotNull
    @Column(length = 300)
    private String description;

    @ManyToOne
    @JoinColumn
    private User user;

    @ManyToOne
    @JoinColumn
    private Product product;
}
