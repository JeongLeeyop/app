package com.example.app.service;

import com.example.app.model.domain.Account;
import com.example.app.model.dto.request.accountRequest;
import com.example.app.repository.AccountRepository;
import com.example.app.util.DateTimeHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class AccountService {

    @Autowired
    AccountRepository accountRepo;

    //0. 로그인
    public Account signIn(String email, String password){
        System.out.println("service signIn() 진입");
        Account result = accountRepo.findAccountByUserEmail(email);
        System.out.println("emailcheck 결과" + result);
        System.out.println(password + " == " + result.getUserPw());
        if(password.equals(result.getUserPw())) {
            System.out.println("패스워드 일치함");
            return result;
        }else{
            System.out.println("패스워드 불일치");
            return null;
        }
    }

    //1. 이메일 중복체크
    public Account emailCheck(String email) {
        Account result = accountRepo.findAccountByUserEmail(email);
        return result;
    }

    //2. 아이디에 해당하는 비밀번호를 찾고 입력된 값을 해쉬화 하여 비교하기
    public int pwCompare(int a) {
        return 0;
    }

    //3. 회원가입
    public int signUp(accountRequest accountReq) {
        Account account = new Account();
        Timestamp createDate = DateTimeHelper.timeStampNow();

        account.setCreateDate(createDate);
        account.setCurSemester(null);
        account.setGraduation(null);
        account.setUserEmail(accountReq.getEmail());
//        account.setUserIdx();
        account.setUserName(accountReq.getUsername());
        account.setUserPw(accountReq.getPassword());
        Account result = accountRepo.save(account);
        System.out.println("SignUp 결과값 : " + result);
        return 0;
    }
}
