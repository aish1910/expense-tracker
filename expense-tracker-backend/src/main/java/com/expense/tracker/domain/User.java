package com.expense.tracker.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
@Builder
public class User {

    @Id
    @GeneratedValue
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Builder.Default
    @Column(name= "id")
    private Long userId = 1L;
    @Builder.Default
    private String name = "system";
    @Builder.Default
    private String email = "system@gmail.com";
//    @OneToMany
//    private Set<Category> category;

/*    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private Set<Expense> expenses = Set.of();

    private Set<Expense> getExpenses() {
        return expenses;
    }

    private void setExpenses(Set<Expense> expenses) {
        this.expenses = expenses;
    }*/
}
