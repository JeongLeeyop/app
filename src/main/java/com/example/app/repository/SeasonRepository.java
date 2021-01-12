package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.AuthClass;
import com.example.app.model.domain.School;
import com.example.app.model.domain.Season;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface
SeasonRepository extends CrudRepository<Season, Long> {
    public List<Season> findSeasonBySchoolOrderBySeasonIdx(School school);

    public Season findSeasonBySeasonIdx(Long seasonId);

    public Season findFirstBySchoolOrderBySeasonIdxDesc(School school);

    public List<Season> findBySchool(School school);
}
