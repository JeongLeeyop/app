package com.example.app.repository;

import com.example.app.model.domain.Account;
import com.example.app.model.domain.Class;
import com.example.app.model.domain.section.ClassDefaultTask;
import com.example.app.model.domain.section.TaskItemInfo;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface ClassDefaultTaskRepository extends CrudRepository<ClassDefaultTask, Long> {
    public List<ClassDefaultTask> findClassDefaultTaskBy_class_ClassIdx(Long classIdx);

    @Query("delete from ClassDefaultTask d where d.TaskItemInfo.taskItemInfoIdx = ?1")
    @Transactional
    @Modifying
    public void deleteClassDefaultTaskByTaskItemInfoIdx(Long taskItemInfoIdx);

    @Query("delete from ClassDefaultTask d where d._class.classIdx = ?1")
    @Transactional
    @Modifying
    public void ClassDefaultTaskByClassIdx(Long ClassIdx);
}
