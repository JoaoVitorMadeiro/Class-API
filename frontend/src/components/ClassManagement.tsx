import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  MenuItem,
  Grid,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { classroomService } from '../services/api';
import { Classroom, Turn, CreateClassroomDTO } from '../types';

const ClassManagement: React.FC = () => {
  const [classes, setClasses] = useState<Classroom[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingClass, setEditingClass] = useState<Classroom | null>(null);
  const [formData, setFormData] = useState<CreateClassroomDTO>({
    name_class: '',
    turn: Turn.Morning,
    school_segment: '',
    id_teacher: 0,
    createdDate: '',
    updatedDate: '',
    active: true,
    teacher: null,
    students: []
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const data = await classroomService.getAll();
      setClasses(data);
    } catch (error) {
      console.error('Erro ao carregar turmas:', error);
    }
  };

  const handleOpenDialog = (classData?: Classroom) => {
    if (classData) {
      setEditingClass(classData);
      setFormData({
        name_class: classData.name_class,
        turn: classData.turn,
        school_segment: classData.school_segment,
        id_teacher: classData.id_teacher,
        createdDate: classData.createdDate,
        updatedDate: classData.updatedDate,
        active: classData.active,
        teacher: classData.teacher,
        students: classData.students
      });
    } else {
      setEditingClass(null);
      setFormData({
        name_class: '',
        turn: Turn.Morning,
        school_segment: '',
        id_teacher: 0,
        createdDate: '',
        updatedDate: '',
        active: true,
        teacher: null,
        students: []
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingClass(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingClass && editingClass.id) {
        await classroomService.update(editingClass.id, { ...editingClass, ...formData });
      } else {
        await classroomService.create(formData);
      }
      fetchClasses();
      handleCloseDialog();
    } catch (error) {
      console.error('Erro ao salvar turma:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta turma?')) {
      try {
        await classroomService.delete(id);
        fetchClasses();
      } catch (error) {
        console.error('Erro ao excluir turma:', error);
      }
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Gerenciamento de Turmas</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nova Turma
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Turno</TableCell>
              <TableCell>Segmento</TableCell>
              <TableCell>ID do Professor</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell>{classItem.name_class}</TableCell>
                <TableCell>{classItem.turn}</TableCell>
                <TableCell>{classItem.school_segment}</TableCell>
                <TableCell>{classItem.id_teacher}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpenDialog(classItem)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(classItem.id!)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingClass ? 'Editar Turma' : 'Nova Turma'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome da Turma"
                  value={formData.name_class}
                  onChange={(e) => setFormData({ ...formData, name_class: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Turno"
                  value={formData.turn}
                  onChange={(e) => setFormData({ ...formData, turn: e.target.value as Turn })}
                  required
                >
                  {Object.values(Turn).map((turn) => (
                    <MenuItem key={turn} value={turn}>
                      {turn}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Segmento Escolar"
                  value={formData.school_segment}
                  onChange={(e) => setFormData({ ...formData, school_segment: e.target.value })}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ID do Professor"
                  type="number"
                  value={formData.id_teacher}
                  onChange={(e) => setFormData({ ...formData, id_teacher: Number(e.target.value) })}
                  required
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default ClassManagement; 