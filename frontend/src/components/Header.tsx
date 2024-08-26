import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChatIcon from './icons/ChatIcon';

const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar 
            position="static" 
            sx={{ backgroundColor: '#F7F4F3', color: '#071013' }}
        >
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item xs={6} sm={4} display="flex" alignItems="center">
                        <ChatIcon 
                            sx={{ fontSize: 35, color: 'primary.main', cursor: 'pointer' }} 
                            onClick={() => navigate('/dashboard')} 
                        />
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ pl: 2, display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                            onClick={() => navigate('/dashboard')}
                        >
                            RED
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={8} display="flex" justifyContent="flex-end">
                        <Button 
                            onClick={() => navigate('/login')} 
                            sx={{ color: '#071013' }}
                        >
                            Iniciar Sesión
                        </Button>
                        <Button 
                            onClick={() => navigate('/register')} 
                            sx={{ color: '#071013' }}
                        >
                            Registrarse
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
