package com.example.app.controller;

import com.example.app.model.dto.request.accountRequest;
import com.example.app.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequiredArgsConstructor
public class AccountController {

    @Autowired
    AccountService accountService;

    //1.로그인
    @PostMapping("/signIn")
    public ModelAndView signIn(HttpServletRequest req) {
        String email = req.getParameter("email");
        String password = req.getParameter("password");

//      cartService.insert(cart,idx);
//      cartService.insert(cart,idx);
//      return new ModelAndView("/user/cart", "cartList", list);
//      return "redirect:/user/cart";
        return null;
    }

    //2.회원가입 버튼
    @RequestMapping("/signUp")
    public String signUp(accountRequest account, HttpServletRequest req) {
        return "redirect:login";
    }

    //3.회원정보 수정 (예정)

    //4.아이디 비밀번호 찾기 (예정)

}
