package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.AuthClass;
import com.example.app.model.domain.Season;
import com.example.app.model.dto.response.repository.AuthClassMapping;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface
AuthClassRepository extends CrudRepository<AuthClass, Long> {

/*    @Query("select t.task.taskIdx as task, t.student.studentIdx as student, count(t.score) as count, sum(t.score/s.maxScore*100) as sum
from Score t left outer join SectionTasks s ON t.section.sectionIdx = s.section.sectionIdx
AND t.task.taskIdx = s.task.taskIdx where t.task.taskIdx In (select ti.taskIdx from Task ti where ti._class.classIdx = ?1)
 AND t.student.studentIdx In (select s.studentIdx from Student s where s.account.userIdx = ?2)
group by t.task.taskIdx,t.student.studentIdx order by t.student.studentIdx,t.task.taskIdx")
    public List<AuthClass> findAuthClassByAccountAndSeason(Account account, long seasonIdx);*/

    @Query("select a.authClassIdx as authclass, a._class.classIdx as _class, c.className as classname, a.account.userIdx as user, a.season.seasonIdx as season " +
            "from AuthClass a join Class c on a._class.classIdx = c.classIdx where a.account.userIdx=?1 and c.season.seasonIdx=?2 order by a.authClassIdx")
    public List<AuthClassMapping> findAuthClassByAccountAndSeason(Long account, Long season);

    //클래스의 idx로 AuthClass 찾기
    public List<AuthClass> findAuthClassBy_class_ClassIdx(Long ClassIdx);

    //Auth 클래스 삭제
    @Query("DELETE FROM AuthClass a where a.authClassIdx = ?1")
    @Transactional
    @Modifying
    public void DelAuthClassByAuthClassIdx(Long AuthClassIdx);

    //account의 authStudent 카운트 세기
    public int countAllByAccountAndSeason_SeasonIdx(Account account,Long curSeasonIdx);

    public List<AuthClass> findAuthClassBySeason_SeasonIdxAndAccount(Long curSeasonIdx, Account userIdx, Sort sort);
}
