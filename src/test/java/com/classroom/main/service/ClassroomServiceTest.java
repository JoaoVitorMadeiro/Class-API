package com.classroom.main.service;

import com.classroom.main.controller.dto.ClassroomDTO;
import com.classroom.main.controller.dto.CreateClassroomDTO;
import com.classroom.main.model.Classroom;
import com.classroom.main.repository.ClassroomRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import static com.classroom.main.model.Utils.Turn.Morning;
import static com.classroom.main.model.Utils.Turn.Night;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

class ClassroomServiceTest {

    @Mock
    private ClassroomRepository repo;

    @InjectMocks
    private ClassroomService service;

    private Classroom classroom;
    private ClassroomDTO dto;
    private CreateClassroomDTO responseDto;

    @BeforeEach
    void setUp() {
        classroom = new Classroom();
        classroom.setId(any());
        classroom.setName_class("Classroom 1");
        classroom.setId_teacher(any());
        classroom.setTurn(Morning);
        classroom.setSchool_segment("Elementary");

        dto = new ClassroomDTO();
        dto.setId(any());
        dto.setName_class("Classroom 1");
        dto.setTurn(Morning);
        dto.setSchool_segment("Elementary");

        responseDto = new CreateClassroomDTO();
        responseDto.setId_teacher(any());
        responseDto.setName_class("Classroom 1");
        responseDto.setTurn(Morning);
        responseDto.setSchool_segment("Elementary");
    }

    @Test
    void getAllClassrooms() {

    }
}