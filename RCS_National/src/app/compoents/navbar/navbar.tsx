import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase, Avatar, Badge } from '@mui/material';
import logo from '../../../../public/assets/image/logo.png';
import Image from 'next/image';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{backgroundColor:'#ffff',}}>
      <Toolbar>
        <Image src={logo} alt='kjbk'/>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{color: 'black'}}>
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ flexGrow: 1, }} />
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <InputBase placeholder="Search…" sx={{ color: 'black' }} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <Badge badgeContent={12} color="secondary">
            <Avatar alt="Messagesuite" src="../../../../public/assets/image/profile-image.png" />
          </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
