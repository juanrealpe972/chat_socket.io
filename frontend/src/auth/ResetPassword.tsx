import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomDrawer from "../themes/CustomDrawer";

export default function ResetPassword() {
    const defaultTheme = createTheme();

    React.useEffect(() => {
        document.title = 'La RED - Reset Password';
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Typography variant="h6" sx={{ padding: 2 }}>
                Logo
            </Typography>
            <CustomDrawer />
            <Container 
                component="main" 
                maxWidth="xs" 
                sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    padding: 3, 
                    borderRadius: 2,
                    bgcolor: 'background.default', 
                    boxShadow: 3 
                }}
            >
                <Box
                    sx={{
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center", 
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{ m: 1, color: "secondary.main" }}>
                        Recuperar Contraseña
                    </Typography>
                    {/* <Avatar sx={(theme) => ({ m: 1, bgcolor: theme.palette.my.dark_juan })}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={(theme) => ({ m: 1, color: theme.palette.my.light_juan })}>
                        Recuperar Contraseña
                    </Typography> */}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo electrónico"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Recuperar Contraseña
                        </Button>
                        <Link href="/login" variant="body2">
                            {"<-"}Volver
                        </Link>
                        <Link href="/home" variant="body2">
                            Inicio
                        </Link>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
