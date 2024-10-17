package com.classroom.main.controller.dto;

import lombok.*;

import java.time.LocalDateTime;

import com.classroom.main.entity.Teacher;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TeacherDto {
    private String name;
    private String email;
    private String password;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    public static TeacherDto convetToDTO(Teacher teacher){
        TeacherDto dto = new TeacherDto();
        dto.setName(teacher.getName());
        dto.setEmail(teacher.getEmail());
        dto.setPassword(teacher.getPassword());
        dto.setCreatedDate(teacher.getCreatedDate());
        dto.setUpdatedDate(teacher.getUpdatedDate());
        return dto;
    }
}
