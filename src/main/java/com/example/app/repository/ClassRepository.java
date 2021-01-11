package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Class;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.domain.Sort;

import java.util.List;

public interface
ClassRepository extends CrudRepository<Class, Long> {
    public List<Class> findClassByAccount(Account account);

    public List<Class> findClassBySeason_SeasonIdx(Long SeasonIdx,Sort sort);

}
