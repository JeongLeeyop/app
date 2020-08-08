package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Class;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ClassRepository extends CrudRepository<Class, Long> {
    public List<Class> findClassByAccount(Account account);
}
