import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Tab, Tabs } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const appBarStyle = { background: "linear-gradient(90deg, rgba(3,11,27,1) 0%, rgba(42,31,83,1) 48%, rgba(39,31,68,1) 100%)" }

const Header = () => {

  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#fb8c00'
      }
    }
  })

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={appBarStyle} position="static">
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
          <Typography variant="h5" component="div" sx={{ flexGrow: 0 }}>
            BlogsApp
          </Typography>
          <ThemeProvider theme={theme}>
            <Tabs sx={{ flexGrow: 1, px: '1rem' }} textColor='primary' indicatorColor='' value={value} onChange={handleChange} >
              <Tab LinkComponent={Link} to='/blogs' sx={{ color: 'white' }} label="All Blogs" />
              <Tab LinkComponent={Link} to='/myBlogs' sx={{ color: 'white' }} label="My Blogs" />
              <Tab LinkComponent={Link} to='/blogs/add' sx={{ color: 'white' }} label="Add Blog" />
            </Tabs>
          </ThemeProvider>

          <Button LinkComponent={Link} to='/auth' variant="outlined" color="inherit" sx={{ borderColor: '#fb8c00' }} onClick={() => dispatch(authActions.logout())}>Logout</Button>
          {/* <>
            <Button LinkComponent={Link} to='/auth' variant="outlined" color="inherit" sx={{ margin: '1rem', borderColor: '#fb8c00' }}>Login</Button>
            <Button LinkComponent={Link} to='/auth' variant="outlined" color="inherit" sx={{ marginRight: '1rem', borderColor: '#fb8c00' }}>Register</Button>
          </> */}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header