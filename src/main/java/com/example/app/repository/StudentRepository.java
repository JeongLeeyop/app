package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Student;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StudentRepository extends CrudRepository<Student, Long> {

    @Query("select s from Student s where s.account = ?1 order by s.studentIdx")
    public List<Student> findStudentByAccount(Account account);
}
