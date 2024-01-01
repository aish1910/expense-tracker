package com.expense.tracker.controller;

import com.expense.tracker.domain.Category;
import com.expense.tracker.repository.CategoryRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/v1/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryRepository categoryRepository;

    @GetMapping
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Category> getCategory(@PathVariable("id") Long id) {
        return categoryRepository.findById(id);
    }

    @GetMapping(params = "name")
    public Category getCategoryByName(@RequestParam("name") String name) {
        return categoryRepository.findByName(name);
    }

    @PostMapping
    public Category create(@Valid @RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @PutMapping("/{id}")
    public Category update(@PathVariable("id") Long id, @Valid @RequestBody Category category) {
        return categoryRepository.save(category);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") Long id) {
        categoryRepository.deleteById(id);
    }
}
