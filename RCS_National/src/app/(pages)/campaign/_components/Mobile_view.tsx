import React from 'react';
import { Box, Typography, Paper, IconButton, Avatar, TextField, InputAdornment, Divider, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LanguageIcon from '@mui/icons-material/Language';
import CallIcon from '@mui/icons-material/Call';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SimCardIcon from '@mui/icons-material/SimCard';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import MicIcon from '@mui/icons-material/Mic';
import { GlobalStyles } from '@mui/system';

export default function Mobile_view() {
  return (
    <Box display={"flex"} width={"30%"} marginTop={"50px"}>
      <GlobalStyles styles={{
        body: {
          fontFamily: "'Poppins', sans-serif",
        },
        '.material-symbols-outlined': {
          cursor: 'pointer',
        },
        '.msglinks a, .msglinks1 a': {
          textDecoration: 'none',
          color: '#68A3D8',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        '.msglinks hr, .msglinks1 hr': {
          margin: '5px 0',
        },
      }} />

      <Box className="campaign-details" width="100%" sx={{ display: 'flex', flexDirection: 'column', }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontSize: '20px',       
            fontWeight: 700,         
                   marginTop:'20px',
                   marginLeft:"60px",
                               color: '#60576B',      
                               justifyContent:"center",   
                               width:"100%",
                               height:"auto",
                               alignItems:"center"

          }}
        >
          Campaign Details
        </Typography>

        <Box className="estimate-cnt">
          <Box
            sx={{
              marginTop: '20px',
              borderRadius: '10px',
              backgroundColor: '#F9EFF8',
              padding: '11px 24px',
              width:"280px",
               marginLeft:"60px",
             
            }}
          >
            <Typography
              variant="body1"
              sx={{
                display: 'block',
                fontSize: '16px',
                color: '#676262',
              }}
              className="cost"
            >
              Estimated cost for this campaign
            </Typography>
            <Typography
              variant="h6"
              sx={{
                display: 'block',
                fontSize: '20px',
                color: '#AB18C3',
              }}
              className="inr"
            >
              INR 2345.00
            </Typography>
          </Box>


          <Box
            className="mobileBox"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: { xs: '0', md: '0 150px' },
              height: 'auto',
              position: 'relative'
            }}
          >
            <Box
              className="mobile"
              sx={{
                border: '2px solid lightgray',
                backgroundColor: 'lightgray',
                width: { xs: '100%', sm: 301.44 },
                height: 619.44,
                borderRadius: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 1,
                flexShrink: 0
              }}
            >
              <Box
                className="innerbar"
                sx={{
                  border: '2px solid rgba(231, 231, 231, 0.74)',
                  width: { xs: '100%', sm: 284.31 },
                  height: 600.15,
                  backgroundColor: '#fff',
                  borderRadius: 2
                }}
              >
                <Box
                  sx={{
                    height: '4%',
                    width: '50%',
                    margin: '0 auto',
                    top: 0,
                    backgroundColor: 'rgba(139, 139, 139, 0.74)',
                    borderBottomLeftRadius: '15px',
                    borderBottomRightRadius: '15px',
                    position: 'relative', // Ensures it's positioned within its container
                  }}
                />
                <Box sx={{ borderBottom: '3px solid lightgray' }}>
                  <Box
                    className="mob-top-row"
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingBottom: { xs: 0, sm: 1 },
                      borderBottom: '1px solid lightgray'
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton>
                        <ArrowBackIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', marginLeft: 1 }}>
                        Telinfy
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton>
                        <BeenhereIcon />
                      </IconButton>
                      <IconButton>
                        <PhotoCameraIcon />
                      </IconButton>
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                    <Avatar src={`/assets/Images/}`} sx={{ height: 70, width: 70, border: '1px solid lightgray' }} />
                  </Box>

                  <Box className="mob-bottom" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%' }}>
                    <Box
                      className="messageContent"
                      sx={{
                        width: '100%',
                        margin: '0 15px 0 0',
                        height: 'auto',
                        maxHeight: 350,
                        border: '1px solid lightgray',
                        borderRadius: 1,
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        '&::-webkit-scrollbar': { display: 'none' }
                      }}
                    >
                      <Box className="image">
                        <img alt="Template" />
                      </Box>
                      <Box
                        className="msgContent"
                        sx={{
                          padding: '5px 15px 0 15px'
                        }}
                      >
                        <Typography variant="h6">jhghjk</Typography>
                        <Typography variant="body2" sx={{ textAlign: 'justify' }}>
                          gfdfghj
                        </Typography>
                      </Box>
                      <Box
                        className="msglinks"
                        sx={{
                          textAlign: 'center',
                          fontWeight: 500,
                          color: '#68A3D8',
                          my: 1
                        }}
                      >
                        <Divider />
                        <Link
                          href="#"
                          sx={{
                            textDecoration: 'none',
                            color: '#68A3D8',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <LanguageIcon sx={{ marginRight: 1 }} /> Link
                        </Link>
                        <Divider />
                        <Link
                          href="tel:"
                          sx={{
                            textDecoration: 'none',
                            color: '#68A3D8',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}
                        >
                          <CallIcon sx={{ marginRight: 1 }} /> Call us now
                        </Link>
                      </Box>
                    </Box>

                    <Box
                      className="inputbar"
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        my: 1,
                        width: '100%',
                        '@media(max-width: 767px)': { flexDirection: 'column' }
                      }}
                    >
                      <IconButton>
                        <AddCircleIcon />
                      </IconButton>
                      <IconButton>
                        <PhotoCameraIcon />
                      </IconButton>
                      <TextField
                        placeholder="Chat (Jio4G)"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SimCardIcon />
                              <SentimentSatisfiedIcon />
                              <MicIcon />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          border: 'none',
                          backgroundColor: 'transparent',
                          padding: 0,
                          width: '60%',
                          '@media(max-width: 767px)': {
                            width: '100%',
                            marginBottom: '10px',
                          },
                        }}
                      />
                    </Box>

                    <Box
                      className="btmbar"
                      sx={{
                        width: '50%',
                        margin: '0 auto',
                        '@media(max-width: 767px)': {
                          width: '100%'
                        }
                      }}
                    >
                      <Typography variant="body2">&nbsp;</Typography>
                    </Box>
                  </Box>
                </Box>

              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
