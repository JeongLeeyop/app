package com.example.app.repository;

import com.example.app.model.domain.*;
import com.example.app.model.dto.response.repository.AuthClassMapping;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface
AuthStudentRepository extends CrudRepository<AuthStudent, Long> {

    public List<AuthStudent> findAuthStudentBySeason_SeasonIdxAndAccountOrderByAuthStudentIdx(Long seasonIdx, Account account);

    public List<AuthStudent> findAuthStudentBySeason_SeasonIdxAndAccountAndAuthStudentGroupOrderByAuthStudentIdx(Long seasonIdx, Account account,String AuthStudentGroup);

    //Admin : TeacherSetting : userIdx로 AuthStudent 찾기
    public List<AuthStudent> findAuthStudentBySeason_SeasonIdxAndAccount(Long seasonIdx,Account account, Sort sort);

    //클래스의 idx로 AuthStudent 찾기
    public List<AuthStudent> findAuthStudentByStudent_StudentIdx(Long StudentIdx);

    //account의 authStudent 카운트 세기
    public int countAllByAccountAndSeason_SeasonIdx(Account account,Long curSeasonIdx);

    @Query("select s from AuthStudent s where s.account.userIdx = ?1 AND s.season.seasonIdx = ?2 AND s.authStudentIdx not In (select c.authStudent.authStudentIdx from ClassMembers c where c.authClass.authClassIdx = ?3)")
    public List<AuthStudent> findAuthStudentByAuthClassIdxWithoutClassMembers(Long userIdx,Long curSeasonIdx,Long authClassIdx, Sort sort);

    public List<AuthStudent> findAuthStudentByAccount(Account account);

    //authStudentGroup이름 찾기
    @Query("select DISTINCT a.authStudentGroup from AuthStudent a where a.season.seasonIdx=?1 AND a.account = ?2 ORDER BY a.authStudentGroup")
    public List<String> findAuthStudentGroup(Long seasonIdx, Account account);
}
