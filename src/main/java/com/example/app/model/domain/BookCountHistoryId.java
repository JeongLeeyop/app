package com.example.app.model.domain;

import lombok.*;

import javax.persistence.Embeddable;
import java.io.Serializable;

@EqualsAndHashCode
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class BookCountHistoryId implements Serializable {
    private Long bookIdx;
    private String History;



}