package com.example.app.service;

import com.example.app.common.GenderCode;
import com.example.app.model.domain.Account;
import com.example.app.model.domain.AuthClass;
import com.example.app.model.domain.Class;
import com.example.app.model.domain.Student;
import com.example.app.model.domain.section.Task;
import com.example.app.model.dto.request.classRequest;
import com.example.app.model.dto.request.studentRequest;
import com.example.app.model.dto.request.taskInfoRequest;
import com.example.app.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.List;

@Service
public class SettingService {

    @Autowired
    SettingRepository settingRepo;
    @Autowired
    StudentRepository studentRepo;
    @Autowired
    ClassRepository classRepo;
    @Autowired
    TaskRepository taskRepo;
    @Autowired
    ScoreRepository scoreRepo;
    @Autowired
    SectionRepository sectionRepo;
    @Autowired
    SeasonRepository seasonRepo;
    @Autowired
    SectionTasksRepository sectionTasksRepo;
    @Autowired
    AttendanceRepository attendanceRepo;
    @Autowired
    AuthClassRepository authClassRepo;


    @ResponseBody
    @Transactional
    //1. 클래스의 과제를 생성하는 기능
    public void updateTask(taskInfoRequest taskInfoReq ,Long authClassIdx) {

        //현재 클래스
        AuthClass authClass = authClassRepo.findById(authClassIdx).get();

        //과제항목의 정보
        Task task = new Task();
        //과제항목 도메인 세팅
        task.setAuthClass(authClass);
        task.setTaskGradeRatio(taskInfoReq.getGradeRatio());
        task.setTaskItemName(taskInfoReq.getTaskName());
        if(taskInfoReq.getTaskIdx()!=null) {
            task.setTaskIdx(taskInfoReq.getTaskIdx());
        }

        //과제항목정보 입력, 객체 반환
        Task result = taskRepo.save(task);

    }

    @ResponseBody
    //2. 클래스의 과제를 조회하는 기능
    public List<Task> findTaskListByClassId(classRequest classReq) {
        List<Task> result = taskRepo.findTaskByClassIdx(classReq.getClassIdx());
//        System.out.println(result);
        return result;
    }

    @ResponseBody
    //2. 클래스의 과제를 조회하는 기능
    public Task findTask(Long taskIdx) {
        Task result = taskRepo.findById(taskIdx).get();
        return result;
    }


    @ResponseBody
    //2. 클래스의 과제를 수정하는 기능
    public int updateTask(int a) {
        return 0;
    }

    //3. 클래스의 과제를 삭제하는 기능
    @ResponseBody
    @Transactional
    @Modifying
    public void delTask(Long taskIdx) throws Exception {
        System.out.println("서비스 deltask 진입");
        //과제 항목 데이터 삭제
        scoreRepo.DelScoreByTaskIdx(taskIdx);
        System.out.println("과제항목데이터삭제");
        //sectionitem 과제 삭제
        sectionTasksRepo.DelSectionTasksByTaskIdx(taskIdx);

        //과제 항목 삭제
        taskRepo.deleteById(taskIdx);
        System.out.println("과제항목삭제");
        System.out.println("서비스 deltask 끝");
    }

    //4. 클래스 정보를 입력, 수정하는 기능
    public Class updateClass(HttpSession session, Long curSeasonIdx, classRequest classReq){
        Class _class = new Class();

        //클래스 수정
        if(classReq.getClassIdx() != null){
            _class = classRepo.findById(classReq.getClassIdx()).get();
            _class.setClassName(classReq.getClassName());
        }
        //클래스 입력
        else {
            _class.setClassMemo(null);
            _class.setClassName(classReq.getClassName());
            _class.setClassSectionName(null);
            _class.setSeason(seasonRepo.findById(curSeasonIdx).get());
            _class.setClassGrade(null);

            _class.setAccount((Account) session.getAttribute("Account"));
        }
        return classRepo.save(_class);
    }

    //5. 새 학생을 생성하는 기능
    public Student addStudent(studentRequest studentReq, HttpSession session) {
        Student student = new Student();

        student.setAccount((Account) session.getAttribute("Account"));
        //session에서 가져오기

        //gender를 int타입으로 변형

        if(studentReq.getStudentGender().equals("Male")){
            student.setStudentGender(GenderCode.Male.getValue());
        } else {
            student.setStudentGender(GenderCode.Female.getValue());
        }
        student.setStudentGrade(Integer.parseInt(studentReq.getStudentGrade()));
        student.setStudentName(studentReq.getStudentName());
        student.setStudentMemo(null);

        if(studentReq.getStudentIdx()!=null){
            student.setStudentIdx(studentReq.getStudentIdx());
        }

        return settingRepo.save(student);
    }

    //5. 새 학생을 생성, 수정하는 기능
    public Student updateStudent(studentRequest studentReq,Long curSeasonIdx,int Type, HttpSession session) {
        //0 : create, update
        //1 : Gender update
        //2 : Grade update

        Student student = new Student();

        //update
        if(studentReq.getStudentIdx()!=null){
           student = studentRepo.findById(studentReq.getStudentIdx()).get();
        }
        //create
        else {
            student.setSeason(seasonRepo.findById(curSeasonIdx).get());
            student.setAccount((Account) session.getAttribute("Account"));
            student.setStudentMemo(null);
        }

        //Update,Create
        if(Type==0){
            //gender를 int타입으로 변형
            if(studentReq.getStudentGender().equals("Male")){
                student.setStudentGender(GenderCode.Male.getValue());
            } else {
                student.setStudentGender(GenderCode.Female.getValue());
            }
            student.setStudentGrade(Integer.parseInt(studentReq.getStudentGrade()));
            student.setStudentName(studentReq.getStudentName());
        }
        //Gender
        else if(Type==1) {
            if(studentReq.getStudentGender().equals("Male")){
                student.setStudentGender(GenderCode.Male.getValue());
            } else {
                student.setStudentGender(GenderCode.Female.getValue());
            }
        }
        // Grade
        else if(Type==2){
            student.setStudentGrade(Integer.parseInt(studentReq.getStudentGrade()));
        }
        return settingRepo.save(student);
    }

    //6. 기존 학생을 삭제하는 기능

    @Transactional
    @Modifying
    public void delStudent(Long studentIdx) throws Exception{

        Student student = studentRepo.findById(studentIdx).get();

        attendanceRepo.deleteByStudent(student);

        scoreRepo.deleteByStudent(student);

        settingRepo.deleteById(studentIdx);
        //에러제어가 없다
    }

}
