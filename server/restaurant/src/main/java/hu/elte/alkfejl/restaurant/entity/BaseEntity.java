package hu.elte.alkfejl.restaurant.entity;

import lombok.Data;
import javax.persistence.*;

@Data
@MappedSuperclass
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
