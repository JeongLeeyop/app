package com.example.app.service;

import com.example.app.model.domain.*;
import com.example.app.model.domain.Class;
import com.example.app.model.domain.section.*;
import com.example.app.model.dto.response.repository.ScoreMapping;
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
    ScoreRepository scoreRepo;
    @Autowired
    TaskRepository taskRepo;
    @Autowired
    StudentRepository studentRepo;
    @Autowired
    SectionTasksRepository sectionTasksRepo;
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
    public List<totalGradeResponse> findTotalGrade(Long curClassIdx, HttpSession session) {
        Account curAccount = (Account) session.getAttribute("Account");
//        System.out.println(curClassIdx);
        List<TotalGradeMapping> totalGradeList = scoreRepo.findTotalGrade(curClassIdx, curAccount.getUserIdx());
        List<totalGradeResponse> result = new ArrayList<totalGradeResponse>();

        List<Task> task = taskRepo.findTaskByClassIdx(curClassIdx);

        //등급 기준을 저장하기 위한 map
        Map<Long, Long> map = new HashMap<Long, Long>();
        for (Task item : task) {
//            System.out.println(item);
            map.put(item.getTaskIdx(), item.getTaskGradeRatio());
        }

        for (TotalGradeMapping item : totalGradeList) {
            Double grade;
            Double finalGrade = 0.0;
            Long curTaskIdx = item.getTask();
            Long gradeRatio = map.get(curTaskIdx);
//            System.out.println("gradeRatio : "+ gradeRatio);

            //성적 매기기
            if (item.getSum() == null) {
                grade = null;
            } else if (gradeRatio == 0L) {
                grade = null;
            } else {
                grade = item.getSum().doubleValue() / item.getCount();
                finalGrade = (item.getSum().doubleValue() / item.getCount()) * gradeRatio / 100;
            }
            System.out.println("1 : " + item.getTask() + " 2 : " + item.getStudent() + " 3 : " + item.getCount() + " 4 : " + item.getSum() + " 5 : " + grade + " 6 : " + finalGrade);
            result.add(new totalGradeResponse(item.getStudent(), curTaskIdx, grade, finalGrade, null));
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
        List<SectionTasks> sectionTasksList = sectionTasksRepo.findLastSectionTasks(curClassIdx);
        System.out.println("--------------------------------------->" + sectionTasksList);

        //신규 섹션 생성
        Section section = new Section();
        section.set_class(curClass);
        section.setSectionName(sectionName);
        //매개변수에 섹션 아이디값이 존재하면 삽입
        if (curSectionIdx != null) {
            section.setSectionIdx(curSectionIdx);
        }

        System.out.println(section);
        Section result = sectionRepo.save(section);

        //신규섹션
        if (curSectionIdx == null) {
            for (SectionTasks item : sectionTasksList) {
                SectionTasks sectionTasks = new SectionTasks();
                sectionTasks.setSection(result);
                sectionTasks.setTask(item.getTask());
                sectionTasks.setMaxScore(item.getMaxScore());
                sectionTasksRepo.save(sectionTasks);
            }
        }

        //만든 섹션에 Default 과제항목 넣기
//        List<ClassDefaultTask> list = classDefaultTaskRepo.findDefaultTaskByClassId(curClassIdx);

        /*for (ClassDefaultTask item : list) {
            SectionTasks sectionItem = new SectionTasks();
            sectionItem.setSection(result);
            sectionItem.setTaskItemInfo(item.getTaskItemInfo());
            sectionTasksRepo.save(sectionItem);
        }*/

        return result;
    }




    @Transactional
    @Modifying
    //4. 클래스의 섹션을 삭제하는 기능
    public void delSection(Long curSectionIdx) {

        //섹션의 과제 항목 데이터를 삭제
        scoreRepo.DelScoreBySectionIdx(curSectionIdx);

        //섹션의 섹션아이템을 삭제
        sectionTasksRepo.DelSectionTasksIdxBySectionIdx(curSectionIdx);

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
        List<ScoreMapping> classChart = scoreRepo.findAllBySectionOrderByStudent(sectionRepo.findById(curSectionIdx).get());

        //사용중인 과제 항목 불러오기
//        List<SectionTasks> usedList = scoreRepo.findDistinctBySection(sectionRepo.findById(curSectionIdx).get());
        List<SectionTasks> usedList = sectionTasksRepo.findSectionTasksBySectionIdx(curSectionIdx);

        //모든 과제 리스트 불러오기
        List<Task> taskList = taskRepo.findTaskByClassIdx(curClassIdx);

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
    /*public Map findTaskTemplate(Long curClassIdx, HttpSession session) {

        *//*List<TaskItemInfo> DefaultTaskList = new ArrayList<TaskItemInfo>();
        List<ClassDefaultTask> DefaultTaskItem = classDefaultTaskRepo.findDefaultTaskByClassId(curClassIdx);
        for (ClassDefaultTask classDefaultTask : DefaultTaskItem) {
            DefaultTaskList.add(classDefaultTask.getTaskItemInfo());
        }*//*

        //현재 클래스의 가장 마지막 섹션에 있는 과제 항목 들고오기
        List<SectionTasks> sectionTasksList = sectionTasksRepo.findLastSectionTasks(curClassIdx);

        //모든 과제 리스트 불러오기
        List<Task> taskList = taskRepo.findTaskByClassIdx(curClassIdx);

        //모든 학생 리스트 불러오기
        List<Student> studentList = studentService.findStudentList(session);

        Map<String, Object> map = new HashMap<>();
        map.put("sectionItemList", sectionTasksList);
        map.put("taskList", taskList);
        map.put("studentList", studentList);

        return map;
    }*/

    //7. 섹션의 과제 항목을 추가하는 기능
    public Map<String, Object> addTask(Long curClassIdx, Long curSectionIdx) {

        Map<String, Object> map = new HashMap<>();

        SectionTasks sectionTasks = new SectionTasks();
        sectionTasks.setSection(sectionRepo.findById(curSectionIdx).get());
        SectionTasks result = sectionTasksRepo.save(sectionTasks);
        List<Task> task = taskRepo.findTaskByClassIdx(curClassIdx);

        map.put("sectionTasks", result);
        map.put("task", task);
        return map;
    }

    //8. 섹션의 과제 항목을 삭제하는 기능
    @Transactional
    @Modifying
    public int delTask(Long sectionTasksIdx) {

        SectionTasks sectionTasks = sectionTasksRepo.findById(sectionTasksIdx).get();

        //taskiteminfo Null여부 체크 : 새로 추가된 Task이므로 TaskItem이 없음
        if (sectionTasks.getTask() != null) {
            //섹션내부 데이터 삭제
            scoreRepo.delTask(sectionTasks.getSection().getSectionIdx(), sectionTasks.getTask().getTaskIdx());
        }
        //섹션항목 삭제
        sectionTasksRepo.deleteById(sectionTasksIdx);
        return 0;
    }

    //9. 섹션의 과제 항목을 이름을 수정하는 기능
    @Transactional
    @Modifying
    public int changeTask(Long sectionTasksIdx, Long targetTaskIdx) {
        //구조가 변경되야함
        //TaskItem에 SectionIdx와 TaskItemInfoIdx를 SectionItem으로 해결할 수 있다.

        SectionTasks sectionTasks = sectionTasksRepo.findById(sectionTasksIdx).get();

        //taskiteminfo Null여부 체크 : 새로 추가된 Task이므로 TaskItem이 없음
        if (sectionTasks.getTask() != null) {
            //taskitem의 taskiteminfo를 전부 수정
            List<Score> scoreList = scoreRepo.findScoreBySectionAndTask(sectionTasks.getSection().getSectionIdx(), sectionTasks.getTask().getTaskIdx());
            for (Score score : scoreList) {
                score.setTask(taskRepo.findById(targetTaskIdx).get());
                scoreRepo.save(score);
            }
        }

        //sectionitem의 taskiteminfo를 수정
        sectionTasks.setTask(taskRepo.findById(targetTaskIdx).get());
        sectionTasksRepo.save(sectionTasks);


        return 0;
    }

    //10. 과제 점수를 입력, 수정하는 기능
    @Transactional
    @Modifying
    public int saveTaskScore(String taskChart, Long curSectionIdx,String sectionTasksList) {

        // 가져온 데이터 출력
        //        System.out.println(taskChart);

        //현재 세션 가져오기
        Section curSection = sectionRepo.findById(curSectionIdx).get();


        //json 파싱
        JsonParser parser = new JsonParser();
        JsonArray jsonArray = (JsonArray) parser.parse(sectionTasksList);

        //SectionItem에 maxScore 저장
        for (int i = 0; i < jsonArray.size(); i++) {
            //sectionTasksIdx, maxScore 파싱
            JsonObject object = (JsonObject) jsonArray.get(i);
            Long sectionTasksIdx = object.get("sectionTasksIdx").getAsLong();
            Double maxScore = object.get("maxScore").getAsDouble();

            sectionTasksRepo.updateMaxScore(sectionTasksIdx,maxScore);

/*            //Task의 maxScore수정 : 최근 사용된 maxScore값을 기억
            Long taskItemInfoIdx = sectionTasksRepo.findById(sectionTasksIdx).get().getTaskItemInfo().getTaskItemInfoIdx();
            taskRepo.updateMaxScore(taskItemInfoIdx, maxScore);*/
        }

        //json 파싱
        jsonArray = (JsonArray) parser.parse(taskChart);
        //가지고온 데이터 개수 출력
        System.out.println("add record size : " + jsonArray.size());

        //파싱을 위한 변수 출력
        List<Score> scoreList = new ArrayList<>();

        for (int i = 0; i < jsonArray.size(); i++) {
            //스트링에 ""을 제거하기 위한 작업이었는데.. 필요가 없었다..
//            Long studentIdx =Long.parseLong(object.get("studentIdx").getAsString().replace("\"", ""));
//            Long taskIdx = Long.parseLong(object.get("taskIdx").getAsString().replace("\"", ""));

            //studentIdx, taskIdx 파싱
            JsonObject object = (JsonObject) jsonArray.get(i);
            Long studentIdx = object.get("studentIdx").getAsLong();
            Long taskIdx = object.get("taskIdx").getAsLong();

            //뒤에서 사용될 변수
            Long scoreIdx;
            BigDecimal score;

            //student, taskinfo 가져오기
            Student curStudent = studentRepo.findById(studentIdx).get();
            Task curTask = taskRepo.findById(taskIdx).get();
            //결과 출력
            System.out.println("Student idx " + studentIdx + " | TaskInfo idx " + taskIdx);

            //DTO 생성
            Score _score = new Score();

            //생성된 DTO에 가져온 객체 입력
            _score.setStudent(curStudent);
            _score.setTask(curTask);
            _score.setSection(curSection);

            //아이디가 이미 있으면 입력해 주기
            if (object.has("scoreIdx")) {
                scoreIdx = object.get("scoreIdx").getAsLong();
                _score.setScoreIdx(scoreIdx);
                //아이디 출력
                System.out.println("scoreIdx | " + scoreIdx);
            }


            //점수가 있으면 넣고 없으면 null값 대입
            if (object.has("score")) {
                String str = object.get("score").getAsString();
                score = new BigDecimal(str);

                System.out.println("score | " + score);
            } else {
                score = null;
            }
            _score.setScore(score);
            Score result = scoreRepo.save(_score);
            System.out.println(_score);


//            scoreRepo.updateScore(score, result.getTaskItemIdx());
//          score.setTaskScore(score);

        }
        return 0;
    }

    //11. 과제 정보를 출력해주는 기능 : 성적비율
    public List<Task> findTaskList(Long curClassIdx) {
        return taskRepo.findTaskByClassIdx(curClassIdx);
    }
}