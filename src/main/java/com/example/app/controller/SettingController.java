 package com.example.app.controller;

    import com.example.app.service.SettingService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Controller;
    import org.springframework.web.bind.annotation.*;
    import org.springframework.web.servlet.ModelAndView;
    import javax.servlet.http.HttpServletRequest;

    @Controller
    @RequiredArgsConstructor
    public class SettingController {

        @Autowired
        SettingService settingService;

        //1. 수정을 위해 기존 클래스 정보를 불러오거나, 새 클래스 생성페이지로 이동하는 기능
        @RequestMapping("settingClassPage")
        public ModelAndView settingClassPage(HttpServletRequest req) {
            return null;
        }

        //2. 클래스를 생성, 수정하는 기능
        @RequestMapping("updateClass")
        public ModelAndView updateClass(HttpServletRequest req) {
            return null;
        }

        //3. 새 클래스를 삭제하는 기능
        @RequestMapping("delClass")
        public ModelAndView delClass(HttpServletRequest req) {
            return null;
        }

        //4. 새 학생을 생성하는 기능
        @RequestMapping("addStudent")
        public ModelAndView addStudent(HttpServletRequest req) {
            return null;
        }

        //5. 새 학생을 삭제하는 기능
        @RequestMapping("delStudent")
        public ModelAndView delStudent(HttpServletRequest req) {
            return null;
        }

        //6. 새 학생을 수정하는 기능 (예정)

    }


