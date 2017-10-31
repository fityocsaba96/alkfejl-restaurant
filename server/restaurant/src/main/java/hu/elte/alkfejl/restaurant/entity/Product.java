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
public class Product extends BaseEntity{

    @Column(length = 50)
    private String Name;

    @Column(length = 300)
    private String description;

    @Column
    private Short price;

    @ManyToOne
    @JoinColumn
    private Category category;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "product")
    private List<Review> reviews;
}
