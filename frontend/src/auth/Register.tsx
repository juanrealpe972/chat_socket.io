import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const defaultTheme = createTheme();

export default function Register() {
  const [error, setError] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigation = useNavigate();

  useEffect(() => {
    document.title = 'La RED - register';
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); 
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleImageRemove = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const formData = new FormData();
    formData.append('username', data.get('username') as string);
    formData.append('correo', data.get('correo') as string);
    formData.append('password', data.get('password') as string);
    if (image) formData.append('imagen', image);

    try {
      const response = await axios.post('http://localhost:3000/v1/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      toast.success("Registro de usuario exitoso");
      navigation('/register');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error en el servidor');
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarme
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid item xs={12} marginY={2} className="flex justify-center">
              <input
                accept="image/*"
                className="hidden"
                id="image-upload"
                type="file"
                onChange={handleImageChange}
              />
              <label htmlFor="image-upload" className="cursor-pointer relative group">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-500 flex items-center justify-center overflow-hidden">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-500 text-center">Seleccionar Imagen</span>
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-60 text-center rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Seleccionar imagen
                </div>
              </label>
            </Grid>
            {imagePreview && (
              <Grid item xs={12} className="text-center" marginBottom={2}>
                <Button variant="outlined" color="secondary" onClick={handleImageRemove}>
                  Quitar Imagen
                </Button>
              </Grid>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Nombre completo"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="correo"
                  label="Correo electrónico"
                  name="correo"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Registrarme
            </Button>
            <Grid container className='justify-between items-center'>
              <Grid item>
                <Link href="/" variant="body2">
                  Inicio
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="body2" color="text.secondary" align="center">
                  {"¿Ya tienes una cuenta? "}
                  <Link href="/login" variant="body2" align='center'>
                    Iniciar sesión
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          {'Todos los derechos reservados © '}
          <Link color="inherit" href="https://github.com/juanrealpe972">
            Juan Realpe
          </Link>
          {' '}{new Date().getFullYear()}{'.'}
        </Typography>
      </Container>
    </ThemeProvider>
  );
}
