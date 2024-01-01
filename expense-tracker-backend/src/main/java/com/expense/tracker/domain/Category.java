package com.expense.tracker.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "category")
public class Category {
    @Id
    private Long id;
    @NonNull
    private String name;
//    @ManyToOne(cascade = CascadeType.PERSIST)
//    private User user;
}
