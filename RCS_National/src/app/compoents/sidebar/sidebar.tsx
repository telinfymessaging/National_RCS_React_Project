'use client';

import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/Inbox';
import CampaignIcon from '@mui/icons-material/Campaign';
import ReportIcon from '@mui/icons-material/Assessment';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import logo from '../../../../public/assets/image/logo.png';
import hamburgermenu from '../../../../public/assets/image/hamburgermenu.svg';
import Link from 'next/link';
import union from '../.././../../public/assets/image/Union.png';
import { Button, useMediaQuery, useTheme } from '@mui/material';

interface SidebarProps {
  isOpen: boolean;
  onMenuClick: () => void;
}

const sidebarTextStyles = {
  color: '#60576B',
  fontSize: '18px',
  fontWeight: 600,
  lineHeight: 1.88,
  fontFamily: 'Cairo',

};
const listItemStyles = {
  padding:'8px 20px',
  borderRadius: '15px',
  '&:hover': {
    backgroundColor: '#F9EFF8',
    '& .MuiListItemIcon-root, & .MuiListItemText-root': {
      color: '#A02695',
    },
  },
  '&.Mui-passHref': {
    backgroundColor: '#F9EFF8',
    '& .MuiListItemIcon-root, & .MuiListItemText-root': {
      color: '#A02695',
    },
  },
};
const Sidebar: React.FC<SidebarProps> = ({ isOpen, onMenuClick }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: isOpen ? 345 : 0,
        height: '100vh',
        backgroundColor: '#ffffff',
        position: 'fixed',
        zIndex: 1300,
        transition: 'width 0.3s',
        overflow: 'hidden',
        padding:isOpen?'0 30px': '0',
        paddingTop:'26px',
        paddingBottom:'40px'
      }}
    >
      {isOpen && (
        <Box>
          <Box display="flex" alignItems="center" >
            <Box sx={{ padding: '12px 26px' }}>
              <Image src={logo} alt="Telinfy Platform" width={194} height={66} />
            </Box>
            <Box paddingRight="11px">
              <Image src={hamburgermenu} onClick={onMenuClick} alt="hamburgermenu" />
            </Box>
          </Box>

          <List sx={{height :'auto', overflow: 'auto' }}>
            <Link href={'/dashboard'} passHref style={{textDecoration:'none'}}>
            <ListItem  sx={listItemStyles}>
              <ListItemIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24"
                    height="21" viewBox="0 0 24 21" fill="none">
                    <path
                        d="M11.9999 0.333374C9.75172 0.333431 7.55146 0.98304 5.66379 2.20405C3.77611 3.42507 2.28142 5.16548 1.35953 7.21592C0.437632 9.26636 0.127798 11.5395 0.467299 13.7619C0.8068 15.9842 1.78117 18.0612 3.27321 19.7429C3.38224 19.8655 3.51591 19.9638 3.66549 20.0313C3.81507 20.0989 3.97721 20.1341 4.14132 20.1347C14.1001 20.1749 9.6299 20.1662 19.8298 20.1632C19.9939 20.1633 20.1562 20.1288 20.306 20.0618C20.4558 19.9949 20.5898 19.897 20.6991 19.7747C22.1998 18.0957 23.1824 16.0183 23.5286 13.7932C23.8747 11.5681 23.5694 9.29041 22.6497 7.23494C21.73 5.17947 20.235 3.4341 18.3453 2.20946C16.4555 0.984822 14.2517 0.333249 11.9999 0.333374ZM17.3558 9.44107L15.3165 10.9344C15.4332 11.2778 15.4951 11.6374 15.4999 12C15.5031 12.7827 15.245 13.5441 14.7665 14.1634C14.2879 14.7828 13.6163 15.2247 12.8582 15.4191C12.1 15.6135 11.2987 15.5492 10.5812 15.2365C9.86365 14.9238 9.27105 14.3805 8.89731 13.6929C8.52357 13.0052 8.39008 12.2124 8.51799 11.4402C8.6459 10.6681 9.0279 9.9607 9.60343 9.43026C10.179 8.89982 10.9151 8.57666 11.6951 8.51203C12.4751 8.4474 13.2544 8.64498 13.9094 9.07346L15.9773 7.55889C16.2272 7.38212 16.5365 7.31063 16.8386 7.35984C17.1407 7.40906 17.4114 7.57503 17.5923 7.82197C17.7731 8.06891 17.8497 8.37705 17.8055 8.67992C17.7612 8.9828 17.5997 9.25617 17.3558 9.44107Z"  fill="#60576B"/>
                </svg>
              </ListItemIcon>
              <ListItemText primary="Dashboard"sx={sidebarTextStyles } />
            </ListItem>
            </Link>
            <Link href={'/inbox'} style={{textDecoration:'none'}}>
            <ListItem  sx={listItemStyles}> 
              <ListItemIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20"
                    height="18" viewBox="0 0 20 18" fill="none">
                    <path
                        d="M4.32 8.92002H1.08C0.48 8.92002 0 9.40002 0 10V16.56C0 17.16 0.48 17.64 1.08 17.64H4.32C4.92 17.64 5.4 17.16 5.4 16.56V10C5.4 9.40002 4.92 8.92002 4.32 8.92002ZM11.64 6.40002H8.4C7.8 6.40002 7.32 6.88002 7.32 7.48002V16.56C7.32 17.16 7.8 17.64 8.4 17.64H11.64C12.24 17.64 12.72 17.16 12.72 16.56V7.48002C12.68 6.88002 12.2 6.40002 11.64 6.40002ZM18.92 0.400024H15.68C15.08 0.400024 14.6 0.880025 14.6 1.48002V16.56C14.6 17.16 15.08 17.64 15.68 17.64H18.92C19.52 17.64 20 17.16 20 16.56V1.44002C20 0.880025 19.52 0.400024 18.92 0.400024Z"
                        fill="#60576B" />
                </svg>
              </ListItemIcon>
              <ListItemText primary="Inbox" sx={sidebarTextStyles }/>
            </ListItem>
            </Link>
            <Link href={'/campaign'} style={{textDecoration:'none'}}>
            <ListItem  sx={listItemStyles}>
              <ListItemIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="23"
                    height="22" viewBox="0 0 23 22" fill="none">
                    <path
                        d="M21.5 18V19.1667C21.5 20.4558 20.4558 21.5 19.1667 21.5H2.83333C1.54417 21.5 0.5 20.4558 0.5 19.1667V2.83333C0.5 1.54417 1.54417 0.5 2.83333 0.5H19.1667C20.4558 0.5 21.5 1.54417 21.5 2.83333V4H11C9.71083 4 8.66667 5.04417 8.66667 6.33333V15.6667C8.66667 16.9558 9.71083 18 11 18H21.5ZM11 15.6667H22.6667V6.33333H11V15.6667ZM15.6667 12.75C14.6983 12.75 13.9167 11.9683 13.9167 11C13.9167 10.0317 14.6983 9.25 15.6667 9.25C16.635 9.25 17.4167 10.0317 17.4167 11C17.4167 11.9683 16.635 12.75 15.6667 12.75Z"
                        fill="#60576B" />
                </svg>
              </ListItemIcon>
              <ListItemText primary="Campaigns" sx={sidebarTextStyles} />
            </ListItem>
            </Link>
            <Link href={'/template'} style={{textDecoration:'none'}}>
            <ListItem  sx={listItemStyles}>
              <ListItemIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="26"
                    height="18" viewBox="0 0 26 18" fill="none">
                    <path
                        d="M18.7487 7.33749C18.5998 7.40841 18.474 7.51997 18.3858 7.6593C18.2975 7.79863 18.2505 7.96007 18.25 8.12499V10.75H11.25C11.0179 10.75 10.7954 10.8422 10.6313 11.0063C10.4672 11.1704 10.375 11.3929 10.375 11.625V13.375C10.375 13.6071 10.4672 13.8296 10.6313 13.9937C10.7954 14.1578 11.0179 14.25 11.25 14.25H18.25V16.875C18.2502 17.0431 18.2989 17.2077 18.3902 17.3489C18.4814 17.4901 18.6115 17.602 18.7647 17.6713C18.918 17.7405 19.0879 17.7641 19.2542 17.7393C19.4205 17.7145 19.5762 17.6422 19.7025 17.5312L24.9525 12.955C25.0458 12.873 25.1206 12.7721 25.1719 12.6589C25.2232 12.5458 25.2498 12.423 25.25 12.2987C25.2468 12.1703 25.2154 12.0441 25.1579 11.9292C25.1004 11.8142 25.0184 11.7134 24.9175 11.6337L19.6675 7.45999C19.5412 7.35559 19.3881 7.28876 19.2257 7.2671C19.0632 7.24544 18.898 7.26983 18.7487 7.33749ZM7.25125 10.6625C7.40015 10.5916 7.52598 10.48 7.61422 10.3407C7.70246 10.2014 7.74953 10.0399 7.75 9.87499V7.24999H14.75C14.9821 7.24999 15.2046 7.1578 15.3687 6.99371C15.5328 6.82962 15.625 6.60706 15.625 6.37499V4.62499C15.625 4.39293 15.5328 4.17037 15.3687 4.00627C15.2046 3.84218 14.9821 3.74999 14.75 3.74999H7.75V1.12499C7.74979 0.956837 7.70113 0.792305 7.60984 0.651086C7.51855 0.509867 7.38851 0.397943 7.23527 0.328708C7.08203 0.259473 6.91208 0.23586 6.74577 0.260695C6.57946 0.285529 6.42383 0.35776 6.2975 0.468742L1.0475 5.04499C0.954165 5.12699 0.879361 5.22792 0.828065 5.34107C0.776769 5.45423 0.750157 5.577 0.75 5.70124C0.753193 5.8297 0.78464 5.95588 0.842106 6.07081C0.899573 6.18575 0.981648 6.28661 1.0825 6.36624L6.3325 10.54C6.45881 10.6444 6.61189 10.7112 6.77432 10.7329C6.93675 10.7545 7.102 10.7302 7.25125 10.6625Z"
                        fill="#60576B" />
                </svg>
              </ListItemIcon>
              <ListItemText primary="Templates" sx={sidebarTextStyles}/>
            </ListItem>
            </Link>
<<<<<<< Updated upstream
            <Link href={'/reports'} style={{textDecoration:'none'}}>
            <ListItem  sx={listItemStyles}>
=======
            <Link href={'/campaign-reports'} style={{textDecoration:'none'}}>
            <ListItem button sx={listItemStyles}>
>>>>>>> Stashed changes
              <ListItemIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="28"
                    height="28" viewBox="0 0 28 28" fill="none">
                    <path
                        d="M20.125 4.375H7.875C7.39174 4.375 7 4.76674 7 5.25V6.125H18.3932C18.8664 6.125 19.25 6.5086 19.25 6.9818V23.625H20.125C20.6083 23.625 21 23.2333 21 22.75V5.25C21 4.76674 20.6083 4.375 20.125 4.375Z"
                        fill="#60576B" />
                    <path
                        d="M22.75 1.75H10.5C10.0167 1.75 9.625 2.14174 9.625 2.625V3.5H21C21.4833 3.5 21.875 3.89174 21.875 4.375V21H22.75C23.2333 21 23.625 20.6083 23.625 20.125V2.625C23.625 2.14174 23.2333 1.75 22.75 1.75Z"
                        fill="#60576B" />
                    <path
                        d="M17.5 7H5.25C4.76682 7 4.375 7.39182 4.375 7.875V25.375C4.375 25.8582 4.76682 26.25 5.25 26.25H17.5C17.9836 26.25 18.375 25.8582 18.375 25.375V7.875C18.375 7.39182 17.9836 7 17.5 7ZM14.875 20.125H9.11234L9.36871 20.3814C9.71049 20.7231 9.71049 21.2768 9.36871 21.6187C9.19774 21.7895 8.97391 21.875 8.75 21.875C8.52609 21.875 8.30226 21.7895 8.13138 21.6186L6.38138 19.8686C6.0396 19.5269 6.0396 18.9732 6.38138 18.6313L8.13138 16.8813C8.47315 16.5395 9.02685 16.5395 9.36871 16.8813C9.71058 17.2231 9.71049 17.7768 9.36871 18.1186L9.11234 18.375H14.875C15.3586 18.375 15.75 18.7668 15.75 19.25C15.75 19.7332 15.3586 20.125 14.875 20.125ZM16.3686 14.6186L14.6186 16.3686C14.4477 16.5395 14.2239 16.625 14 16.625C13.7761 16.625 13.5523 16.5395 13.3814 16.3686C13.0396 16.0269 13.0396 15.4732 13.3814 15.1313L13.6377 14.875H7.875C7.39139 14.875 7 14.4832 7 14C7 13.5168 7.39139 13.125 7.875 13.125H13.6377L13.3813 12.8686C13.0395 12.5268 13.0395 11.9732 13.3813 11.6313C13.7231 11.2894 14.2768 11.2895 14.6186 11.6313L16.3686 13.3813C16.7105 13.7232 16.7105 14.2769 16.3686 14.6186Z"
                        fill="#60576B" />
                </svg> 
              </ListItemIcon>
              <ListItemText primary="Reports" sx={sidebarTextStyles }/>
            </ListItem>
            </Link>
            <Link href={'/campaign'} style={{textDecoration:'none'}}>
            <ListItem  sx={listItemStyles}>
              <ListItemIcon>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.7083 4.50001C19.7083 3.34501 19.25 2.23768 18.4333 1.42093C17.6165 0.604177 16.5092 0.145844 15.3542 0.145844H4.35417C3.19917 0.145844 2.09183 0.604177 1.27508 1.42093C0.458333 2.23768 0 3.34501 0 4.50001V15.5C0 16.655 0.458333 17.7623 1.27508 18.5791C2.09183 19.3958 3.19917 19.8542 4.35417 19.8542H15.3542C16.5092 19.8542 17.6165 19.3958 18.4333 18.5791C19.25 17.7623 19.7083 16.655 19.7083 15.5V4.50001ZM10.3015 6.48276L8.1015 13.0828C7.98233 13.443 8.17667 13.8326 8.53692 13.9527C8.89717 14.0718 9.28675 13.8775 9.40683 13.5173L11.6068 6.91726C11.726 6.55701 11.5317 6.16743 11.1714 6.04734C10.8112 5.92818 10.4216 6.12251 10.3015 6.48276ZM12.6683 8.28584L14.3816 10L12.6683 11.7142C12.3997 11.9818 12.3997 12.4182 12.6683 12.6858C12.936 12.9544 13.3723 12.9544 13.64 12.6858L15.84 10.4858C16.1086 10.2173 16.1086 9.78276 15.84 9.51418L13.64 7.31418C13.3723 7.04559 12.936 7.04559 12.6683 7.31418C12.3997 7.58184 12.3997 8.01818 12.6683 8.28584ZM6.06833 7.31418L3.86833 9.51418C3.59975 9.78276 3.59975 10.2173 3.86833 10.4858L6.06833 12.6858C6.336 12.9544 6.77233 12.9544 7.04 12.6858C7.30858 12.4182 7.30858 11.9818 7.04 11.7142L5.32675 10L7.04 8.28584C7.30858 8.01818 7.30858 7.58184 7.04 7.31418C6.77233 7.04559 6.336 7.04559 6.06833 7.31418Z"
                    fill="#60576B"
                  />
                </svg>
              </ListItemIcon>
              <ListItemText  primary="Developer API" sx={sidebarTextStyles }/>
            </ListItem>
            </Link>
          </List>

          

          <Box
            sx={{
              background: 'linear-gradient(180deg, rgb(1, 171, 235) 0%, rgb(1, 101, 139) 100%)',
              textAlign: 'center',
              marginTop:'80px',
              padding:'11% 35% 11% 11%',
              marginBottom:'34%',
              borderRadius:'14px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Image src={union} alt="Telinfy Platform" style={{position: 'absolute',zIndex:-1,right: '20px',top: 0,height: '73%',width: '17%'}} />
           
            <Typography variant="body1" sx={{display:'block',fontSize:'18px',fontWeight:'700',lineHeight:1.14,fontFamily:'Cairo',color:'#ffffff'}}>
              Need any support from us?
            </Typography>
          <Box display='flex' sx={{justifyContent:'space-between'}}>
             <Button sx={{ padding: '8px 17px 8px 20px', marginTop: '17px',fontSize:"17px",fontWeight:'700',lineHeight:'1.87',display:"flex",color:'#01A9E9',backgroundColor:"#ffffff",alignItems:'center',justifyContent:'space-between',borderRadius:'18px',border:'none'
    }}>Reach us
             <svg xmlns="http://www.w3.org/2000/svg" width="8" height="13"
                viewBox="0 0 8 13" fill="none">
                <path
                    d="M1.68394 12.4213C1.04528 13.0201 -6.26294e-08 12.5672 -1.00896e-07 11.6918L-5.54775e-07 1.30823C-5.93042e-07 0.432792 1.04527 -0.0200549 1.68394 0.578694L7.22183 5.77046C7.64324 6.16554 7.64324 6.83446 7.22183 7.22954L1.68394 12.4213Z"
                    fill="#1CBBFF" />
            </svg>
            </Button>
          </Box>
          </Box>
          <p>All Rights Reserved&#64;Telinfy 2024</p>
        </Box>
      )}
    </Box>
  );
};

export default Sidebar;
