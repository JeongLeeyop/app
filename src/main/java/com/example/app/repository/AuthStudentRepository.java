package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.AuthClass;
import com.example.app.model.domain.AuthStudent;
import com.example.app.model.domain.Season;
import com.example.app.model.dto.response.repository.AuthClassMapping;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface
AuthStudentRepository extends CrudRepository<AuthStudent, Long> {

    public List<AuthStudent> findAuthStudentBySeason_SeasonIdxAndAccount(Long seasonIdx,Account account);
}
