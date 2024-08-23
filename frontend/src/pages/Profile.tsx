import React, { useEffect, useState } from 'react';
import { Avatar, Box, Breadcrumbs, CssBaseline, Grid, Link, Tab, Tabs, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { icono } from '../components/IconsAtom';
import DatesProfile from './DatesProfile';

const Profile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<{ username: string, imagen : string, correo: string } | null>(null);
    const [value, setValue] = useState('1');

    useEffect(() => {
        document.title = 'La RED - Profile';
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/v1/user/${id}`);
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    return (
        <div>
            <CssBaseline />
            <h2 className='text-3xl'>Profile</h2>
            <Breadcrumbs separator=">" aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/dashboard">
                    Dashboard
                </Link>
                <Link underline="hover" color="inherit" href={`/dashboard/profile/${id}`}>
                    User
                </Link>
                <Typography color="text.primary" className='cursor-default'>{user?.username || 'Loading...'}</Typography>
            </Breadcrumbs>
            <div className="my-5 border rounded-3xl">
                <div className='h-56'>
                    <Grid item xs={false} sm={4} md={7} className='rounded-t-3xl'
                        sx={{
                            height: '100%',
                            width: '100%',
                            backgroundImage: 'url("https://i.pinimg.com/564x/71/17/d8/7117d8dd8d08746d06c8f3b5fc063cf0.jpg")',
                            backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: '100%',
                            backgroundPosition: 'center', 
                            backgroundRepeat: 'no-repeat',
                        }}
                    />
                    <div className='flex items-center gap-x-5'>
                        <Avatar
                            alt="User Avatar"
                            src={user?.imagen ? `http://localhost:3000/users/${user.imagen}` : 'fallback-image-path.jpg'}
                            sx={{ width: 120, height: 120 }}
                            className='-mt-24 ml-10'
                        />
                        <div className='flex flex-col -mt-24'>
                            <p className='text-2xl text-white'>{user?.username}</p>
                            <p className='text-gray-300'>{user?.correo}</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end bg-white rounded-b-3xl'>
                    <Box>
                        <Tabs value={value} className='h-5 flex justify-center items-center' onChange={handleChange} aria-label="secondary tabs example" variant="scrollable" scrollButtons={false}>
                            <Tab label="Profile" value="1" iconPosition="start" icon={<icono.iconoUser />} sx={{ fontSize: '0.70rem' }} />
                            <Tab label="Followers" value="2" iconPosition="start" icon={<icono.iconoUser />} sx={{ fontSize: '0.70rem' }} />
                            <Tab label="Followed" value="3" iconPosition="start" icon={<icono.iconoUser />} sx={{ fontSize: '0.70rem' }} />
                            <Tab label="Friends" value="4" iconPosition="start" icon={<icono.iconoUser />} sx={{ fontSize: '0.70rem' }} />
                            <Tab label="Photos" value="5" iconPosition="start" icon={<icono.iconoUser />} sx={{ fontSize: '0.70rem' }} />
                        </Tabs>
                    </Box>
                </div>
            </div>
            <TabContext value={value}>
                <TabPanel value="1"><DatesProfile/></TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item Four</TabPanel>
                <TabPanel value="5">Item Five</TabPanel>
            </TabContext>
        </div>
    );
};

export default Profile;
