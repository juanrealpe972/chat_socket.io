import React from 'react';
import { Container, Typography, Link, Grid, Box } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box component="footer" sx={{ bgcolor: '#F7F4F3', color: '#071013', py: 4 }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Tu Compañía
                        </Typography>
                        <Typography variant="body2">
                            &copy; {new Date().getFullYear()} Tu Compañía. Todos los derechos reservados.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Enlaces
                        </Typography>
                        <Link href="/privacy" color="inherit" underline="hover" sx={{ display: 'block', mt: 1 }}>
                            Política de Privacidad
                        </Link>
                        <Link href="/terms" color="inherit" underline="hover" sx={{ display: 'block', mt: 1 }}>
                            Términos de Servicio
                        </Link>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contacto
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Dirección: Calle Falsa 123, Ciudad Ejemplo
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Email: info@tucompania.com
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            Teléfono: +1 234 567 890
                        </Typography>
                    </Grid>
                </Grid>
                <Box mt={4} textAlign="center">
                    <Typography variant="body2">
                        Diseñado por Tu Compañía
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
