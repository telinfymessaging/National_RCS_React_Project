'use client';

import React, { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { ClickAwayListener, Paper, Button, Grow, Popper, MenuItem, MenuList, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import profile_img from '../../../../public/assets/image/profile-image.png';
import logo from '../../../../public/assets/image/logo.png';
import hamburgermenu from '../../../../public/assets/image/hamburgermenu.svg';
import { useRouter } from 'next/navigation';
import { deleteCookie as Logout } from "../../server/actions/mutateCookie";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  backgroundColor: '#f4f6f8',
  minHeight: '60px',
  width: '80%',
  borderRadius: '12px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface NavbarProps {
  onMenuClick: () => void;
  isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, isOpen }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.SyntheticEvent | Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const handleListKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }
    prevOpen.current = open;
  }, [open]);
  
  
  const handleLogout=useCallback(async()=>{
    await Logout();

    console.log("logged out");

     if (typeof window !== "undefined") {
       localStorage.removeItem("RCS_token");
    }
    
    router.push("/login");
    

  },[])
  const handleDownload = () => {
    router.push('/download');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', padding: '26px 46px', color: 'black', zIndex: 1201 }}>
      <Toolbar sx={{ width: '100%'}}>
        {!isOpen && (
          <Box display="flex" alignItems="center" sx={{ width: '345px' }}>
            <Box display="flex" alignItems="center" sx={{ padding: '12px 26px' }}>
              <Image src={logo} alt="Telinfy Platform" width={194} height={66} />
            </Box>
            <Box paddingRight="11px">
              <Image src={hamburgermenu} onClick={onMenuClick} alt="hamburgermenu" />
            </Box>
          </Box>
        )}
       <Box display="flex" alignItems="center" sx={{ flexGrow: 1, justifyContent: 'flex-end' }}>
        <Box sx={{  flexBasis: isOpen?'51.5%': '75%', }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: 'black', zIndex: 1 }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Campaign or reports"
              inputProps={{ 'aria-label': 'search' }}
              />
          </Search>
        </Box>

        <Box display="flex" alignItems="center">
          <IconButton  onClick={handleDownload}>
            <Badge badgeContent={12} color="secondary">
              <DownloadForOfflineIcon fontSize="large" sx={{color:"#A5A5A5 "}}/>
            </Badge>
          </IconButton>
          <IconButton>
            <Box sx={{ maxWidth: '50px', marginLeft: '50px', marginRight: '10px' }}>
              <Image width={50} height={50} alt="User Avatar" src={profile_img} />
            </Box>
          </IconButton>
          <Box display="flex" alignItems="center">
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
              sx={{ fontSize: '18px', fontWeight: '700', color: 'black' }}
              >
              MessageSuit
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} placement="bottom-start" transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}>
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="composition-menu" aria-labelledby="composition-button" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleClose}>Account setting</MenuItem>
                        <MenuItem onClick={handleClose}>Scheduled</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
