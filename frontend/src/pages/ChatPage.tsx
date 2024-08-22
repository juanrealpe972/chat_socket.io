import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Tabs, Tab, Avatar, Typography, Paper } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import { icono } from '../components/IconsAtom';

interface User {
    id: number;
    username: string;
    imagen: string | null;
    correo: string;
    estado: string;
    created_at: string;
}

function ChatPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [value, setValue] = useState('1');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        axios.get('http://localhost:3000/v1/users')
            .then(response => {
                setUsers(response.data.data);
                if (response.data.length > 0) {
                    setSelectedUser(response.data.data[0]);
                }
            })
            .catch(error => {
                console.error("Hubo un error al obtener los usuarios:", error);
            });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelectedUser(users[newValue - 1]); 
    };

    return (
        <Box display="flex" height="100vh">
            <Paper
                elevation={3}
                sx={{ width: '300px', bgcolor: '#1E1E2D', color: '#FFF', padding: '16px' }}
            >
                <Typography variant="h6" gutterBottom>
                    Chat
                </Typography>

                {users.length > 0 && (
                    <div className='flex justify-end bg-white rounded-b-3xl'>
                        <Box>
                            <Tabs 
                                value={value} 
                                className='h-5 flex justify-center items-center' 
                                onChange={handleChange} 
                                aria-label="user tabs" 
                                variant="scrollable" 
                                scrollButtons={false}
                            >
                                {users.map((user, index) => (
                                    <Tab 
                                        key={user.id} 
                                        label={user.username} 
                                        value={(index + 1).toString()} 
                                        iconPosition="start" 
                                        icon={<icono.iconoUser />} 
                                        sx={{ fontSize: '0.70rem' }} 
                                    />
                                ))}
                            </Tabs>
                        </Box>
                    </div>
                )}
            </Paper>

            {/* Área principal del chat */}
            <Box flex={1} display="flex" flexDirection="column" bgcolor="#2D2D44" padding="16px">
                <TabContext value={value}>
                    {users.map((user, index) => (
                        <TabPanel key={user.id} value={(index + 1).toString()}>
                            {selectedUser && (
                                <Box display="flex" alignItems="center">
                                    <Avatar src={`/path-to-image/${selectedUser.imagen}`} alt={selectedUser.username} />
                                    <Box ml={2}>
                                        <Typography variant="h6" sx={{ color: '#FFF' }}>
                                            {selectedUser.username}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#FFF' }}>
                                            {selectedUser.correo}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#FFF' }}>
                                            Estado: {selectedUser.estado}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#FFF' }}>
                                            Registrado el: {new Date(selectedUser.created_at).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}
                        </TabPanel>
                    ))}
                </TabContext>
            </Box>
        </Box>
    );
}

export default ChatPage;
