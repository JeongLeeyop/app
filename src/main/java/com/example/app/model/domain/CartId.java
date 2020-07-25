package com.example.app.model.domain;

import lombok.*;

import javax.persistence.Embeddable;
import javax.persistence.Entity;
import java.io.Serializable;

@Setter
@EqualsAndHashCode
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CartId implements Serializable {
    private Long userIdx;
    private Long bookIdx;


}
