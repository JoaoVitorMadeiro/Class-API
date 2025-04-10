package com.classroom.service;

import com.classroom.dto.TeacherDTO;
import com.classroom.entity.Teacher;
import com.classroom.repository.TeacherRepository;
import com.classroom.security.CryptoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final CryptoService cryptoService;

    @Autowired
    public TeacherService(TeacherRepository teacherRepository, CryptoService cryptoService) {
        this.teacherRepository = teacherRepository;
        this.cryptoService = cryptoService;
    }

    public List<TeacherDTO> findAll() {
        return teacherRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TeacherDTO findById(Long id) {
        return teacherRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    public TeacherDTO save(TeacherDTO teacherDTO) {
        Teacher teacher = new Teacher();
        teacher.setName(teacherDTO.getName());
        teacher.setEncryptedEmail(cryptoService.encryptEmail(teacherDTO.getEmail()));
        teacher.setPasswordHash(cryptoService.hashPassword(teacherDTO.getPassword()));
        
        Teacher savedTeacher = teacherRepository.save(teacher);
        return convertToDTO(savedTeacher);
    }

    public TeacherDTO update(Long id, TeacherDTO teacherDTO) {
        return teacherRepository.findById(id)
                .map(existingTeacher -> {
                    existingTeacher.setName(teacherDTO.getName());
                    if (teacherDTO.getEmail() != null) {
                        existingTeacher.setEncryptedEmail(cryptoService.encryptEmail(teacherDTO.getEmail()));
                    }
                    if (teacherDTO.getPassword() != null) {
                        existingTeacher.setPasswordHash(cryptoService.hashPassword(teacherDTO.getPassword()));
                    }
                    Teacher updatedTeacher = teacherRepository.save(existingTeacher);
                    return convertToDTO(updatedTeacher);
                })
                .orElse(null);
    }

    public void delete(Long id) {
        teacherRepository.deleteById(id);
    }

    private TeacherDTO convertToDTO(Teacher teacher) {
        TeacherDTO dto = new TeacherDTO();
        dto.setIdTeacher(teacher.getIdTeacher());
        dto.setName(teacher.getName());
        dto.setEmail(cryptoService.decryptEmail(teacher.getEncryptedEmail()));
        dto.setCreatedDate(teacher.getCreatedDate().toString());
        return dto;
    }
} 