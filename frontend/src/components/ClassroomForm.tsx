import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { classroomService, teacherService } from '../services/api';
import { CreateClassroomDTO, Teacher, Turn } from '../types';

const ClassroomForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [formData, setFormData] = useState<CreateClassroomDTO>({
    name_class: '',
    school_segment: '',
    turn: Turn.Morning,
    id_teacher: 0,
    createdDate: '',
    updatedDate: '',
    active: true,
    teacher: null,
    students: []
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const teachersData = await teacherService.getAll();
        setTeachers(teachersData);

        if (id) {
          const classroomData = await classroomService.getById(Number(id));
          setFormData({
            name_class: classroomData.name_class,
            school_segment: classroomData.school_segment,
            turn: classroomData.turn,
            id_teacher: classroomData.id_teacher,
            createdDate: classroomData.createdDate,
            updatedDate: classroomData.updatedDate,
            active: classroomData.active,
            teacher: classroomData.teacher,
            students: classroomData.students
          });
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        navigate('/classrooms');
      }
    };

    loadData();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await classroomService.update(Number(id), {
          ...formData,
          id: Number(id),
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString(),
          active: true,
          teacher: teachers.find(t => t.idTeacher === formData.id_teacher) || null,
          students: []
        });
      } else {
        await classroomService.create({
          ...formData,
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString(),
          active: true,
          teacher: teachers.find(t => t.idTeacher === formData.id_teacher) || null,
          students: []
        });
      }
      navigate('/classrooms');
    } catch (error) {
      console.error('Erro ao salvar turma:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev: CreateClassroomDTO) => ({
      ...prev,
      [name as string]: name === 'id_teacher' ? Number(value) : value,
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {id ? 'Editar Turma' : 'Nova Turma'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome da Turma"
                name="name_class"
                value={formData.name_class}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Segmento Escolar"
                name="school_segment"
                value={formData.school_segment}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Turno</InputLabel>
                <Select
                  name="turn"
                  value={formData.turn}
                  label="Turno"
                  onChange={handleChange}
                >
                  {Object.values(Turn).map((turn) => (
                    <MenuItem key={turn} value={turn}>
                      {turn}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Professor</InputLabel>
                <Select
                  name="id_teacher"
                  value={formData.id_teacher.toString()}
                  label="Professor"
                  onChange={handleChange}
                >
                  {teachers.map((teacher: Teacher) => (
                    <MenuItem key={teacher.idTeacher} value={teacher.idTeacher?.toString() ?? ''}>
                      {teacher.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => navigate('/classrooms')}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Salvar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default ClassroomForm; 