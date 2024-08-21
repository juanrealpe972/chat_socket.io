import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardContent } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const defaultTheme = createTheme();

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      if (correo === "" && password === "") {
        setError("Por favor llena todos los campos.");
        setLoading(false);
      } else if (correo === "") {
        setError("Ingresa un correo.");
        setLoading(false);
      } else if (password === "") {
        setError("Ingresa una contraseña.");
        setLoading(false);
      } else {
        const response = await axios.post('http://localhost:3000/v1/login', { correo, password });
        if (response.status === 200) {
          const { user, token } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          toast.success("Inicio de sesión exitoso");
          navigation("/dashboard");
        }
      }
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data.message); 
      } else {
        toast.error('Error de inicio de sesión. Por favor, intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
        <Grid item xs={false} sm={4} md={7}
          sx={{
            backgroundImage: 'url("../../public/img/imageLogin.png")',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: '100%',
            backgroundPosition: 'center', 
            backgroundRepeat: 'no-repeat',
          }}
        />
        <Grid className='flex' item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box className="flex mx-8 flex-col justify-center items-center">
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="correo"
                label="Correo electrónico"
                name="correo"
                autoComplete="email"
                autoFocus
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && (
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Iniciar sesión'}
              </Button>
              <Link href="/reset" variant="body2" sx={{ display: 'block', textAlign: 'center' }}>
                ¿Has olvidado la contraseña?
              </Link>
              <Card sx={{ minWidth: 275, mt: 2 }} variant="outlined">
                <CardContent>
                  <Grid container className='justify-between items-center'>
                    <Grid item>
                      <Link href="/" variant="body2">
                        Inicio
                      </Link>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2" color="text.secondary" align="center">
                        {"¿No tienes una cuenta? "}
                        <Link href="/register" variant="body2" align='center'>
                        Regístrate
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                {'Todos los derechos reservados © '}
                <Link color="inherit" href="https://github.com/juanrealpe972">
                  Juan Realpe
                </Link>
                {' '}{new Date().getFullYear()}{'.'}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
