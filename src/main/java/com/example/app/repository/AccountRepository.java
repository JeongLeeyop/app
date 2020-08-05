package com.example.app.repository;

import com.example.app.model.domain.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Long> {
    public Account findAccountByUserEmail(String email);
}
