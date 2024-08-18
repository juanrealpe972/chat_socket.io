import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [auth, setAuth] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [user, setUser] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = await localStorage.getItem('token');
                const userData = await localStorage.getItem('user');

                if (token && userData) {
                    setAuth(true);
                    setUser(userData ? JSON.parse(userData).username : null); 
                } else {
                    setAuth(false);
                }
            } catch (error) {
                console.error('Error fetching auth data', error);
            }
        };

        checkAuth();
    }, []);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            localStorage.clear();
            setAuth(false);
            setUser(null);
            navigate('/'); 
        } catch (error) {
            console.error('Error logging out', error);
        }
        handleClose();
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Mi Aplicación
                </Typography>
                {auth && user ? (
                    <div>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Perfil</MenuItem>
                            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                        </Menu>
                    </div>
                    ) : (
                    <div>
                        <Button color="inherit" onClick={() => navigate('/login')}>Iniciar Sesión</Button>
                        <Button color="inherit" onClick={() => navigate('/register')}>Registrarse</Button>
                    </div>
                    )
                }
            </Toolbar>
        </AppBar>
    );
};

export default Header;
