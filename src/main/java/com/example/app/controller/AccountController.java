package com.example.app.controller;

import com.example.app.common.AuthorityCode;
import com.example.app.model.domain.Account;
import com.example.app.model.dto.request.accountRequest;
import com.example.app.repository.AccountRepository;
import com.example.app.service.AccountService;
import com.example.app.util.PwUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.SessionScope;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.security.NoSuchAlgorithmException;
import java.util.NoSuchElementException;

@Controller
@RequiredArgsConstructor
public class AccountController {

    @Autowired
    AccountService accountService;

    PwUtil pwUtil;

    //자동 로그인
  /*  @Autowired
    AccountRepository testRepo;
    @RequestMapping("/test")
    @ResponseBody
    public void test(HttpSession session, HttpServletRequest req) {
        session.setAttribute("Account", testRepo.findAccountByUserEmail("anfdmavy777@naver.com"));
    }*/

    //1.로그인
    @PostMapping("/signIn")
    public String signIn(HttpServletResponse response, HttpSession session, HttpServletRequest req, Model model) throws Exception {
        String email = req.getParameter("email");
        String password = req.getParameter("password");

        //2. 로그인
        Account result = accountService.signIn(email,password);

        if(result!=null){
            session.setAttribute("Account",result);
            //관리자상태로 재로그인시 오류제어
            session.removeAttribute("Authority");

            if(result.getAuthority()==AuthorityCode.Admin.getValue()){
                session.setAttribute("Authority", AuthorityCode.Admin.getValue());
                return "redirect:admin";
            }
            return "redirect:attendance";
        } else {
            response.setContentType("text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();
            out.println("<script>alert('Login failed. Please check your Email or password.'); location.href='login';</script>");
            out.flush();
        }
        return null;
        }



    //2.로그아웃
    @RequestMapping("/logout")
    public String logout(HttpSession session, HttpServletResponse response) {
        session.removeAttribute("Account");
        session.removeAttribute("Authority");
        return "redirect:login";
    }

    //2.회원가입 버튼
    @RequestMapping("/signUp")
    public String signUp(accountRequest account, HttpServletRequest req,HttpServletResponse response) throws Exception{
        String hashPw = account.getPassword();
        //2. 해쉬화
        String pwHash = pwUtil.Encryption(hashPw);
//        System.out.println(pwHash);
        account.setPassword(pwHash);

        Account result = new Account();
        PrintWriter out = response.getWriter();
        try {
            //3. 저장
            result = accountService.signUp(account);
        } catch (NoSuchElementException e){
            out.println("<script>alert('Wrong School Code'); location.href='register';</script>");
            out.flush();
        }
            response.setContentType("text/html; charset=UTF-8");

            if (result != null) {
                out.println("<script>alert('You have successfully registered as a member.'); location.href='login';</script>");
                out.flush();
            } else {
                out.println("<script>alert('Failed to sign up as a membership.'); location.href='register';</script>");
                out.flush();
            }
            return null;

    }

    //2.이메일 중복확인 Ajax
    @RequestMapping("/emailCheck")
    @ResponseBody
    public String emailCheck(String memberEmail) throws Exception{
        //1. 이메일 중복 확인
        Account result = accountService.emailCheck(memberEmail);

        if (result == null){
            return "This email is available.";
        } else {
            return "This email is already in use.";
        }

    }


    //3.회원정보 수정 (예정)

    //4.아이디 비밀번호 찾기 (예정)

}
