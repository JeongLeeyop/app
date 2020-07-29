package com.example.app.model.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class accountRequest {

    private String username;
    private String email;
    private String password;

}
