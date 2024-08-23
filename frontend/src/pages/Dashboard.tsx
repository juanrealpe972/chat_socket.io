import React, { useEffect } from 'react';
import { Container, Typography, Paper, Grid, Button } from '@mui/material';

function Dashboard() {

    useEffect(() => {
        document.title = 'La RED - Dasboard';
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt:5, px:2, minWidth: '320px' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, width: '100%', maxWidth: '1200px' }}>
                <Grid container spacing={0} alignItems="stretch">
                    <Grid item xs={12} md={6} 
                        sx={{
                            backgroundImage: 'url("https://i.pinimg.com/564x/46/46/70/46467000d1b89bdca2a094776387be85.jpg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            height: '300px',
                            borderRadius: { xs: '8px 8px 0 0', md: '8px 0 0 8px' },
                        }}
                    />
                    <Grid item xs={12} md={6}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            p: 4,
                            textAlign: 'center'
                        }}
                    >
                        <Typography variant="h4" component="h1" gutterBottom>
                            Bienvenido a la RED
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Esta aplicación web te permite chatear de manera fácil y rápida con diferentes personas. Con una interfaz responsiva y atractiva, podrás conectarte y mantener conversaciones en tiempo real desde cualquier dispositivo.
                        </Typography>
                        <Button variant="contained" color="primary" href="/dashboard/chat">
                            Comenzar a chatear
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Dashboard;
