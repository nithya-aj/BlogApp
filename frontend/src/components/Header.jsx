import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar sx={{background: "linear-gradient(90deg, rgba(3,11,27,1) 0%, rgba(42,31,83,1) 48%, rgba(39,31,68,1) 100%)" }} position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button variant="outlined" color="inherit" sx={{margin:'1rem'}}>Login</Button>
        <Button variant="outlined" color="inherit">Register</Button>
      </Toolbar>
    </AppBar>
  </Box>
  ) 
}

export default Header