package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Student;
import org.springframework.data.repository.CrudRepository;

public interface SettingRepository extends CrudRepository<Student, Long> {
}
