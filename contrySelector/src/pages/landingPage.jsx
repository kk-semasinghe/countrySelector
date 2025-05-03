// src/pages/LandingPage.jsx
import React from 'react';
import { Box, Typography, Button, Container,Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavBar from '../components/navBar'; // Correct casing of file name
import mainImage from '../assets/images/main.png';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <NavBar />
      
      <Box
        sx={{
          minHeight: '100vh',
          position: 'relative',  // Ensure content and background can overlap
          display: 'flex',
          alignItems: 'center',  // Center content vertically
          justifyContent: 'center', // Center content horizontally
        }}
      >
        {/* Background Image with Blur */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `url(${mainImage}) no-repeat center center/cover`,
            filter: 'blur(4px)', // Apply blur effect
            zIndex: 1,  // Keep background behind the text
          }}
        />

        {/* Overlay for Text Visibility */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',  // Darken the background slightly
            zIndex: 2,  // Make sure overlay stays on top of the blurred image
          }}
        />

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',  // Horizontally center the text
              textAlign: 'center',  // Make sure text is centered
              maxWidth: { xs: '100%', md: '100%' }, // Text takes up 60% of the container width
              position: 'relative',  // Ensure content stays above background and overlay
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <Card
                    sx={{
                        padding:'50px',
                        borderRadius:'20px',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set background opacity using RGBA
                        opacity: 1, // Keep content fully opaque
                    }}
                >
              <Typography
                variant="h2"
                sx={{ color: 'white', fontWeight: 'bold', mb: 2 }}
              >
                Country Explorer
              </Typography>

              <Typography variant="h6" sx={{ color: 'white', mb: 4 }}>
                Discover the world at your fingertips. Easily explore and manage detailed information about countries, including demographics, geography, and culture. Navigate through the data with a user-friendly interface and make informed decisions for travel, research, or learning.
              </Typography>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => navigate('/countryList')}
                >
                  Get Started
                </Button>
              </motion.div>
              </Card>
            </motion.div>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
