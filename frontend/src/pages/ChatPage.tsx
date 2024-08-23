import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, Typography, Paper, Avatar, IconButton, Menu, MenuItem, List, ListItem, ListItemAvatar, ListItemText, TextField, Button } from '@mui/material';
import { Send as SendIcon, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

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
    username: string;
    message: string;
    sent_at: string;
}

function ChatPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [chatId, setChatId] = useState<number | null>(null);
    const userData = localStorage.getItem('user');
    const parsedUserData = userData ? JSON.parse(userData) : null;
    const navigate = useNavigate();
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        document.title = 'La RED - Chat';
        axios.get(`http://localhost:3000/v1/users/${parsedUserData.id}`).then(response => {
            setUsers(response.data.data);
        })
        .catch(error => {
            console.error("Hubo un error al obtener los usuarios:", error);
        });
    }, []);

    useEffect(() => {
        if (selectedUser && chatId) {
            const getMessages = async () => {
                await axios.get(`http://localhost:3000/v1/${chatId}/messages`)
                .then((response) => {
                    if (response.status === 200) {
                        setMessages(response.data.data);
                    } else if (response.status === 404) {
                        setMessages([]);
                        console.warn("No se encontraron mensajes para este chat.");
                    } else {
                        console.warn("Mensaje del servidor:", response.data.message);
                    }
                })
                .catch(error => {
                    if (error.response && error.response.status === 404) {
                        console.warn("No se encontraron mensajes. (Error 404)", error);
                        setMessages([]); 
                    } else {
                        console.error("Hubo un error al obtener los mensajes:", error);
                    }
                });
            }
            getMessages();
        }
    }, [selectedUser, chatId]);

    const handleUserClick = (user: User) => {
        setSelectedUser(user);

        const localUserId = parsedUserData.id; 
        axios.post('http://localhost:3000/v1/create_or_join', {
            user1_id: localUserId,
            user2_id: user.id
        })
        .then((response) => {
            const receivedChatId = response.data.chat_id;
            setChatId(receivedChatId);
        })
        .catch(error => {
            console.error("Hubo un error al crear o unirse al chat:", error);
        });
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const userProfile = (userID : User) => {
        handleMenuClose();
        navigate(`/dashboard/profile/${userID.id}`)
    } 

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (chatId) {
            axios.post(`http://localhost:3000/v1/${chatId}/messages`, { sender_id: parsedUserData.id, message: message }).then(response => {
                const newMessage = {
                    id: response.data.id,
                    username: parsedUserData.username,
                    message: message,
                    sent_at: new Date().toISOString()
                };
                setMessages(prevMessages => [...prevMessages, newMessage]);
                setMessage('');
            })
            .catch(error => {
                console.error("Hubo un error al enviar el mensaje:", error);
            });
        }
    };

    return (
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} height="485px">
            <Paper elevation={3} sx={{ width: { xs: '100%', md: '300px' }, bgcolor: '#1E1E2D', color: '#FFF', padding: '16px' }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" gutterBottom>
                        Chat
                    </Typography>
                    <IconButton href={`/dashboard/profile/${parsedUserData.id}`}>
                        <Avatar src={`http://localhost:3000/users/${parsedUserData.imagen}`} alt="Your Profile" />
                    </IconButton>
                </Box>
                {users.length > 0 && (
                    <List>
                        {users.map(user => (
                            <ListItem 
                                key={user.id} 
                                onClick={() => handleUserClick(user)} 
                                sx={{bgcolor: selectedUser?.id === user.id ? '#3a3a5c' : '#2F4550', borderRadius: '2px', cursor: "pointer", '&:hover': { bgcolor: '#3a3a5d' }}}
                            >
                                <ListItemAvatar>
                                    <Avatar src={user.imagen ? `http://localhost:3000/users/${user.imagen}` : undefined} alt={user.username} />
                                </ListItemAvatar>
                                <ListItemText primary={user.username} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>

            <Box flex={1} display="flex" flexDirection="column" bgcolor="#2D2D44">
                {selectedUser ? (
                    <>
                        <Box display="flex" justifyContent="space-between" alignItems="center" bgcolor="#2F4550" padding="10px">
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
                                <MenuItem onClick={() => userProfile(selectedUser)}>Ver perfil</MenuItem>
                                {/* <MenuItem onClick={handleMenuClose}>Contactar por WhatsApp</MenuItem> */}
                            </Menu>
                        </Box>
                        <Box flex={1} display="flex" flexDirection="column" justifyContent="space-between" bgcolor="black" height="1px">
                            <Box flex={1}
                                sx={{ overflowY: 'auto', padding: '20px', scrollBehavior: 'smooth',
                                    '&::-webkit-scrollbar': { width: '8px' },
                                    '&::-webkit-scrollbar-thumb': { backgroundColor: '#888', borderRadius: '10px' },
                                    '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#555' },
                                    '&::-webkit-scrollbar-track': { backgroundColor: '#f1f1f1' },
                                }}
                            >
                                {messages ? messages.map((msg, index) => (
                                    <Box key={index} display="flex" justifyContent={msg.username === parsedUserData.username ? 'flex-end' : 'flex-start'} mb={1}>
                                        <Box
                                            sx={{
                                                maxWidth: '70%',
                                                bgcolor: msg.username === parsedUserData.username ? '#2F4550' : '#4A90E2',
                                                color: '#FFF',
                                                padding: '10px',
                                                borderRadius: '10px',
                                                textAlign: 'left',
                                                alignSelf: 'flex-start'
                                            }}
                                        >
                                            <Typography variant="body2">{msg.message}</Typography>
                                            <Typography variant="caption" sx={{ display: 'block', textAlign: msg.username === parsedUserData.username ? 'right' : 'left', color: '#BBB' }}>
                                                {new Date(msg.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )) : (
                                    ""
                                )}
                            </Box>
                            <Box display="flex" alignItems="center" bgcolor="#2F4550" height={60} paddingX={2}>
                                <TextField
                                    placeholder={`Escribe un mensaje a ${selectedUser.username}`}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    sx={{ bgcolor: '#FFF', borderRadius: 1, flexGrow: 1, mr: 1,
                                        '& .MuiInputBase-input': { padding: '10px 10px', fontSize: '14px', },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: '#E0E0E0',  },
                                            '&:hover fieldset': { borderColor: '#4A90E2',  },
                                        },
                                        '&:hover': { bgcolor: '#F5F5F5',  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', },
                                    }}
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
