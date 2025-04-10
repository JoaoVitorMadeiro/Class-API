export enum Turn {
  Morning = 'Morning',
  Afternoon = 'Afternoon',
  Night = 'Night'
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
  id?: number;
  name_class: string;
  school_segment: string;
  turn: Turn;
  id_teacher: number;
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
} 