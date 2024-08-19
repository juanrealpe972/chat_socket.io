import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Login from './auth/Login';
import Register from './auth/Register';
import ResetPassword from './auth/ResetPassword';
import Help from './pages/Help';
import colors from './themes/colors.json';
import AppBar from './components/AppBar';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

const theme = createTheme(colors); 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="reset" element={<ResetPassword />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<AppBar/>}>
            <Route index element={<Home />} />
            <Route path="help" element={<Help />} />
            <Route path='/dashboard' element={<ProtectedRoute />}>
              <Route path='dashboard' index element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App