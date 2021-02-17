package com.example.app.service;

import com.example.app.common.OrderByCode;
import com.example.app.model.domain.*;
import com.example.app.model.domain.Class;
import com.example.app.model.domain.section.*;
import com.example.app.model.dto.response.CMTaskScoreResponse;
import com.example.app.model.dto.response.repository.AuthClassMapping;
import com.example.app.model.dto.response.repository.ScoreMapping;
import com.example.app.model.dto.response.repository.CMTaskScoreMapping;
import com.example.app.model.dto.response.repository.TotalGradeMapping;
import com.example.app.model.dto.response.totalGradeResponse;
import com.example.app.repository.*;
import com.google.gson.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
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
    AuthClassRepository authClassRepo;
    @Autowired
    StudentService studentService;
    @Autowired
    SeasonRepository seasonRepo;
    @Autowired
    AuthStudentRepository authStudentRepo;
    @Autowired
    ClassMembersRepository classMembersRepo;
    @Autowired
    AdminService adminService;

    //0.전체 클래스를 조회하는 기능
    public List<Class> findClassList(Long curSeasonIdx, Long orderBy) {
        Sort sort = Sort.by(Sort.Direction.ASC, "classIdx");
        if (orderBy == OrderByCode.ByGrade.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "classGrade");
        } else if (orderBy == OrderByCode.ByName.getValue()) {
            sort = Sort.by(Sort.Direction.ASC, "className");
        }

        return classRepo.findClassBySeason_SeasonIdx(curSeasonIdx, sort);
    }

    //0.권한이 있는 클래스 목록을 조회하는 기능
    public List<AuthClassMapping> findAuthClassList(HttpSession session, Long curSeasonIdx) {

        Season season = seasonRepo.findSeasonBySeasonIdx(curSeasonIdx);
        Account account = (Account) session.getAttribute("Account");
        List<AuthClassMapping> result = authClassRepo.findAuthClassByAccountAndSeason(account.getUserIdx(), season.getSeasonIdx());
        return result;
    }

    //0.클래스를 조회하는 기능
    public Optional<Class> findClass(Long classIdx) {
        return classRepo.findById(classIdx);
    }

    //1. 전체 학생 목록을 출력하여 등급 항목에 과제 항목의 점수를 반영하여 조회해주는 기능
    public List<totalGradeResponse> findTotalGrade(Long curClassIdx, HttpSession session) {

//        --- totalGradeResponse 타입---
//        Long getTask();
//        Long getStudent(); ==> authStudent
//        Long getCount();
//        Double getSum();

        //유저정보 가져오기
        Account curAccount = (Account) session.getAttribute("Account");

        List<TotalGradeMapping> totalGradeList = scoreRepo.findTotalGrade(curClassIdx, curAccount.getUserIdx());
        List<totalGradeResponse> result = new ArrayList<totalGradeResponse>();

        List<Task> task = taskRepo.findTaskByClassIdx(curClassIdx);

        //과제별 등급 비율을 저장하기 위한 map
        Map<Long, Long> map = new HashMap<Long, Long>();
        for (Task item : task) {
            map.put(item.getTaskIdx(), item.getTaskGradeRatio());
        }

        for (TotalGradeMapping item : totalGradeList) {
            Double grade;
            Double finalGrade = 0.0;
            Long curTaskIdx = item.getTask();
            Long gradeRatio = map.get(curTaskIdx);

            //성적 매기기
            if (item.getSum() == null) {
                grade = null;
            } else if (gradeRatio == 0L) {
                grade = item.getSum().doubleValue() / item.getCount();
//                grade = null;
            } else {
                grade = item.getSum().doubleValue() / item.getCount();
                finalGrade = (item.getSum().doubleValue() / item.getCount()) * gradeRatio / 100;
            }
//            System.out.println("과제IDX : " + item.getTask() + " 권한학생idx : " + item.getStudent() + " 저장된 점수의 개수 : " + item.getCount() + " 점수의 총합 : " + item.getSum() + " 과제등급비율 : " + grade + " 최종성적 : " + finalGrade);
            result.add(new totalGradeResponse(item.getStudent(), curTaskIdx, grade, finalGrade, null));
        }
        return result;
    }

    //2. Setting에서 설정한 클래스 등급 비율을 표시해주는 기능
    public int findSetGradeRatio(int a) {
        return 0;
    }

    // 클래스의 섹션 목록을 조회하는 기능
    public List<Section> findSectionList(Long curClassIdx) {
//        List<Section> result = sectionRepo.findSectionBy_class_ClassIdxOrderBySectionIdx(curClassIdx);
        List<Section> result = sectionRepo.findSectionByauthClass_AuthClassIdxOrderBySectionIdx(curClassIdx);
        return result;
    }

    //3. 클래스의 섹션을 추가하는 기능
    @Transactional
    @Modifying
    public Section addSection(Long curClassIdx, String sectionName, Long curSectionIdx) {

        //현재 클래스 가져오기
//        Class curClass = classRepo.findById(curClassIdx).get();
        AuthClass curClass = authClassRepo.findById(curClassIdx).get();

        //현재 클래스의 가장 마지막 섹션에 있는 과제 항목 들고오기
        List<SectionTasks> sectionTasksList = sectionTasksRepo.findLastSectionTasks(curClassIdx);

        //신규 섹션 생성
        Section section = new Section();
        section.setAuthClass(curClass);
        section.setSectionName(sectionName);

        //왜 있지?? 없어도 될것 같은데
        //매개변수에 섹션 아이디값이 존재하면 삽입
        if (curSectionIdx != null) {
            section.setSectionIdx(curSectionIdx);
        }

        //저장
        Section result = sectionRepo.save(section);

        //신규섹션일 경우 , 만들어진 섹션 내부에 가지고온 과제 항목들 입력
        if (curSectionIdx == null) {
            for (SectionTasks item : sectionTasksList) {
                SectionTasks sectionTasks = new SectionTasks();
                sectionTasks.setSection(result);
                sectionTasks.setTask(item.getTask());
                sectionTasks.setMaxScore(item.getMaxScore());
                sectionTasksRepo.save(sectionTasks);
            }
        }

        return result;
    }


    @Transactional
    @Modifying
    //4. 클래스의 섹션을 삭제하는 기능
    public void delSection(Long curSectionIdx) {

        //섹션의 점수 데이터를 삭제
        scoreRepo.DelScoreBySectionIdx(curSectionIdx);

        //섹션의 과제항목 데이터를 삭제
        sectionTasksRepo.DelSectionTasksIdxBySectionIdx(curSectionIdx);

        //섹션 삭제
        sectionRepo.deleteSectionBySectionIdx(curSectionIdx);
    }


    //6. 섹션의 과제 항목과 점수를 조회하는 기능
    public Map findTaskChart(Long curSectionIdx, Long curClassIdx, HttpSession session, Long curSeasonIdx) {

        //차트 데이터 불러오기
        List<ScoreMapping> classChart = scoreRepo.findAllBySectionOrderByStudent(sectionRepo.findById(curSectionIdx).get());

        //사용중인 과제 항목 불러오기
//        List<SectionTasks> usedList = scoreRepo.findDistinctBySection(sectionRepo.findById(curSectionIdx).get());
        List<SectionTasks> usedList = sectionTasksRepo.findSectionTasksBySectionIdx(curSectionIdx);

        //권한이 부여된 모든 과제 리스트 불러오기
        List<Task> taskList = taskRepo.findTaskByClassIdx(curClassIdx);

        //해당 시즌의 권한이 부여된 학생 리스트 불러오기
//        List<Student> studentList = studentService.findStudentList(session);
//        List<AuthStudent> studentList = studentService.findAuthStudentList(curSeasonIdx,session);

        //해당 시즌의 classMembers 리스트 불러오기
        List<ClassMembers> classMembers = adminService.findClassMembers(curClassIdx, 0L);

        Map<String, Object> map = new HashMap<>();
        map.put("classChart", classChart);
        map.put("usedList", usedList);
        map.put("taskList", taskList);
        map.put("classMembers", classMembers);

        return map;
    }

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
            //섹션과제 내부의 점수 데이터 삭제
//            scoreRepo.delTask(sectionTasks.getSection().getSectionIdx(), sectionTasks.getTask().getTaskIdx());
            scoreRepo.delBySectionTasksIdx(sectionTasksIdx);
        }
        //섹션과제 항목 삭제
        sectionTasksRepo.deleteById(sectionTasksIdx);
        return 0;
    }

    //9. 섹션의 과제 항목을 이름을 수정하는 기능
    @Transactional
    @Modifying
    public int changeTask(Long sectionTasksIdx, Long targetTaskIdx) {
        //구조가 변경되야함
        //score의 SectionIdx와 TaskIdx를 SectionItem으로 해결할 수 있다.

        SectionTasks sectionTasks = sectionTasksRepo.findById(sectionTasksIdx).get();

        //task의 Null여부 체크 : 새로 추가된 Task이므로 score 없음
        if (sectionTasks.getTask() != null) {
            //score의 taskidx를 전부 수정
//            List<Score> scoreList = scoreRepo.findScoreBySectionAndTask(sectionTasks.getSection().getSectionIdx(), sectionTasks.getTask().getTaskIdx());
            List<Score> scoreList = scoreRepo.findScoreBySectionTasks(sectionTasksIdx);
            for (Score score : scoreList) {
                score.setTask(taskRepo.findById(targetTaskIdx).get());
                scoreRepo.save(score);
            }
        }

        //sectionTask의 task를 수정
        sectionTasks.setTask(taskRepo.findById(targetTaskIdx).get());
        sectionTasksRepo.save(sectionTasks);

        return 0;
    }

    //10. 과제 점수를 입력, 수정하는 기능
    @Transactional
    @Modifying
    public int saveTaskScore(String taskChart, Long curSectionIdx, String sectionTasksList) {

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

            Double maxScore;
            if(object.get("maxScore").getAsString().equals("")) maxScore = null;
            else maxScore = object.get("maxScore").getAsDouble();

            String memo = object.get("memo").getAsString();

            sectionTasksRepo.updateMaxScore(sectionTasksIdx, maxScore, memo);
        }

        //json 파싱
        jsonArray = (JsonArray) parser.parse(taskChart);
        //가지고온 데이터 개수 출력
//        System.out.println("add record size : " + jsonArray.size());

        //파싱을 위한 변수 출력
        List<Score> scoreList = new ArrayList<>();

        for (int i = 0; i < jsonArray.size(); i++) {
            //authStudentIdx, taskIdx 파싱
            JsonObject object = (JsonObject) jsonArray.get(i);
            Long studentIdx = object.get("studentIdx").getAsLong();
            Long sectionTasks = object.get("sectionTasks").getAsLong();

            Long taskIdx = object.get("taskIdx").getAsLong();


            //뒤에서 사용될 변수
            Long scoreIdx;
            BigDecimal score;

            //authStudent, task 가져오기
//            AuthStudent curStudent = authStudentRepo.findById(studentIdx).get();
            ClassMembers curStudent = classMembersRepo.findById(studentIdx).get();

            SectionTasks curSectionTasks = sectionTasksRepo.findById(sectionTasks).get();
//            Task curTask = taskRepo.findById(taskIdx).get();
            Task curTask =curSectionTasks.getTask();
            //결과 출력
//            System.out.println("Student idx " + studentIdx + " | TaskInfo idx " + taskIdx);

            //DTO 생성
            Score _score = new Score();

            //생성된 DTO에 가져온 객체 입력
            _score.setClassMembers(curStudent);
            _score.setTask(curTask);
            _score.setSection(curSection);
            _score.setSectionTasks(curSectionTasks);

            //아이디가 이미 있으면 입력해 주기
            if (object.has("scoreIdx")) {
                scoreIdx = object.get("scoreIdx").getAsLong();
                _score.setScoreIdx(scoreIdx);
                //아이디 출력
//                System.out.println("scoreIdx | " + scoreIdx);
            }


            //점수가 있으면 넣고 없으면 null값 대입
            if (object.has("score")) {
                String str = object.get("score").getAsString();
                score = new BigDecimal(str);

//                System.out.println("score | " + score);
            } else {
                score = null;
            }
            _score.setScore(score);
            Score result = scoreRepo.save(_score);
//            System.out.println(_score);


//            scoreRepo.updateScore(score, result.getTaskItemIdx());
//          score.setTaskScore(score);

        }
        return 0;
    }

    //11. 과제 정보를 출력해주는 기능 : 성적비율
    public List<Task> findTaskList(Long curClassIdx) {
        return taskRepo.findTaskByClassIdx(curClassIdx);
    }

    //11.AuthStudent의 Task 그래프 데이터를 조회해주는 기능
    public List<CMTaskScoreResponse> findAuthStudentTaskChart(Long taskIdx, Long authStudentIdx, Long curClassIdx) {

        List<Section> sectionList = sectionRepo.findSectionByauthClass_AuthClassIdxOrderBySectionIdx(curClassIdx);
        List<CMTaskScoreResponse> result = new ArrayList<>();

        for (Section section : sectionList) {
            CMTaskScoreMapping CMTaskScoreMapping = scoreRepo.findAuthStudentTaskChart(taskIdx, authStudentIdx, section.getSectionIdx());
            /*
            System.out.println("Score : "+CMTaskScoreMapping.getScore());
            System.out.println("MaxScore : " + CMTaskScoreMapping.getMaxScore());
            System.out.println("AVG : " +CMTaskScoreMapping.getAvg());*/

            CMTaskScoreResponse taskScoreRes = new CMTaskScoreResponse();

            taskScoreRes.setSectionName(section.getSectionName());

            if (CMTaskScoreMapping != null) {

                if(CMTaskScoreMapping.getCount() > 1) {
                    taskScoreRes.setScore(new BigDecimal(CMTaskScoreMapping.getAvg()));
                    taskScoreRes.setMaxScore(new BigDecimal(100.0));
                    taskScoreRes.setAvg(CMTaskScoreMapping.getAvg());
                } else {
                    taskScoreRes.setScore(CMTaskScoreMapping.getScore());
                    taskScoreRes.setMaxScore(CMTaskScoreMapping.getMaxScore());
                    taskScoreRes.setAvg(CMTaskScoreMapping.getAvg());
                }
            }
            result.add(taskScoreRes);
        }

        return result;
    }
}
