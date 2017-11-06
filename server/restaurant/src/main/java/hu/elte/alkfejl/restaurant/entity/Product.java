package hu.elte.alkfejl.restaurant.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Product extends BaseEntity {

    @Column(length = 50)
    @NotNull
    @Size(min = 1, max = 50, message = "Name size should be 1-50 characters")
    private String name;

    @Size(max = 300, message = "Description size should be max 300 characters")
    @Column(length = 300)
    @NotNull
    private String description;

    @Column
    @NotNull
    private Short price;

    @NotNull
    @ManyToOne
    @JoinColumn
    private Category category;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    private List<Review> reviews;
}
