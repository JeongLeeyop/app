package com.example.app.repository;

import com.example.app.model.domain.section.TaskItem;
import com.example.app.model.domain.section.TaskItemInfo;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;


public interface TaskItemRepository extends CrudRepository<TaskItem, Long> {
    @Query("DELETE FROM TaskItem t where t.taskItemInfo.taskItemInfoIdx = ?1")
    @Transactional
    @Modifying
    public void DelTaskItemByTaskItemInfoIdx(Long taskItemInfoIdx);

    @Query("DELETE FROM TaskItem t where t.taskItemInfo.taskItemInfoIdx in (select i from TaskItemInfo i where i._class.classIdx = ?1)")
    @Transactional
    @Modifying
    public void DelTaskItemByClassIdx(Long ClassIdx);

}
