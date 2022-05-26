package com.example.app.model.dto.response;

import com.example.app.model.domain.Account;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class teacherAuthCountResponse {

    Account account;
    int authStudentCount;
    int authClassCount;

}
