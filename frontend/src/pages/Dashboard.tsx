import React, { useEffect } from 'react';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ButtonWithColor from '../components/ButtonWithColor';
import { UserContext } from '../context/UserContext';

function Dashboard() {
    const navigate = useNavigate();
    const {selectedColor} = UserContext();

    useEffect(() => {
        document.title = 'La RED - Dashboard';
    }, []);

    return (
        <Container maxWidth="lg" sx={{ px: 2, minWidth: '320px' }} style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                height: 'calc(100vh - 150px)', 
                paddingTop: '0px', 
                paddingBottom: '0px'
            }}
        >
            <Paper elevation={3} sx={{ p: 5, borderRadius: 2, width: '100%', maxWidth: '1200px' }}>
                <Grid container spacing={2} alignItems="stretch">
                    <Grid item xs={12} md={6} sx={{
                            backgroundImage: 'url("https://i.pinimg.com/564x/46/46/70/46467000d1b89bdca2a094776387be85.jpg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: { xs: '200px', sm: '350px', md: '300px' }, 
                            borderRadius: { xs: '8px 8px 0 0', md: '8px 0 0 8px' },
                        }}
                    />
                    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                        <Typography variant="h5" component="h1" gutterBottom>
                            Bienvenido a la RED
                        </Typography>
                        <Typography variant="body2" paragraph>
                            Esta aplicación web te permite chatear de manera fácil y rápida con diferentes personas. Con una interfaz responsiva y atractiva, podrás conectarte y mantener conversaciones en tiempo real desde cualquier dispositivo.
                        </Typography>
                        <ButtonWithColor selectedColor={selectedColor} buttonText="Comenzar a chatear" />
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Dashboard;
