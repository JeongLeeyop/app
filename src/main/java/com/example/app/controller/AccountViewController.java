package com.example.app.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;
import java.util.List;

@Controller
@Slf4j
public class AccountViewController {

    @RequestMapping("/login")
    public ModelAndView login() {
        log.debug("login");
        ModelAndView view = new ModelAndView("login");
        return view;
    }

    @RequestMapping("/register")
    public ModelAndView register() {
        log.debug("register");
        ModelAndView view = new ModelAndView("/guest/register");
        return view;
    }

    @RequestMapping("/user/myUpdate")
    public ModelAndView update() {
        log.debug("update");
        ModelAndView view = new ModelAndView("/user/myUpdate");
        return view;
    }
    
    @RequestMapping("/findId")
    public ModelAndView findId(){
        log.debug("findId");
        ModelAndView view = new ModelAndView("/guest/findId");
        return view;
    }
    
    @RequestMapping("/findPassword")
    public ModelAndView findPassword(){
        log.debug("findPassword");
        ModelAndView view = new ModelAndView("/guest/findPassword");
        return view;
    }
    
    @RequestMapping(value = "/logout")
    public ModelAndView logout() {
        log.debug("logout");
        ModelAndView view = new ModelAndView("/guest/index");
        return view;
    }
}