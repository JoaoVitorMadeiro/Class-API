import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import TeacherList from './components/TeacherList';
import TeacherForm from './components/TeacherForm';
import ClassroomList from './components/ClassroomList';
import ClassroomForm from './components/ClassroomForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<TeacherList />} />
          <Route path="/teachers" element={<TeacherList />} />
          <Route path="/teachers/new" element={<TeacherForm />} />
          <Route path="/teachers/edit/:id" element={<TeacherForm />} />
          <Route path="/classrooms" element={<ClassroomList />} />
          <Route path="/classrooms/new" element={<ClassroomForm />} />
          <Route path="/classrooms/edit/:id" element={<ClassroomForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
