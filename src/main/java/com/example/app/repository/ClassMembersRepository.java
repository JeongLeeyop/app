package com.example.app.repository;

import com.example.app.model.domain.ClassMembers;
import org.hibernate.annotations.SQLInsert;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface ClassMembersRepository extends CrudRepository<ClassMembers, Long> {

    @Query("DELETE FROM ClassMembers c where c.authClass.authClassIdx = ?1")
    @Transactional
    @Modifying
    public void DelClassMembersByAuthClassIdx(Long authClassIdx);

    //AuthStudent로 삭제
    @Transactional
    @Modifying
    public void deleteByAuthStudent_AuthStudentIdx(Long authStudentIdx);

    //AuthClass로 찾기
    public List<ClassMembers> findByAuthClass_AuthClassIdx(Long authClassIdx, Sort sort);


}
