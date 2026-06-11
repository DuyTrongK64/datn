package com.duytrong.attendance.controller;

import com.duytrong.attendance.common.BaseEntity;
import com.duytrong.attendance.common.BusinessException;
import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

public abstract class SimpleCrudController<T extends BaseEntity> {
    private final JpaRepository<T, UUID> repository;

    protected SimpleCrudController(JpaRepository<T, UUID> repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<T> list() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public T get(@PathVariable UUID id) {
        return repository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy dữ liệu"));
    }

    @PostMapping
    public T create(@RequestBody T input) {
        input.setId(null);
        return repository.save(input);
    }

    @PutMapping("/{id}")
    public T update(@PathVariable UUID id, @RequestBody T input) {
        T existing = repository.findById(id).orElseThrow(() -> new BusinessException("Không tìm thấy dữ liệu"));
        BeanUtils.copyProperties(input, existing, "id", "createdAt", "updatedAt");
        return repository.save(existing);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        repository.deleteById(id);
    }
}
