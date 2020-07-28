package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Service
public class SettingService {

//    @Autowired
//    SettingRepository settingRepo;

    //0.클래스 생성 or 수정 페이지로 이동하는 기능
    public int settingClassPage(int a) {
        return 0;
    }

    @ResponseBody
    //1. 클래스의 과제를 생성하는 기능
    public int addTask(int a) {
        return 0;
    }

    @ResponseBody
    //2. 클래스의 과제를 수정하는 기능
    public int updateTask(int a) {
        return 0;
    }

    @ResponseBody
    //3. 클래스의 과제를 삭제하는 기능
    public int delTask(int a) {
        return 0;
    }

    //4. 클래스 정보를 입력, 수정하는 기능
    public int updateClass(int a) {
        return 0;
    }

    //5. 새 학생을 생성하는 기능
    public int addStudent(int a) {
        return 0;
    }

    //6. 기존 학생을 삭제하는 기능
    public int delStudent(int a) {
        return 0;
    }

}
