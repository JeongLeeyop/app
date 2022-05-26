package com.example.app.model.dto.response.repository;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.sql.Timestamp;

public interface present {
     Timestamp getAtDate();
     Long getPresent();
}
