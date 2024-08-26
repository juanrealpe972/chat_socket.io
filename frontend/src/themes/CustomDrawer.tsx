import React, { useState } from "react";
import {
    Box,
    IconButton,
    Drawer,
    Switch,
    Typography,
    Divider,
    Grid,
    FormControlLabel,
    MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import FormatTextdirectionRToLIcon from "@mui/icons-material/FormatTextdirectionRToL";
import COLORS from "./colors.json";
import { useNavigate } from "react-router-dom";
import { icono } from "../components/IconsAtom"; // Asegúrate de importar el icono
import { UserContext } from "../context/UserContext";

export default function CustomDrawer() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [rightToLeft, setRightToLeft] = useState(false);
    const idUser = JSON.parse(localStorage.getItem('user') || '0');
    const navigate = useNavigate();
    const { selectedColor, setSelectedColor } = UserContext()

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const handleDirectionChange = () => {
        setRightToLeft(!rightToLeft);
    };

    const handleLogout = async () => {
        try {
            localStorage.clear();
            navigate('/');
            setDrawerOpen(false); // Cerrar el drawer después de logout
        } catch (error) {
            console.error('Error logging out', error);
        }
    };

    const handleColorSelect = (color: string) => {
        setSelectedColor(color);
        setDrawerOpen(false); // Cerrar el drawer después de seleccionar el color
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: COLORS.palette.primary.main,
                light: COLORS.palette.primary.light,
                dark: COLORS.palette.primary.dark,
                contrastText: COLORS.palette.primary.contrastText,
            },
            secondary: {
                main: COLORS.palette.secondary.main,
                light: COLORS.palette.secondary.light,
                dark: COLORS.palette.secondary.dark,
                contrastText: COLORS.palette.secondary.contrastText,
            },
            background: {
                default: darkMode ? COLORS.palette.grey[900] : COLORS.palette.grey[50],
            },
            text: {
                primary: darkMode
                    ? COLORS.palette.common.white
                    : COLORS.palette.grey[900],
            },
        },
        direction: rightToLeft ? "rtl" : "ltr",
    });

    const drawerContent = (
        <Box sx={{ width: 300, padding: 2 }}>
            <MenuItem onClick={() => navigate(`/dashboard/profile/${idUser.id}`)}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Cerrar sesión</MenuItem>
            <Typography variant="h6" sx={{ mb: 2 }}>
                Ajustes
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <FormControlLabel
                            control={<Switch checked={darkMode} onChange={handleThemeChange} />}
                            label="Modo oscuro"
                        />
                        <Brightness4Icon />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <FormControlLabel
                            control={<Switch checked={rightToLeft} onChange={handleDirectionChange} />}
                            label="Cambiar dirección de menú"
                        />
                        <FormatTextdirectionRToLIcon />
                    </Box>
                </Grid>
            </Grid>

            <Divider sx={{ width: "100%", my: 2 }} />
            <Typography variant="body2" sx={{ mb: 1 }}>
                Preajustes de colores
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Box
                        bgcolor={COLORS.palette.primary.main}
                        height={40}
                        onClick={() => handleColorSelect(COLORS.palette.primary.main)}
                        sx={{ cursor: 'pointer' }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Box
                        bgcolor={COLORS.palette.secondary.main}
                        height={40}
                        onClick={() => handleColorSelect(COLORS.palette.secondary.main)}
                        sx={{ cursor: 'pointer' }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Box
                        bgcolor={COLORS.palette.success.main}
                        height={40}
                        onClick={() => handleColorSelect(COLORS.palette.success.main)}
                        sx={{ cursor: 'pointer' }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Box
                        bgcolor={COLORS.palette.warning.main}
                        height={40}
                        onClick={() => handleColorSelect(COLORS.palette.warning.main)}
                        sx={{ cursor: 'pointer' }}
                    />
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ p: 2 }} dir={rightToLeft ? "rtl" : "ltr"}>
                <IconButton onClick={toggleDrawer(true)}>
                    <icono.iconoAccountCircle />
                </IconButton>
                <Drawer
                    anchor={rightToLeft ? "left" : "right"}
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    {drawerContent}
                </Drawer>
            </Box>
        </ThemeProvider>
    );
}
