package com.classroom.main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.classroom.main.entity.Classroom;

@Repository
public interface ClassroomRepository extends JpaRepository<Classroom, Long> {

}
