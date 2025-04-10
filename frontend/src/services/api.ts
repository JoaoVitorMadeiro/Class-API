import axios from 'axios';
import { Teacher, Classroom, CreateTeacherDTO, CreateClassroomDTO } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080'
});

export const teacherService = {
  getAll: async () => {
    const response = await api.get<Teacher[]>('/teacher');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<Teacher>(`/teacher/${id}`);
    return response.data;
  },
  
  create: async (teacher: CreateTeacherDTO) => {
    const response = await api.post<Teacher>('/teacher', teacher);
    return response.data;
  },
  
  update: async (id: number, teacher: Teacher) => {
    const response = await api.put<Teacher>(`/teacher/${id}`, teacher);
    return response.data;
  },
  
  delete: async (id: number) => {
    await api.delete(`/teacher/${id}`);
  }
};

export const classroomService = {
  getAll: async () => {
    const response = await api.get<Classroom[]>('/classroom');
    return response.data;
  },
  
  getById: async (id: number) => {
    const response = await api.get<Classroom>(`/classroom/${id}`);
    return response.data;
  },
  
  create: async (classroom: CreateClassroomDTO) => {
    const response = await api.post<Classroom>('/classroom', classroom);
    return response.data;
  },
  
  update: async (id: number, classroom: Classroom) => {
    const response = await api.put<Classroom>(`/classroom/${id}`, classroom);
    return response.data;
  },
  
  delete: async (id: number) => {
    await api.delete(`/classroom/${id}`);
  }
}; 