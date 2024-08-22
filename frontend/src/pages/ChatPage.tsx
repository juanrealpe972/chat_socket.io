import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Avatar, IconButton, Menu, MenuItem, List, ListItem, ListItemAvatar, ListItemText, TextField, Button } from '@mui/material';
import { MoreVert as MoreVertIcon, Send as SendIcon, Menu as MenuIcon } from '@mui/icons-material';

interface User {
    id: number;
    username: string;
    imagen: string | null;
    correo: string;
    estado: string;
    created_at: string;
}

interface Message {
    id: number;
    senderId: number;
    receiverId: number;
    content: string;
    timestamp: string;
}

function ChatPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/v1/users')
            .then(response => {
                setUsers(response.data.data);
                if (response.data.data.length > 0) {
                    setSelectedUser(response.data.data[0]);
                }
            })
            .catch(error => {
                console.error("Hubo un error al obtener los usuarios:", error);
            });
        
        // Simulación de mensajes
        const sampleMessages: Message[] = [
            {
                id: 1,
                senderId: 2,
                receiverId: 1,
                content: "Hola, ¿cómo estás?",
                timestamp: "2024-08-22T10:15:30Z"
            },
            {
                id: 2,
                senderId: 1,
                receiverId: 2,
                content: "¡Hola! Estoy bien, ¿y tú?",
                timestamp: "2024-08-22T10:16:10Z"
            },
            {
                id: 3,
                senderId: 2,
                receiverId: 1,
                content: "Todo bien, gracias. ¿Has tenido tiempo para revisar el proyecto?",
                timestamp: "2024-08-22T10:17:05Z"
            },
            {
                id: 4,
                senderId: 1,
                receiverId: 2,
                content: "Sí, lo revisé anoche. Parece que todo está en orden.",
                timestamp: "2024-08-22T10:18:45Z"
            },
            {
                id: 5,
                senderId: 2,
                receiverId: 1,
                content: "Perfecto. Entonces, seguimos adelante con la implementación.",
                timestamp: "2024-08-22T10:19:30Z"
            }
        ];
        setMessages(sampleMessages);
    }, []);

    const handleUserClick = (user: User) => {
        setSelectedUser(user);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSendMessage = () => {
        console.log(`Mensaje enviado a ${selectedUser?.username}: ${message}`);
        setMessage('');
    };

    return (
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} height="485px">
            <Paper elevation={3} sx={{ width: { xs: '100%', md: '300px' }, bgcolor: '#1E1E2D', color: '#FFF', padding: '16px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" gutterBottom>
                        Chat
                    </Typography>
                    <IconButton href="/profile">
                        <Avatar src="path-to-your-profile-pic.jpg" alt="Your Profile" />
                    </IconButton>
                </Box>
                {users.length > 0 && (
                    <List>
                        {users.map(user => (
                            <ListItem 
                                key={user.id} 
                                onClick={() => handleUserClick(user)} 
                                sx={{
                                    bgcolor: selectedUser?.id === user.id ? '#3a3a5c' : '#2D2D44', 
                                    borderRadius: '2px', 
                                    cursor: "pointer", 
                                    '&:hover': { bgcolor: '#3a3a5d' }
                                }}>
                                <ListItemAvatar>
                                    <Avatar src={user.imagen ? `http://localhost:3000/users/${user.imagen}` : undefined} alt={user.username} />
                                </ListItemAvatar>
                                <ListItemText primary={user.username} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>

            <Box flex={1} display="flex" flexDirection="column" bgcolor="#2D2D44" padding="16px">
                {selectedUser ? (
                    <>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                            <Box display="flex" alignItems="center">
                                <Avatar src={`http://localhost:3000/users/${selectedUser.imagen}`} alt={selectedUser.username} />
                                <Typography variant="h6" sx={{ color: '#FFF', ml: 2 }}>
                                    {selectedUser.username}
                                </Typography>
                            </Box>
                            <IconButton onClick={handleMenuOpen} sx={{ color: '#FFF' }}>
                                <MenuIcon />
                            </IconButton>
                            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                                <MenuItem onClick={handleMenuClose}>Ver perfil</MenuItem>
                                <MenuItem onClick={handleMenuClose}>Contactar por WhatsApp</MenuItem>
                            </Menu>
                        </Box>
                        <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between">
                            <Box flex={1} mb={2} sx={{ overflowY: 'auto', padding: '8px' }}>
                                {messages.map((msg, index) => (
                                    <Box
                                        key={index}
                                        display="flex"
                                        justifyContent={msg.senderId === selectedUser?.id ? 'flex-start' : 'flex-end'}
                                        mb={1}
                                    >
                                        <Box
                                            sx={{
                                                maxWidth: '70%',
                                                bgcolor: msg.senderId === selectedUser?.id ? '#3a3a5c' : '#4A90E2',
                                                color: '#FFF',
                                                padding: '10px',
                                                borderRadius: '10px',
                                                textAlign: 'left',
                                                alignSelf: 'flex-start'
                                            }}
                                        >
                                            <Typography variant="body2">
                                                {msg.content}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                            <Box display="flex" alignItems="center">
                                <TextField
                                    variant="outlined"
                                    placeholder={`Escribe un mensaje a ${selectedUser.username}`}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    sx={{ bgcolor: '#FFF', borderRadius: 1, flexGrow: 1, mr: 1 }}
                                />
                                <IconButton onClick={handleSendMessage} color="primary">
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                        <Typography variant="h6" sx={{ color: '#FFF' }}>
                            Selecciona un usuario para empezar a chatear.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default ChatPage;
