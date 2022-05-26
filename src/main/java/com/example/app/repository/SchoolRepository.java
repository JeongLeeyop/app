package com.example.app.repository;

import com.example.app.model.domain.School;
import com.example.app.model.domain.Student;
import com.example.app.model.domain.section.Score;
import com.example.app.model.domain.section.Section;
import com.example.app.model.dto.response.repository.ScoreMapping;
import com.example.app.model.dto.response.repository.TotalGradeMapping;
import com.example.app.model.dto.response.repository.UsedTaskList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;
import java.util.List;


public interface SchoolRepository extends JpaRepository<School, Long> {

}
