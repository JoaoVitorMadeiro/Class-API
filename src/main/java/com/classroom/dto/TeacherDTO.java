package com.classroom.dto;

import lombok.Data;

@Data
public class TeacherDTO {
    private Long idTeacher;
    private String name;
    private String email;
    private String password;
    private String createdDate;
} 