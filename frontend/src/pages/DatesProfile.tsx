import React, { useState } from 'react';
import axios from 'axios';
import { Grid, Box, Typography, Avatar, Card, CardContent, Divider, IconButton, Button, Input } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const DatesProfile = () => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState('/path-to-default-background.jpg');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(file);
      handleImageUpload(file);
    }
  };

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/upload-image-endpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedImage(response.data.imageUrl);
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#0d1117',
        color: '#c9d1d9',
        minHeight: '100vh',
        backgroundImage: `url(${uploadedImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Grid container spacing={4}>
        {/* User Info Section */}
        <Grid item xs={12} md={4}>
          <Card sx={{ backgroundColor: '#161b22', color: '#c9d1d9', marginBottom: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Avatar
                  alt="User Avatar"
                  src="/path-to-avatar.jpg"
                  sx={{ width: 100, height: 100, marginBottom: 2 }}
                />
                <Typography variant="h6">Jaydon Frankie</Typography>
                <Typography variant="body2" color="textSecondary">
                  CTO at Gleicher, Mueller and Tromp
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2">
                Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer.
              </Typography>
            </CardContent>
          </Card>

          {/* About Section */}
          <Card sx={{ backgroundColor: '#161b22', color: '#c9d1d9', marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>About</Typography>
              <Box display="flex" alignItems="center" marginBottom={1}>
                <Typography variant="body2">Live at United Kingdom</Typography>
              </Box>
              <Box display="flex" alignItems="center" marginBottom={1}>
                <Typography variant="body2">ashlynn.ohara62@gmail.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" marginBottom={1}>
                <Typography variant="body2">Studied at Nikolaus - Leuschke</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Social Links Section */}
          <Card sx={{ backgroundColor: '#161b22', color: '#c9d1d9' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Social</Typography>
              <Box display="flex" justifyContent="space-around">
                <IconButton href="https://www.facebook.com" target="_blank" sx={{ color: '#c9d1d9' }}>
                  <FacebookIcon />
                </IconButton>
                <IconButton href="https://www.instagram.com" target="_blank" sx={{ color: '#c9d1d9' }}>
                  <InstagramIcon />
                </IconButton>
                <IconButton href="https://www.linkedin.com" target="_blank" sx={{ color: '#c9d1d9' }}>
                  <LinkedInIcon />
                </IconButton>
                <IconButton href="https://www.twitter.com" target="_blank" sx={{ color: '#c9d1d9' }}>
                  <TwitterIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Content Section */}
        <Grid item xs={12} md={8}>
          <Card sx={{ backgroundColor: '#161b22', color: '#c9d1d9', marginBottom: 2 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Typography variant="h6">Profile</Typography>
                <Button variant="contained" color="primary">
                  Edit Profile
                </Button>
              </Box>
              {/* Background Image Upload */}
              <Box marginBottom={2}>
                <Input type="file" onChange={handleImageChange} />
              </Box>
              {/* Here goes the profile content */}
              <Typography>Profile content goes here...</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DatesProfile;
