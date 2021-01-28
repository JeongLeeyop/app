 package com.example.app.controller;

    import com.example.app.model.domain.AuthStudent;
    import com.example.app.model.domain.Class;
    import com.example.app.model.domain.Season;
    import com.example.app.model.domain.Student;
    import com.example.app.model.domain.section.Task;
    import com.example.app.model.dto.request.classRequest;
    import com.example.app.model.dto.request.studentRequest;
    import com.example.app.model.dto.request.taskInfoRequest;
    import com.example.app.service.AdminService;
    import com.example.app.service.ClassService;
    import com.example.app.service.SettingService;
    import com.example.app.service.StudentService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.*;

    import javax.servlet.http.HttpSession;
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
        @Autowired
        AdminService adminService;

        //0. 클래스 목록을 조회하는 기능
        @RequestMapping("findClassList")
        @ResponseBody
        public List<Class> findClassList(Long curSeasonIdx,Long orderBy) {
            List<Class> result = classService.findClassList(curSeasonIdx,orderBy);
            //에러제어 필요
            return result;
        }

         //1. 클래스를 조회하는 기능
         @RequestMapping("findClass")
         @ResponseBody
         public Class findClass(Long classIdx) {
             Optional<Class> result = classService.findClass(classIdx);
//             System.out.println("findClass 결과");
//             System.out.println(result.get());
             //Null일 경우 에러처리

             return result.get();
         }

        //2. 클래스를 생성, 수정하는 기능
        @RequestMapping("updateClass")
        @ResponseBody
        public Class updateClass(HttpSession session, Long curSeasonIdx,  classRequest classReq) throws Exception {
            Class _class = settingService.updateClass(session, curSeasonIdx, classReq);
            if(_class!=null) {
                return _class;
            } else {
                throw new Exception();
            }
        }


        //4. 과제 항목을 등록하는 기능
        @RequestMapping("updateTask")
        @ResponseBody
        public void updateTask(taskInfoRequest taskInfoReq, Long authClassIdx) throws Exception {
           settingService.updateTask(taskInfoReq,authClassIdx);
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
     public Task findTask(Long taskIdx) {
         Task result = settingService.findTask(taskIdx);
//         System.out.println(result);
         return result;
     }

     //4. 과제 항목 목록을 조회하는 기능
     @RequestMapping("findTaskListByClassId")
     @ResponseBody
     public List<Task> findTaskListByClassId(classRequest classReq) {
            //classReq.. 뭐징 .. settingClass : authClassIdx로 사용
         List<Task> result = settingService.findTaskListByClassId(classReq);
//         System.out.println("findTaskListByClassId 결과");
//         System.out.println(result);
         return result;
     }

        //4. 권한이 허가된 학생의 리스트를 조회하는 기능
        @RequestMapping("findAuthStudent")
        @ResponseBody
        public List<AuthStudent> findAuthStudent(Long curSeasonIdx, HttpSession session,String authStudentGroup)  {
            List<AuthStudent> result = studentService.findAuthStudentList(curSeasonIdx,session,authStudentGroup);
            return result;
        }


         //4. 학생을 조회하는 기능
         @RequestMapping("findStudentInfo")
         @ResponseBody
         public Student findStudentInfo(Long studentIdx)  {
             Student result = studentService.findStudent(studentIdx);
             return result;
         }

         //4. 학생을 생성, 수정하는 기능
         @ResponseBody
         @RequestMapping("updateStudent")
         public String updateStudent(studentRequest student, Long curSeasonIdx,HttpSession session)  {
             Student result = settingService.updateStudent(student,curSeasonIdx,0,session);
             return null;
         }

        //4. 새 학생을 생성하는 기능
        @ResponseBody
        @RequestMapping("addStudent")
        public String addStudent(studentRequest student, HttpSession session)  {
            Student result = settingService.addStudent(student,session);
            return null;

        }
        /*//5. 학생을 삭제하는 기능
        @ResponseBody
        @RequestMapping("delStudent")
        public void delStudent(Long studentIdx) throws Exception{
//            System.out.println("컨트롤러 delStudent() 진입");
            settingService.delStudent(studentIdx);
//            System.out.println("컨트롤러 delStudent() 끝");
        }*/

        //6. 새 학생을 수정하는 기능 (예정)

     //1. 클래스의 섹션을 조회하는 기능
     @RequestMapping("findSeasonList")
     @ResponseBody
     public List<Season> findSeasonList(HttpSession session) {
         return adminService.findSeasonList(session);
     }

    }


