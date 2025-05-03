// src/components/NavBar.jsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import PublicOutlinedIcon from '@mui/icons-material/PublicOutlined';
import colors from '../assets/colors';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {

  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ backgroundColor: colors.navbar }}>
      <Toolbar>
      <Box
  onClick={() => navigate('/')} // or your desired path
  sx={{
    flexGrow: 1,
    display: 'flex',
    gap: 1,
    pt: 1,
    cursor: 'pointer',
  }}
>
  <PublicOutlinedIcon fontSize="medium" />
  <Typography variant="h5" component="div">
    Country Explorer
  </Typography>
</Box>

        <Box>
          <Button color="inherit" onClick={()=>navigate('/countryList')}>Countries</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
