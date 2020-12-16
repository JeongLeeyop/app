package com.example.app.repository;

import com.example.app.model.domain.section.Task;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {
    public List<Task> findTaskBy_class_ClassIdx(Long classIdx);

    @Query("DELETE FROM Task t where t._class.classIdx = ?1")
    @Transactional
    @Modifying
    public void DelTaskByClassIdx(Long ClassIdx);

    @Query("select t from Task t where t._class.classIdx = ?1 Order By t.taskIdx")
    public List<Task> findTaskByClassIdx(Long curClassIdx);

    @Transactional
    @Modifying
    @Query("update Task t set t.maxScore = ?2 where t.taskIdx=?1")
    public void updateMaxScore(Long taskIdx, Double maxScore);


}
