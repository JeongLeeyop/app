package com.example.app.model.dto.response.repository;

import java.sql.Timestamp;

public interface AtSummaryResponse {

     Timestamp getAtDate();
     Long getAtState();
     Long getCount();

}