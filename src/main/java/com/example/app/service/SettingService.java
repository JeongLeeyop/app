package com.example.app.service;

import com.example.app.common.GenderCode;
import com.example.app.model.domain.Account;
import com.example.app.model.domain.Class;
import com.example.app.model.domain.Student;
import com.example.app.model.domain.section.ClassDefaultTask;
import com.example.app.model.domain.section.TaskItemInfo;
import com.example.app.model.dto.request.classRequest;
import com.example.app.model.dto.request.studentRequest;
import com.example.app.model.dto.request.taskInfoRequest;
import com.example.app.repository.*;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class SettingService {

    @Autowired
    SettingRepository settingRepo;
    @Autowired
    StudentRepository studentRepo;
    @Autowired
    ClassRepository classRepo;
    @Autowired
    TaskItemInfoRepository taskInfoRepo;
    @Autowired
    ClassDefaultTaskRepository classDfRepo;
    @Autowired
    TaskItemRepository taskItemRepo;
    @Autowired
    SectionRepository sectionRepo;
    @Autowired
    SectionItemRepository sectionItemRepo;
    @Autowired
    AttendanceRepository attendanceRepo;


    @Transactional
    @Modifying
    @ResponseBody
    //0.클래스를 삭제하는 기능
    public void delClass(classRequest classReq) {
        Long ClassIdx = classReq.getClassIdx();

        System.out.println("서비스 delClass 진입");


        //Default 과제 항목 삭제
        classDfRepo.ClassDefaultTaskByClassIdx(ClassIdx);
        System.out.println("Default과제삭제");

        //SectionItem 삭제
        sectionItemRepo.DelSectionItemByClassIdx(ClassIdx);
        System.out.println("섹션항목 삭제");

        //과제 항목 데이터 삭제
        taskItemRepo.DelTaskItemByClassIdx(ClassIdx);
        System.out.println("과제항목데이터삭제");

        //섹션 삭제
        sectionRepo.DelSectionByClassIdx(ClassIdx);
        System.out.println("섹션 삭제");

        //과제 항목 삭제
        taskInfoRepo.DelTaskInfoByClassIdx(ClassIdx);
        System.out.println("과제항목삭제");

        //클래스 삭제
        classRepo.deleteById(ClassIdx);
        System.out.println("클래스 삭제");

        System.out.println("서비스 delClass 끝");
    }

    @ResponseBody
    @Transactional
    //1. 클래스의 과제를 생성하는 기능
    public void createTask(taskInfoRequest taskInfoReq ,Long classIdx) {

        //현재 클래스
        Class _class = classRepo.findById(classIdx).get();

        //과제항목의 정보
        TaskItemInfo taskInfo = new TaskItemInfo();
        ClassDefaultTask classDfTask = new ClassDefaultTask();

        //과제항목 도메인 세팅
        taskInfo.set_class(_class);
        taskInfo.setTaskGradeRatio(taskInfoReq.getGradeRatio());
        taskInfo.setTaskItemName(taskInfoReq.getTaskName());

        //과제항목정보 입력, 객체 반환
        TaskItemInfo result = taskInfoRepo.save(taskInfo);

        //Default가 체크 되있는 경우 Default과제 설정
        if(taskInfoReq.getCkDefault()==1) {
            classDfTask.set_class(_class);
            classDfTask.setTaskItemInfo(result);
            classDfRepo.save(classDfTask);
        }
    }

    @ResponseBody
    //2. 클래스의 과제를 조회하는 기능
    public List<TaskItemInfo> findTask(classRequest classReq) {
        List<TaskItemInfo> result = taskInfoRepo.findTaskItemInfoBy_class_ClassIdx(classReq.getClassIdx());
        System.out.println(result);
        return result;
    }

    @ResponseBody
    //2. 클래스의 Default 과제를 조회하는 기능
    public List<ClassDefaultTask> findDfTask(classRequest classReq) {
        List<ClassDefaultTask> result = classDfRepo.findClassDefaultTaskBy_class_ClassIdx(classReq.getClassIdx());
        System.out.println(result);
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
        taskItemRepo.DelTaskItemByTaskItemInfoIdx(taskIdx);
        System.out.println("과제항목데이터삭제");
        //Default 과제 삭제
        classDfRepo.deleteClassDefaultTaskByTaskItemInfoIdx(taskIdx);
        System.out.println("Default과제삭제");
        //sectionitem 과제 삭제
        sectionItemRepo.DelSectionItemByTaskIdx(taskIdx);

        //과제 항목 삭제
        taskInfoRepo.deleteById(taskIdx);
        System.out.println("과제항목삭제");
        System.out.println("서비스 deltask 끝");
    }

    //4. 클래스 정보를 입력, 수정하는 기능
    public Class updateClass(HttpSession session, classRequest classReq) {
        Class _class = new Class();
        _class.setClassMemo(null);
        _class.setClassName(classReq.getClassName());
        _class.setClassSectionName(classReq.getSectionName());
        _class.setAccount((Account)session.getAttribute("Account"));

        System.out.println("클래스 아이디는 : " + classReq.getClassIdx());
        if(classReq.getClassIdx() != null){
            _class.setClassIdx(classReq.getClassIdx());
        }
        return classRepo.save(_class);
    }

    //5. 새 학생을 생성하는 기능
    public Student addStudent(studentRequest studentReq, HttpSession session) {
        Student student = new Student();

        student.setAccount((Account) session.getAttribute("Account"));
        //session에서 가져오기

        //gender를 int타입으로 변형
        System.out.println(GenderCode.Male.getValue());
        if(studentReq.getStudentGender().equals("Male")){
            student.setStudentGender(GenderCode.Male.getValue());
        } else {
            student.setStudentGender(GenderCode.Female.getValue());
        }
        student.setStudentGrade(Integer.parseInt(studentReq.getStudentGrade()));
        student.setStudentName(studentReq.getStudentName());
        student.setStudentMemo(null);
        System.out.println(student);
        System.out.println("studentService 끝");
        return settingRepo.save(student);
    }

    //6. 기존 학생을 삭제하는 기능

    @Transactional
    @Modifying
    public void delStudent(Long studentIdx) throws Exception{

        Student student = studentRepo.findById(studentIdx).get();

        attendanceRepo.deleteByStudent(student);

        taskItemRepo.deleteByStudent(student);

        settingRepo.deleteById(studentIdx);
        //에러제어가 없다
    }

}
