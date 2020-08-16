 package com.example.app.controller;

    import com.example.app.model.domain.Account;
    import com.example.app.model.domain.Class;
    import com.example.app.model.domain.Student;
    import com.example.app.model.domain.section.ClassDefaultTask;
    import com.example.app.model.domain.section.TaskItemInfo;
    import com.example.app.model.dto.request.classRequest;
    import com.example.app.model.dto.request.studentRequest;
    import com.example.app.model.dto.request.taskInfoRequest;
    import com.example.app.service.ClassService;
    import com.example.app.service.SettingService;
    import com.example.app.service.StudentService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.data.jpa.repository.Modifying;
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.servlet.ModelAndView;
    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpSession;
    import javax.transaction.Transactional;
    import java.util.List;
    import java.util.Optional;

 @Controller
    @RequiredArgsConstructor
    public class SettingController {

        @Autowired
        SettingService settingService;
        @Autowired
        ClassService classService;
        @Autowired
        StudentService studentService;

        //0. 클래스 목록을 조회하는 기능
        @RequestMapping("findClassList")
        @ResponseBody
        public List<Class> findClassList(HttpSession session) {
            List<Class> result = classService.findClassList(session);
            System.out.println("컨트롤러" + result);
            //에러제어 필요
            return result;
        }

         //1. 클래스를 조회하는 기능
         @RequestMapping("findClass")
         @ResponseBody
         public Class findClass(Long classIdx) {
             Optional<Class> result = classService.findClass(classIdx);
             System.out.println("findClass 결과");
             System.out.println(result.get());
             //Null일 경우 에러처리

             return result.get();
         }

        //2. 클래스를 생성, 수정하는 기능
        @RequestMapping("updateClass")
        @ResponseBody
        public String updateClass(HttpSession session,  classRequest classReq) throws Exception {
            Class _class = settingService.updateClass(session, classReq);
            if(_class!=null) {
                return "setting";
            } else {
                throw new Exception();
            }
        }

        //3. 새 클래스를 삭제하는 기능
        @RequestMapping("delClass")
        @ResponseBody
        public void delClass(classRequest classReq) throws Exception{
            try {
                settingService.delClass(classReq);
            } catch (Exception e){
                e.printStackTrace();
            }
        }

        //4. 과제 항목을 등록하는 기능
        @RequestMapping("createTask")
        @ResponseBody
        public void createTask(taskInfoRequest taskInfoReq, Long classIdx) throws Exception {
           settingService.createTask(taskInfoReq,classIdx);
        }

     //4. 과제 항목을 삭제하는 기능
     @RequestMapping("delTask")
     @ResponseBody
     public void delTask(Long taskIdx)throws Exception{
            try {
                System.out.println("컨트롤러 deltask 진입");
                settingService.delTask(taskIdx);
                System.out.println("컨트롤러 deltask 끝");
            } catch ( Exception e){
                e.printStackTrace();
                System.out.println(e.getMessage());
            }

     }

         //4. 과제 항목을 조회하는 기능
         @RequestMapping("findTask")
         @ResponseBody
         public List<TaskItemInfo> findTask(classRequest classReq) {
             List<TaskItemInfo> result = settingService.findTask(classReq);
             System.out.println("findTask 결과");
             System.out.println(result);
             return result;
         }

         //4. Default 과제 항목을 조회하는 기능
         @RequestMapping("findDfTask")
         @ResponseBody
         public List<ClassDefaultTask> findDfTask(classRequest classReq) {

             List<ClassDefaultTask> result = settingService.findDfTask(classReq);
             System.out.println("findDfTask 결과");
             System.out.println(result);

             return result;
         }


        //4. 학생을 조회하는 기능
        @RequestMapping("findStudent")
        @ResponseBody
        public List<Student> findStudent(HttpSession session)  {
            List<Student> result = studentService.findStudentList(session);
            return result;
        }

        //4. 새 학생을 생성하는 기능
        @ResponseBody
        @RequestMapping("addStudent")
        public String addStudent(studentRequest student, HttpSession session)  {
            System.out.println(student);
            Student result = settingService.addStudent(student,session);
            return null;

        }
        //5. 학생을 삭제하는 기능
        @ResponseBody
        @RequestMapping("delStudent")
        public void delStudent(Long studentIdx) throws Exception{
            System.out.println("컨트롤러 delStudent() 진입");
            settingService.delStudent(studentIdx);
            System.out.println("컨트롤러 delStudent() 끝");
        }

        //6. 새 학생을 수정하는 기능 (예정)

    }


