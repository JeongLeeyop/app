package com.example.app.controller;

import com.example.app.model.domain.Account;
import com.example.app.model.dto.request.accountRequest;
import com.example.app.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.SessionScope;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequiredArgsConstructor
public class AccountController {

    @Autowired
    AccountService accountService;

    //1.로그인
    @PostMapping("/signIn")
    public String signIn(HttpSession session, HttpServletRequest req) {
        String email = req.getParameter("email");
        String password = req.getParameter("password");
        System.out.println(email);
        System.out.println(password);
        //1. 해쉬화

        //2. 로그인
        Account result = accountService.signIn(email,password);
        if(result!=null){
            System.out.println("로그인 성공");
            session.setAttribute("Account",result);
//            ModelAndView mv = new ModelAndView();
//            mv.setViewName("student");
//            mv.addObject("userEmail",result.getUserEmail());
//            mv.addObject("userName",result.getUserName());
//            model.addAttribute("userEmail",result.getUserEmail());
//            model.addAttribute("userName",result.getUserName());
            return "redirect:student";
        } else {
            System.out.println("로그인 실패");
            ModelAndView mv = new ModelAndView();
            mv.setViewName("login");
            return null;
            //에러 출력 해줄 것
        }
//
    }

    //2.로그아웃
    @RequestMapping("/logout")
    public String logout(HttpSession session) {
        session.removeAttribute("Account");
        return "redirect:login";
    }

    //2.회원가입 버튼
    @RequestMapping("/signUp")
    public String signUp(accountRequest account, HttpServletRequest req) throws Exception{
        System.out.println("SignUp 메소드 진입");
        //1. 이메일 중복 확인
        Account result = accountService.emailCheck(account.getEmail());
        System.out.println(result);
        System.out.println("이메일 중복 확인 메소드");
        if(result!=null){
            System.out.println("이메일 중복!!");
            throw new Exception();
        }

        //2. 해쉬화

        //3. 저장
        accountService.signUp(account);

        return "redirect:login";
    }

    //3.회원정보 수정 (예정)

    //4.아이디 비밀번호 찾기 (예정)

}
