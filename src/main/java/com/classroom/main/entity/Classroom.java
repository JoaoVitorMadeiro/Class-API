package com.classroom.main.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.classroom.main.entity.Utils.Turn;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "classroom")
public class Classroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name_class;

    private String School_segment;

    @Enumerated(EnumType.STRING)
    private Turn turn;

    @OneToOne
    @JoinColumn(name = "id_teacher")
    private Teacher id_teacher;

}
