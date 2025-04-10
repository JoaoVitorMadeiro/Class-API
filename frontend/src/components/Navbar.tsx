import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Sistema de Gestão Escolar
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={RouterLink} to="/teachers">
            Professores
          </Button>
          <Button color="inherit" component={RouterLink} to="/classrooms">
            Turmas
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 