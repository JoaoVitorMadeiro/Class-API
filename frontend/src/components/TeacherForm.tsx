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
} from '@mui/material';
import { teacherService } from '../services/api';
import { CreateTeacherDTO, Teacher } from '../types';

const TeacherForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<CreateTeacherDTO>({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const loadTeacher = async () => {
      if (id) {
        try {
          const data = await teacherService.getById(Number(id));
          setFormData({
            name: data.name,
            email: data.email,
            password: data.password,
          });
        } catch (error) {
          console.error('Erro ao carregar professor:', error);
          navigate('/teachers');
        }
      }
    };

    loadTeacher();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await teacherService.update(Number(id), formData as Teacher);
      } else {
        await teacherService.create(formData);
      }
      navigate('/teachers');
    } catch (error) {
      console.error('Erro ao salvar professor:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CreateTeacherDTO) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {id ? 'Editar Professor' : 'Novo Professor'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Nome"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Senha"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required={!id}
              />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" gap={2} justifyContent="flex-end">
                <Button
                  type="button"
                  variant="outlined"
                  onClick={() => navigate('/teachers')}
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

export default TeacherForm; 