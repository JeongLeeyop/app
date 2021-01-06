package com.example.app.service;

import com.example.app.common.AuthorityCode;
import com.example.app.model.domain.Account;
import com.example.app.model.domain.School;
import com.example.app.model.dto.request.accountRequest;
import com.example.app.repository.AccountRepository;
import com.example.app.repository.SeasonRepository;
import com.example.app.util.DateTimeHelper;
import com.example.app.util.PwUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.security.NoSuchAlgorithmException;
import java.sql.Timestamp;

@Service
public class AccountService {

    @Autowired
    AccountRepository accountRepo;
    @Autowired
    SeasonRepository seasonRepo;

    PwUtil pwUtil;

    //0. 로그인
    public Account signIn(String email, String password) throws NoSuchAlgorithmException {
        Account result = accountRepo.findAccountByUserEmail(email);
        //1.패스워드 체크
//        String pwHash = pwUtil.Encryption(password);
//        System.out.println( pwHash+ " == " + result.getUserPw());
        System.out.println(pwUtil.Encryption(password).toUpperCase()+" : "+result.getUserPw().toUpperCase());
        if (pwUtil.Encryption(password).toUpperCase().equals(result.getUserPw().toUpperCase())) {
            return result;
        }
        return null;
/*
        if(pwUtil.PWCheck(password,result.getUserPw())){
            return result;
        }else{
            return null;
        }*/

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
    public Account signUp(accountRequest accountReq) {
        Account account = new Account();
        Timestamp createDate = DateTimeHelper.timeStampNow();

        account.setCreateDate(createDate);
        account.setCurSemester(null);
        account.setGraduation(null);
        account.setUserEmail(accountReq.getEmail());
//        account.setUserIdx();
        account.setUserName(accountReq.getUsername());
        account.setUserPw(accountReq.getPassword());
        account.setAuthority(AuthorityCode.Teacher.getValue());
        Account result = accountRepo.save(account);

//        System.out.println("SignUp 결과값 : " + result);
        return result;
    }

}
