package com.example.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

//    @Autowired
//    AccountRepository accountRepo;

    //1. 아이디 찾기
    public int findId(int a) {
        return 0;
    }

    //2. 아이디에 해당하는 비밀번호를 찾고 입력된 값을 해쉬화 하여 비교하기
    public int pwCompare(int a) {
        return 0;
    }

    //3. 이메일 중복체크
    public int emailCheck(int a) {
        return 0;
    }
}
