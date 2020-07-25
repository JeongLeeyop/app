package com.example.app.model.domain;

import lombok.*;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Cart {
    @EmbeddedId
    private CartId cartId;

    private String bookTitle;
    private String bookImg;
    private int bookPrice;
    private int qty;
    private LocalDateTime createDate;
}
