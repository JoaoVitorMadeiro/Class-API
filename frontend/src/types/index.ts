export enum Turn {
  Morning = 'MORNING',
  Afternoon = 'AFTERNOON',
  Night = 'NIGHT'
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'TEACHER';
}

export interface Class {
  id: number;
  name: string;
  turn: Turn;
  teacherId: number;
  teacherName: string;
  studentCount: number;
}

export interface AttendanceRecord {
  id: number;
  classId: number;
  date: string;
  presentCount: number;
  absentCount: number;
}

export interface Teacher {
  idTeacher?: number;
  name: string;
  email: string;
  password: string;
  createdDate?: string;
  updatedDate?: string;
}

export interface Classroom {
  id: number;
  name_class: string;
  turn: Turn;
  school_segment: string;
  id_teacher: number;
  createdDate: string;
  updatedDate: string;
  active: boolean;
  teacher: Teacher | null;
  students: Student[];
}

export interface Student {
  id: number;
  name: string;
  email: string;
  classroom: Classroom;
}

export interface CreateTeacherDTO {
  name: string;
  email: string;
  password: string;
}

export interface CreateClassroomDTO {
  name_class: string;
  turn: Turn;
  school_segment: string;
  id_teacher: number;
  createdDate: string;
  updatedDate: string;
  active: boolean;
  teacher: Teacher | null;
  students: Student[];
} 