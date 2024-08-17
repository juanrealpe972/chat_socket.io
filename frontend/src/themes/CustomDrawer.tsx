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
    Button,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import FormatTextdirectionRToLIcon from "@mui/icons-material/FormatTextdirectionRToL";
import COLORS from "./colors.json"; 

export default function CustomDrawer() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [rightToLeft, setRightToLeft] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    const handleThemeChange = () => {
        setDarkMode(!darkMode);
    };

    const handleDirectionChange = () => {
        setRightToLeft(!rightToLeft);
    };

  // Crear el tema utilizando los colores importados de color.json
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
            <Typography variant="h6" sx={{ mb: 2 }}>
                Settings
            </Typography>
            <Grid container spacing={2}>
                {/* Toggle Buttons */}
                <Grid item xs={6}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <FormControlLabel
                            control={
                                <Switch checked={darkMode} onChange={handleThemeChange} />
                            }
                            label="Dark mode"
                        />
                        <Brightness4Icon />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <FormControlLabel
                            control={
                                <Switch
                                checked={rightToLeft}
                                onChange={handleDirectionChange}
                                />
                            }
                            label="Right to left"
                        />
                        <FormatTextdirectionRToLIcon />
                    </Box>
                </Grid>

                {/* Add more settings options here */}
                <Divider sx={{ width: "100%", my: 2 }} />

                    {/* Example Layout Options */}
                <Grid item xs={6}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Button variant="outlined">Apparent</Button>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Button variant="contained">Integrate</Button>
                    </Box>
                </Grid>
            </Grid>

            {/* Preset COLORS */}
            <Divider sx={{ width: "100%", my: 2 }} />
            <Typography variant="body2" sx={{ mb: 1 }}>
                Presets
            </Typography>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Box bgcolor={COLORS.palette.primary.main} height={40} />
                </Grid>
                <Grid item xs={3}>
                    <Box bgcolor={COLORS.palette.secondary.main} height={40} />
                </Grid>
                <Grid item xs={3}>
                    <Box bgcolor={COLORS.palette.success.main} height={40} />
                </Grid>
                <Grid item xs={3}>
                    <Box bgcolor={COLORS.palette.warning.main} height={40} />
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ p: 2 }} dir={rightToLeft ? "rtl" : "ltr"}>
                <IconButton onClick={toggleDrawer(true)}>
                    <SettingsIcon />
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
