package hu.elte.alkfejl.restaurant.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class City extends BaseEntity{

    @Column(length = 30)
    private String name;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "city")
    private List<User> users;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "city")
    private List<Restaurant> restaurants;
}
