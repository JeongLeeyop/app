package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;

@Service
public class ClassService {

//    @Autowired
//    ClassRepository classRepo;

    //0. 계정에 저장된 클래스 목록을 불러와 메뉴에 출려개주는 기능
    public int findClass(int a) {
        return 0;
    }

    //1. 전체 학생 목록을 출력하여 등급 항목에 과제 항목의 점수를 반영하여 조회해주는 기능
    public int findTotalGrade(int a) {
        return 0;
    }

    //2. Setting에서 설정한 클래스 등급 비율을 표시해주는 기능
    public int findSetGradeRatio(int a) {
        return 0;
    }

    //3. 클래스의 섹션을 추가하는 기능
    public int addSection(int a) {
        return 0;
    }

    //4. 클래스의 섹션을 삭제하는 기능
    public int delSection(int a) {
        return 0;
    }

    //5. 클래스의 섹션의 이름을 수정하는 기능
    public int sectionName(int a) {
        return 0;
    }

    //6. 섹션의 과제 항목과 점수를 조회하는 기능
    public int findTask(int a) {
        return 0;
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
    public int scoreUpdate(int a) {
        return 0;
    }
}
