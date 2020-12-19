package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.AuthClass;
import com.example.app.model.domain.Season;
import com.example.app.model.dto.response.repository.AuthClassMapping;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

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
            "from AuthClass a join Class c on a._class.classIdx = c.classIdx where a.account.userIdx=?1 and c.season.seasonIdx=?2")
    public List<AuthClassMapping> findAuthClassByAccountAndSeason(Long account, Long season);
}
