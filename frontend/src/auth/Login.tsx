import React, { useState } from 'react';
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
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      if(email === "" && password === ""){
        toast.error("Por favor llena todos los campos.", { autoClose: 3000 });
        setLoading(false);
      }else if(email === ""){
        toast.error("Ingresa un correo.");
        setLoading(false);
      }else if(password === ""){
        toast.error("Ingresa una contraseña.");
        setLoading(false);
      }else if(email === "juan@gmail.com" && password === "123456789") {
        navigation("/home")
      } else {
        toast.error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      }
    } catch (err) {
      console.error('Error de inicio de sesión:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
      <ToastContainer />
      <CssBaseline />
        <Grid item xs={false} sm={4} md={7}
          sx={{
            backgroundImage: 'url("../../public/img/image.png")',
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
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                  <Typography variant="body2" color="text.secondary" align="center">
                    {"¿No tienes una cuenta? "}
                    <Link href="/register" variant="body2" align='center'>
                      Regístrate
                    </Link>
                  </Typography>
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
