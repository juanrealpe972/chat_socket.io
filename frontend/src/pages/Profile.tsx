import React, { useEffect, useState } from 'react';
import { Box, Breadcrumbs, CssBaseline, Grid, Link, Tab, Tabs, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { icono } from '../components/IconsAtom';

const Profile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [value, setValue] = useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/v1/users/${id}`);
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [id]);

    return (
        <div className='mx-12 my-12'>
            <CssBaseline />
            <h2>Profile {id} </h2>
            <Breadcrumbs separator=">" aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Dashboard
                </Link>
                <Link underline="hover" color="inherit" href="/catalog">
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
                <TabPanel value="1">Profile</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
                <TabPanel value="4">Item Four</TabPanel>
                <TabPanel value="5">Item Five</TabPanel>
            </TabContext>
        </div>
    );
};

export default Profile;
