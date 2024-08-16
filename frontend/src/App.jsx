import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';

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
      <BrowserRouter>
        <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route path="/" element={<Dashboard/>}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App