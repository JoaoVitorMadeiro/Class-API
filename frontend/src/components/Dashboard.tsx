import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { teacherService, classroomService } from '../services/api';
import { Turn, Classroom } from '../types';

interface DashboardStats {
  totalTeachers: number;
  totalClasses: number;
  activeClasses: number;
  recentClasses: Classroom[];
  turnDistribution: Array<{
    turn: Turn;
    count: number;
    percent: number;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [teachers, classes] = await Promise.all([
        teacherService.getAll(),
        classroomService.getAll(),
      ]);

      const classesByTurn = Object.values(Turn).map(turn => ({
        turn,
        count: classes.filter(c => c.turn === turn).length,
      }));

      const recentClasses = classes
        .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())
        .slice(0, 5);

      setStats({
        totalTeachers: teachers.length,
        totalClasses: classes.length,
        activeClasses: classes.filter(c => c.active).length,
        recentClasses,
        turnDistribution: classesByTurn.map(entry => ({
          turn: entry.turn,
          count: entry.count,
          percent: entry.count / classes.length,
        })),
      });
      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (!stats) {
    return <Typography>Erro ao carregar estatísticas</Typography>;
  }

  const renderCustomizedLabel = ({ turn, percent }: { turn: Turn; percent: number }) => {
    return `${turn}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Cards de Estatísticas */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total de Professores
              </Typography>
              <Typography variant="h4">{stats.totalTeachers}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total de Turmas
              </Typography>
              <Typography variant="h4">{stats.totalClasses}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Média de Turmas por Professor
              </Typography>
              <Typography variant="h4">
                {stats.totalTeachers > 0 
                  ? (stats.totalClasses / stats.totalTeachers).toFixed(1)
                  : '0'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Gráfico de Distribuição por Turno */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Distribuição de Turmas por Turno
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.turnDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="turn" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="count" name="Número de Turmas" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Gráfico de Pizza */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Proporção por Turno
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.turnDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {stats.turnDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Turmas Recentes */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Turmas Recentes
            </Typography>
            <Grid container spacing={2}>
              {stats.recentClasses.map((classItem) => (
                <Grid item xs={12} sm={6} md={4} key={classItem.id}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1">{classItem.name_class}</Typography>
                    <Typography variant="body2">
                      Turno: {classItem.turn}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Criada em: {new Date(classItem.createdDate).toLocaleDateString()}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 