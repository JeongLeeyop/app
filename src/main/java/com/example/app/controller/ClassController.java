package com.example.app.controller;

import com.example.app.model.domain.section.Section;
import com.example.app.model.domain.section.TaskItemInfo;
import com.example.app.service.ClassService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
public class ClassController {

    @Autowired
    ClassService classService;

    //1. 클래스의 섹션을 조회하는 기능
    @RequestMapping("findSectionList")
    @ResponseBody
    public List<Section> findSectionList(Long curClassIdx) {
        return classService.findSectionList(curClassIdx);
    }

    //1. 클래스의 섹션을 추가하는 기능
    @RequestMapping("addSection")
    @ResponseBody
    public Section addSection(Long curClassIdx, String sectionName) {
        return classService.addSection(curClassIdx,sectionName);
    }

    //2. 클래스의 섹션을 삭제하는 기능
    @RequestMapping("delSection")
    @ResponseBody
    public void delSection(Long curSectionIdx) {
        classService.delSection(curSectionIdx);

    }

    //3. 클래스의 섹션의 이름을 수정하는 기능
    @RequestMapping("sectionName")
    @ResponseBody
    public ModelAndView sectionName(HttpServletRequest req) {
        return null;
    }

    //4. 섹션의 과제 항목과 점수를 조회하는 기능
    @RequestMapping("findTaskChart")
    @ResponseBody
    public Map findTaskChart(Long curSectionIdx, Long curClassIdx, HttpSession session) {
        return classService.findTaskChart(curSectionIdx,curClassIdx,session);
    }

    //4. 섹션의 기본 템플릿 제공
    @RequestMapping("findTaskTemplate")
    @ResponseBody
    public Map findTaskTemplate(Long curClassIdx, HttpSession session) {
        return classService.findTaskTemplate(curClassIdx,session);
    }

    //5. 섹션의 과제 항목을 추가하는 기능
    @RequestMapping("addTask")
    @ResponseBody
    public Map<String, Object> addTask(Long curClassIdx,Long curSectionIdx) {
        return classService.addTask(curClassIdx,curSectionIdx);
    }

    //6. 섹션의 과제 항목을 삭제하는 기능
    @RequestMapping("class_delTask")
    public ModelAndView delTask(Long sectionItemIdx) {
        classService.delTask(sectionItemIdx);
        return null;
    }

    //7. 섹션의 과제 항목을 수정하는 기능
    @RequestMapping("class_changeTask")
    public ModelAndView taskName(Long sectionItemIdx,Long targetTaskIdx) {
        classService.changeTask(sectionItemIdx,targetTaskIdx);
        return null;
    }

    //8. 과제 점수를 입력, 수정하는 기능
    @RequestMapping("saveTaskScore")
    @ResponseBody
    public ModelAndView saveTaskScore(@RequestParam String taskChart, Long curSectionIdx) throws Exception{
        classService.saveTaskScore(taskChart,curSectionIdx);
        return null;
    }
}
