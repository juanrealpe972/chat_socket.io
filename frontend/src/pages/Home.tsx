import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

function Home() {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'LA RED';
    }, []);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="89vh"
            sx={{ background: 'linear-gradient(to right, #3b82f6, #8b5cf6)' }}
        >
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: 'white', boxShadow: 3, borderRadius: 2, p: 3, textAlign: 'center' }}>
                    <Typography variant="h4" fontWeight="bold" color="text.primary" gutterBottom>
                        ¡Bienvenido a la RED!
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Conéctate, comparte y colabora con otros usuarios.
                    </Typography>
                    <Button 
                        variant="contained" color="info" onClick={() => navigate('/login')}
                        sx={{ py: 1, px: 4, textTransform: 'none' }}
                    >
                        Empezar
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

export default Home;
