import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import Dashboard from './components/Dashboard';
import CreateLink from './components/CreateLink';
import Statistics from './components/Statistics';
import Search from './components/Search';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Главная</Button>
          <Button color="inherit" component={Link} to="/create-link">Создать ссылку</Button>
          <Button color="inherit" component={Link} to="/statistics">Статистика</Button>
          <Button color="inherit" component={Link} to="/search">Поиск</Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-link" element={<CreateLink />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;