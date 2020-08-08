package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Student;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StudentRepository extends CrudRepository<Student, Long> {
    public List<Student> findStudentByAccount(Account account);
}
