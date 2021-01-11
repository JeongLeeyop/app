package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.School;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface AccountRepository extends CrudRepository<Account, Long> {
    public Account findAccountByUserEmail(String email);

    //학교로 계정 찾기
    @Query("Select a from Account a Where a.school = ?1 AND a.authority = 0")
    public List<Account> findAccountBySchool(School school, Sort sort);

    @Transactional
    @Modifying
    @Query("Update Account a Set a.autoSave = ?2 WHere a.userIdx = ?1")
    public int updateAutoSave(Long userIdx,int autoSave);

    //유저 찾기 (운영자가 아니면서 autoSave가 0이 아닌)
    public List<Account> findBySchoolAndAuthorityIsNotAndAutoSaveIsNot(School school,int Authority, int AutoSave);

}