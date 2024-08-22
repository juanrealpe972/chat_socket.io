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
import { AuthProvider } from './context/UserContext';
import Profile from './pages/Profile';
import ChatPage from './pages/ChatPage';

const theme = createTheme(colors); 

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<AppBar/>}>
              <Route index element={<Home />} />
              <Route path="/help" element={<Help />} />
              <Route path='/' element={<ProtectedRoute />}>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/dashboard/profile/:id' element={<Profile />} />
                <Route path='/dashboard/chat' element={<ChatPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App