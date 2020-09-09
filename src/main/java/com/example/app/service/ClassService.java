package com.example.app.service;

import com.example.app.model.domain.*;
import com.example.app.model.domain.Class;
import com.example.app.model.domain.section.*;
import com.example.app.model.dto.response.atCountResponse;
import com.example.app.model.dto.response.repository.TaskItemMapping;
import com.example.app.model.dto.response.repository.TotalGradeMapping;
import com.example.app.model.dto.response.totalGradeResponse;
import com.example.app.repository.*;
import com.google.gson.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.math.BigDecimal;
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
    SectionItemRepository sectionItemRepo;
    @Autowired
    ClassDefaultTaskRepository classDefaultTaskRepo;

    @Autowired
    StudentService studentService;

    //0.전체 클래스를 조회하는 기능
    public List<Class> findClassList(HttpSession session) {
        return classRepo.findClassByAccount((Account) session.getAttribute("Account"));
    }

    //0.클래스를 조회하는 기능
    public Optional<Class> findClass(Long classIdx) {
        return classRepo.findById(classIdx);
    }

    //1. 전체 학생 목록을 출력하여 등급 항목에 과제 항목의 점수를 반영하여 조회해주는 기능
    public List<totalGradeResponse> findTotalGrade(Long curClassIdx,HttpSession session) {
        Account curAccount = (Account)session.getAttribute("Account");
//        System.out.println(curClassIdx);
        List<TotalGradeMapping> totalGradeList = taskItemRepo.findTotalGrade(curClassIdx, curAccount.getUserIdx());
        List<totalGradeResponse> result = new ArrayList<totalGradeResponse>();

        List<TaskItemInfo> taskItemInfo = taskItemInfoRepo.findTaskItemInfoByClassIdx(curClassIdx);

        //등급 기준을 저장하기 위한 map
        Map<Long,Long> map = new HashMap<Long,Long>();
        for(TaskItemInfo item : taskItemInfo){
//            System.out.println(item);
            map.put(item.getTaskItemInfoIdx(),item.getTaskGradeRatio());
        }

        for(TotalGradeMapping item : totalGradeList){
            Double grade;
            Double finalGrade=0.0;
            Long curTaskIdx = item.getTask();
            Long gradeRatio = map.get(curTaskIdx);
//            System.out.println("gradeRatio : "+ gradeRatio);

            //성적 매기기
            if(item.getSum()==null){
                grade = null;
            } else if(gradeRatio==0L){
                grade = null;
            } else {
                grade =  item.getSum().doubleValue() / item.getCount();
                finalGrade = (item.getSum().doubleValue() / item.getCount()) * gradeRatio / 10.0;
            }
            System.out.println("1 : " + item.getTask()+" 2 : " + item.getStudent() + " 3 : " + item.getCount()+ " 4 : " + item.getSum() + " 5 : " + grade + " 6 : " + finalGrade);
          result.add(new totalGradeResponse(item.getStudent(),curTaskIdx,grade,finalGrade,null) );
        }

/*        for(totalGradeResponse a : result){
            System.out.println(a);
        }*/
        return result;
    }

    //2. Setting에서 설정한 클래스 등급 비율을 표시해주는 기능
    public int findSetGradeRatio(int a) {
        return 0;
    }

    // 클래스의 섹션 목록을 조회하는 기능
    public List<Section> findSectionList(Long curClassIdx) {
        List<Section> result = sectionRepo.findSectionBy_class_ClassIdxOrderBySectionIdx(curClassIdx);
        return result;
    }

    //3. 클래스의 섹션을 추가하는 기능
    @Transactional
    @Modifying
    public Section addSection(Long curClassIdx, String sectionName, Long curSectionIdx) {

        Class curClass = classRepo.findById(curClassIdx).get();

        //현재 클래스의 가장 마지막 섹션에 있는 과제 항목 들고오기
        List<SectionItem> sectionItemList = sectionItemRepo.findLastSectionItem(curClassIdx);
        System.out.println("--------------------------------------->" + sectionItemList);

        //신규 섹션 생성
        Section section = new Section();
        section.set_class(curClass);
        section.setSectionName(sectionName);
        //매개변수에 섹션 아이디값이 존재하면 신규 섹션에 삽입
        if (curSectionIdx != null) {
            section.setSectionIdx(curSectionIdx);
        }

        System.out.println(section);
        Section result = sectionRepo.save(section);


        if (curSectionIdx == null) {
            for (SectionItem item : sectionItemList) {
                SectionItem sectionItem = new SectionItem();
                sectionItem.setSection(result);
                sectionItem.setTaskItemInfo(item.getTaskItemInfo());
                sectionItemRepo.save(sectionItem);
            }
        }

        //만든 섹션에 Default 과제항목 넣기
//        List<ClassDefaultTask> list = classDefaultTaskRepo.findDefaultTaskByClassId(curClassIdx);

        /*for (ClassDefaultTask item : list) {
            SectionItem sectionItem = new SectionItem();
            sectionItem.setSection(result);
            sectionItem.setTaskItemInfo(item.getTaskItemInfo());
            sectionItemRepo.save(sectionItem);
        }*/

        return result;
    }

    @Transactional
    @Modifying
    //4. 클래스의 섹션을 삭제하는 기능
    public void delSection(Long curSectionIdx) {

        //섹션의 과제 항목 데이터를 삭제
        taskItemRepo.DelTaskItemBySectionIdx(curSectionIdx);

        //섹션의 섹션아이템을 삭제
        sectionItemRepo.DelSectionItemBySectionIdx(curSectionIdx);

        //섹션 삭제
        sectionRepo.deleteSectionBySectionIdx(curSectionIdx);
    }

    //5. 클래스의 섹션의 이름을 수정하는 기능
    public int sectionName(int a) {
        return 0;
    }

    //6. 섹션의 과제 항목과 점수를 조회하는 기능
    public Map findTaskChart(Long curSectionIdx, Long curClassIdx, HttpSession session) {

        //차트 데이터 불러오기
        List<TaskItemMapping> classChart = taskItemRepo.findAllBySectionOrderByStudent(sectionRepo.findById(curSectionIdx).get());

        //사용중인 과제 항목 불러오기
//        List<SectionItem> usedList = taskItemRepo.findDistinctBySection(sectionRepo.findById(curSectionIdx).get());
        List<SectionItem> usedList = sectionItemRepo.findSectionItemBySectionIdx(curSectionIdx);

        //모든 과제 리스트 불러오기
        List<TaskItemInfo> taskList = taskItemInfoRepo.findTaskItemInfoByClassIdx(curClassIdx);

        //모든 학생 리스트 불러오기
        List<Student> studentList = studentService.findStudentList(session);

        Map<String, Object> map = new HashMap<>();
        map.put("classChart", classChart);
        map.put("usedList", usedList);
        map.put("taskList", taskList);
        map.put("studentList", studentList);

        return map;
    }

    //6. 섹션의 기본 템플릿 제공
    public Map findTaskTemplate(Long curClassIdx, HttpSession session) {

        /*List<TaskItemInfo> DefaultTaskList = new ArrayList<TaskItemInfo>();
        List<ClassDefaultTask> DefaultTaskItem = classDefaultTaskRepo.findDefaultTaskByClassId(curClassIdx);
        for (ClassDefaultTask classDefaultTask : DefaultTaskItem) {
            DefaultTaskList.add(classDefaultTask.getTaskItemInfo());
        }*/

        //현재 클래스의 가장 마지막 섹션에 있는 과제 항목 들고오기
        List<SectionItem> sectionItemList = sectionItemRepo.findLastSectionItem(curClassIdx);

        //모든 과제 리스트 불러오기
        List<TaskItemInfo> taskList = taskItemInfoRepo.findTaskItemInfoByClassIdx(curClassIdx);

        //모든 학생 리스트 불러오기
        List<Student> studentList = studentService.findStudentList(session);

        Map<String, Object> map = new HashMap<>();
        map.put("sectionItemList", sectionItemList);
        map.put("taskList", taskList);
        map.put("studentList", studentList);

        return map;
    }

    //7. 섹션의 과제 항목을 추가하는 기능
    public Map<String, Object> addTask(Long curClassIdx, Long curSectionIdx) {

        Map<String, Object> map = new HashMap<>();

        SectionItem sectionItem = new SectionItem();
        sectionItem.setSection(sectionRepo.findById(curSectionIdx).get());
        SectionItem result = sectionItemRepo.save(sectionItem);
        List<TaskItemInfo> taskItemInfo = taskItemInfoRepo.findTaskItemInfoByClassIdx(curClassIdx);

        map.put("sectionItem", result);
        map.put("taskItemInfo", taskItemInfo);
        return map;
    }

    //8. 섹션의 과제 항목을 삭제하는 기능
    @Transactional
    @Modifying
    public int delTask(Long sectionItemIdx) {

        SectionItem sectionItem = sectionItemRepo.findById(sectionItemIdx).get();

        //taskiteminfo Null여부 체크 : 새로 추가된 Task이므로 TaskItem이 없음
        if (sectionItem.getTaskItemInfo() != null) {
            //섹션내부 데이터 삭제
            taskItemRepo.delTask(sectionItem.getSection().getSectionIdx(), sectionItem.getTaskItemInfo().getTaskItemInfoIdx());
        }
        //섹션항목 삭제
        sectionItemRepo.deleteById(sectionItemIdx);
        return 0;
    }

    //9. 섹션의 과제 항목을 이름을 수정하는 기능
    @Transactional
    @Modifying
    public int changeTask(Long sectionItemIdx, Long targetTaskIdx) {
        //구조가 변경되야함
        //TaskItem에 SectionIdx와 TaskItemInfoIdx를 SectionItem으로 해결할 수 있다.

        SectionItem sectionItem = sectionItemRepo.findById(sectionItemIdx).get();

        //taskiteminfo Null여부 체크 : 새로 추가된 Task이므로 TaskItem이 없음
        if (sectionItem.getTaskItemInfo() != null) {
            //taskitem의 taskiteminfo를 전부 수정
            List<TaskItem> taskItemList = taskItemRepo.findSectionItemTask(sectionItem.getSection().getSectionIdx(), sectionItem.getTaskItemInfo().getTaskItemInfoIdx());
            for (TaskItem taskItem : taskItemList) {
                taskItem.setTaskItemInfo(taskItemInfoRepo.findById(targetTaskIdx).get());
                taskItemRepo.save(taskItem);
            }
        }

        //sectionitem의 taskiteminfo를 수정
        sectionItem.setTaskItemInfo(taskItemInfoRepo.findById(targetTaskIdx).get());
        sectionItemRepo.save(sectionItem);


        return 0;
    }

    //10. 과제 점수를 입력, 수정하는 기능
    @Transactional
    @Modifying
    public int saveTaskScore(String taskChart, Long curSectionIdx) {

        // 가져온 데이터 출력
        //        System.out.println(taskChart);

        //현재 세션 가져오기
        Section curSection = sectionRepo.findById(curSectionIdx).get();

        //json 파싱
        JsonParser parser = new JsonParser();
        JsonArray jsonArray = (JsonArray) parser.parse(taskChart);
        //가지고온 데이터 개수 출력
        System.out.println("add record size : " + jsonArray.size());

        //파싱을 위한 변수 출력
        List<TaskItem> taskItemList = new ArrayList<>();

        for (int i = 0; i < jsonArray.size(); i++) {
            //스트링에 ""을 제거하기 위한 작업이었는데.. 필요가 없었다..
//            Long studentIdx =Long.parseLong(object.get("studentIdx").getAsString().replace("\"", ""));
//            Long taskInfoIdx = Long.parseLong(object.get("taskInfoIdx").getAsString().replace("\"", ""));

            //studentIdx, taskinfoIdx 파싱
            JsonObject object = (JsonObject) jsonArray.get(i);
            Long studentIdx = object.get("studentIdx").getAsLong();
            Long taskInfoIdx = object.get("taskInfoIdx").getAsLong();

            //뒤에서 사용될 변수
            Long taskItemIdx;
            BigDecimal score;

            //student, taskinfo 가져오기
            Student curStudent = studentRepo.findById(studentIdx).get();
            TaskItemInfo curTaskItemInfo = taskItemInfoRepo.findById(taskInfoIdx).get();
            //결과 출력
            System.out.println("Student idx " + studentIdx + " | TaskInfo idx " + taskInfoIdx);

            //DTO 생성
            TaskItem taskItem = new TaskItem();

            //생성된 DTO에 가져온 객체 입력
            taskItem.setStudent(curStudent);
            taskItem.setTaskItemInfo(curTaskItemInfo);
            taskItem.setSection(curSection);

            //아이디가 이미 있으면 입력해 주기
            if (object.has("taskItemIdx")) {
                taskItemIdx = object.get("taskItemIdx").getAsLong();
                taskItem.setTaskItemIdx(taskItemIdx);
                //아이디 출력
                System.out.println("TaskItemidx | " + taskItemIdx);
            }


            //점수가 있으면 넣고 없으면 null값 대입
            if (object.has("score")) {
                String str = object.get("score").getAsString();
                score =  new BigDecimal(str);

                System.out.println("score | " + score);
            } else {
                score = null;
            }
            taskItem.setTaskScore(score);
            TaskItem result = taskItemRepo.save(taskItem);
            System.out.println(taskItem);


//            taskItemRepo.updateScore(score, result.getTaskItemIdx());
//          taskItem.setTaskScore(score);

        }
        return 0;
    }

    //11. 과제 정보를 출력해주는 기능 : 성적비율
    public List<TaskItemInfo> findTaskItemInfoList(Long curClassIdx) {
        return taskItemInfoRepo.findTaskItemInfoByClassIdx(curClassIdx);
    }
}