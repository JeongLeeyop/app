package com.example.app.controller;

import com.example.app.model.dto.request.accountRequest;
import com.example.app.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import javax.servlet.http.HttpServletRequest;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

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
//        try {
//
//            String pw = account.getPassword();
//            System.out.println(pw);
//
//            // SHA-256 MessageDigest의 생성
//            MessageDigest mdSHA256 = MessageDigest.getInstance("sha256");
//
//            // " Java 마스터! " 문자열 바이트로 메시지 다이제스트를 갱신
//            mdSHA256.update(pw.getBytes("UTF-8"));
//
//            // 해시 계산 반환값은 바이트 배열
//            byte[] sha256Hash = mdSHA256.digest();
//
//            // 바이트배열을 16진수 문자열로 변환하여 표시
//            StringBuilder hexSHA256hash = new StringBuilder();
//            for (byte b : sha256Hash) {
//                String hexString = String.format("%02x", b);
//                hexSHA256hash.append(hexString);
//            }
//
//            System.out.println(hexSHA256hash);
//        }catch(NoSuchAlgorithmException e){
//
//            e.printStackTrace();
//
//            SHA = null;
//
//        }

        return "redirect:login";
    }

    //3.회원정보 수정 (예정)

    //4.아이디 비밀번호 찾기 (예정)

}
