package com.example.app.service;

import com.example.app.model.domain.*;
import com.example.app.model.domain.Class;
import com.example.app.model.domain.section.Section;
import com.example.app.model.domain.section.TaskItem;
import com.example.app.model.domain.section.TaskItemInfo;
import com.example.app.model.dto.response.repository.TaskItemMapping;
import com.example.app.model.dto.response.repository.UsedTaskList;
import com.example.app.model.dto.response.taskScoreResponse;
import com.example.app.repository.*;
import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.*;

@Service
public class ClassService {

    @Autowired
    ClassRepository classRepo;
    @Autowired
    SectionRepository sectionRepo;
    @Autowired
    TaskItemRepository taskItemRepo;
    @Autowired
    TaskItemInfoRepository taskItemInfoRepo;
    @Autowired
    StudentRepository studentRepo;

    @Autowired
    StudentService studentService;

    //0.전체 클래스를 조회하는 기능
    public List<Class> findClassList(HttpSession session) {
        return classRepo.findClassByAccount((Account)session.getAttribute("Account"));
    }

    //0.클래스를 조회하는 기능
    public Optional<Class> findClass(Long classIdx) {
        return classRepo.findById(classIdx);
    }

    //1. 전체 학생 목록을 출력하여 등급 항목에 과제 항목의 점수를 반영하여 조회해주는 기능
    public int findTotalGrade(int a) {
        return 0;
    }

    //2. Setting에서 설정한 클래스 등급 비율을 표시해주는 기능
    public int findSetGradeRatio(int a) {
        return 0;
    }

    // 클래스의 섹션 목록을 조회하는 기능
    public List<Section> findSectionList(Long curClassIdx) {
        List<Section> result = sectionRepo.findSectionBy_class_ClassIdx(curClassIdx);
        return result;
    }

    //3. 클래스의 섹션을 추가하는 기능
    public Section addSection(Long curClassIdx,String sectionName) {
        Class curClass = classRepo.findById(curClassIdx).get();

        Section section = new Section();
        section.set_class(curClass);
        section.setSectionName(sectionName);
        System.out.println(section);
        return sectionRepo.save(section);
    }

    @Transactional
    @Modifying
    //4. 클래스의 섹션을 삭제하는 기능
    public void delSection(Long curSectionIdx) {

        //섹션의 과제 항목 데이터를 삭제
        taskItemRepo.DelTaskItemBySectionIdx(curSectionIdx);

        //섹션 삭제
        sectionRepo.deleteSectionBySectionIdx(curSectionIdx);
    }

    //5. 클래스의 섹션의 이름을 수정하는 기능
    public int sectionName(int a) {
        return 0;
    }

    //6. 섹션의 과제 항목과 점수를 조회하는 기능
    public Map findTaskChart(Long curSectionIdx, Long curClassIdx,HttpSession session) {

        //차트 데이터 불러오기
        List<TaskItemMapping> classChart = taskItemRepo.findAllBySectionOrderByStudent(sectionRepo.findById(curSectionIdx).get());

        //사용중인 과제 리스트 불러오기
        List<UsedTaskList> usedList = taskItemRepo.findDistinctBySection(sectionRepo.findById(curSectionIdx).get());

        //모든 과제 리스트 불러오기
        List<TaskItemInfo> taskList = taskItemInfoRepo.findTaskItemInfoByClassIdx(curClassIdx);

        //모든 학생 리스트 불러오기
        List<Student> studentList = studentService.findStudentList(session);

        Map<String, Object> map = new HashMap<>();
        map.put("classChart",classChart);
        map.put("usedList",usedList);
        map.put("taskList",taskList);
        map.put("studentList",studentList);

        return map;
    }

    //7. 섹션의 과제 항목을 추가하는 기능
    public int addTask(int a) {
        return 0;
    }

    //8. 섹션의 과제 항목을 삭제하는 기능
    public int delTask(int a) {
        return 0;
    }

    //9. 섹션의 과제 항목을 이름을 수정하는 기능
    public int taskName(int a) {
        return 0;
    }

    //10. 과제 점수를 입력, 수정하는 기능

    @Transactional
    @Modifying
    public int saveTaskScore( String taskChart, Long curSectionIdx) {
        System.out.println(taskChart);
        List<TaskItem> taskItemList = new ArrayList<>();

        Section curSection = sectionRepo.findById(curSectionIdx).get();

        JsonParser parser = new JsonParser();
        JsonArray jsonArray = (JsonArray) parser.parse(taskChart);
        System.out.println("추가될 레코드 개수 : "+jsonArray.size());


        for(int i=0;i<jsonArray.size();i++){

            JsonObject object = (JsonObject) jsonArray.get(i);
            Long studentIdx =Long.parseLong(object.get("studentIdx").getAsString().replace("\"", ""));
            Long taskInfoIdx = Long.parseLong(object.get("taskInfoIdx").getAsString().replace("\"", ""));
            Long score;

            if(object.get("score").getAsString().equals("\"\"")||object.get("score").getAsString().equals("")){
                score = 0L;
            }  else {
                score = Long.parseLong(object.get("score").getAsString().replace("\"", ""));
            }
            System.out.println("학생 idx " + studentIdx + " | 과제정보 idx " + taskInfoIdx+" | 점수" + score);

            Student curStudent = studentRepo.findById(studentIdx).get();
            TaskItemInfo curTaskItemInfo = taskItemInfoRepo.findById(taskInfoIdx).get();

            TaskItem taskItem = new TaskItem();
            taskItem.setStudent(curStudent);
            taskItem.setTaskItemInfo(curTaskItemInfo);
            taskItem.setTaskScore(score);
            taskItem.setSection(curSection);

            taskItemRepo.save(taskItem);
            System.out.println(taskItem);
        }


        return 0;
    }
}
