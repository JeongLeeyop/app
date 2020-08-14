package com.example.app.repository;

import com.example.app.model.domain.Attendance;
import com.example.app.model.domain.Student;
import com.example.app.model.dto.response.atCountResponse;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

public interface AttendanceRepository extends CrudRepository<Attendance, Long> {

    public List<Attendance> findAllByAtDate(Timestamp date);

    public Long countByAtStateAndStudent(int i, Student student);


}

