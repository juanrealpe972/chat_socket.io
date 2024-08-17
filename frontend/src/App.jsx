import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';

import Dashboard from './components/Dashboard';
import Home from './pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import ResetPassword from './auth/ResetPassword';
import Help from './pages/Help';
import colors from './themes/colors.json';

const theme = createTheme(colors); 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Dashboard/>}>
            <Route path="help" element={<Help />} />
            <Route path='home' index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App