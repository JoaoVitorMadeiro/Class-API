import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { classroomService, teacherService } from '../services/api';
import { Classroom, Teacher } from '../types';

const ClassroomList = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [teachers, setTeachers] = useState<Record<number, Teacher>>({});
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const [classroomsData, teachersData] = await Promise.all([
        classroomService.getAll(),
        teacherService.getAll(),
      ]);
      
      const teachersMap = teachersData.reduce((acc, teacher) => {
        if (teacher.idTeacher) {
          acc[teacher.idTeacher] = teacher;
        }
        return acc;
      }, {} as Record<number, Teacher>);

      setClassrooms(classroomsData);
      setTeachers(teachersMap);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta turma?')) {
      try {
        await classroomService.delete(id);
        loadData();
      } catch (error) {
        console.error('Erro ao excluir turma:', error);
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Turmas</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/classrooms/new')}
        >
          Nova Turma
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Segmento</TableCell>
              <TableCell>Turno</TableCell>
              <TableCell>Professor</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classrooms.map((classroom) => (
              <TableRow key={classroom.id}>
                <TableCell>{classroom.name_class}</TableCell>
                <TableCell>{classroom.school_segment}</TableCell>
                <TableCell>{classroom.turn}</TableCell>
                <TableCell>
                  {teachers[classroom.id_teacher]?.name || 'Professor não encontrado'}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/classrooms/edit/${classroom.id}`)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => classroom.id && handleDelete(classroom.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ClassroomList; 