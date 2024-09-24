import React, { useEffect } from 'react';
import { Box, Typography, IconButton, Avatar, TextField, InputAdornment, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SimCardIcon from '@mui/icons-material/SimCard';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import MicIcon from '@mui/icons-material/Mic';
import { GlobalStyles } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import CallIcon from '@mui/icons-material/Call';
import LanguageIcon from '@mui/icons-material/Language';




export default function MessageView({data,suggestions}:{data:any,suggestions:any}){




  
  return (
    <Box sx={{display:'flex' ,flexDirection:'column',padding:'10px',width:'100%'}}>
                      <Box
                        className="mob-top-row"
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingBottom: { xs: 0, sm: 1 },
                          borderBottom: '1px solid lightgray',
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
                        <Box sx={{ display: 'flex', alignItems: 'center', }}>
                          <IconButton>
                            <BeenhereIcon sx={{ fontSize: '10' }} />
                          </IconButton>
                          <IconButton>
                            <PhotoCameraIcon sx={{ fontSize: '10' }} />
                          </IconButton>
                          <IconButton>
                            <MoreVertIcon sx={{ fontSize: '10' }} />
                          </IconButton>
                        </Box>
                      </Box>

                      <Box sx={{ justifyContent: 'center !important', borderBottom: '3px solid lightgray', width: '100%', padding: '0 0 10px', alignItems: 'center', display: 'flex' }}>
                        <Avatar src="nothing" alt="nothing" sx={{ height: 70, width: 70, border: '1px solid lightgray', position: 'relative', borderRadius: '50%' }} />
                      </Box>


                      <Box
                        className="mob-bottom"
                        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%' }}
                      >
                        <Box
                          className="messageContent"
                          sx={{
                            width: '100%',
                            margin: '0 15px 0 0',
                            height: 'auto',
                            maxHeight: 350,
                            borderRadius: '15px',
                            overflowX: 'hidden',
                            overflowY: 'scroll',
                            '&::-webkit-scrollbar': {
                              display: 'none'
                            },

                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <>
                            
                            <Box className="msgContent" sx={{ padding: "3px 12px 10px" }}>
                              
                              {data && (
                                <Typography variant="body2" sx={{ textAlign: 'justify', font: '400 14px /20px Roboto, sans-serif', letterSpacing: '0.0178571429em', }}>
                                  {data}
                                </Typography>
                              )}
                            </Box>
                            <Box className="msglinks">
                              {suggestions && suggestions.map((i: any, index: number) => (
                                <React.Fragment key={index}>
                                  {i.suggestionType === 'reply' && <a style={{ fontWeight: 600, fontSize: 'smaller' }}>{i.displayText}</a>}
                                  {i.url && (
                                    <>
                                      <hr style={{ borderTop: '1px solid rgba(0, 0, 0, .1)' }} />
                                      <a href={i.url} title={i.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, fontSize: 'smaller' }}>
                                        <LanguageIcon sx={{ fontSize: 'larger', marginRight: '6px' }} /> Link
                                      </a>
                                    </>
                                  )}
                                  {i.phoneNumber && (
                                    <>
                                      <hr style={{ borderTop: '1px solid rgba(0, 0, 0, .1)' }} />
                                      <a href={`tel:${i.phoneNumber}`} style={{ fontWeight: 600, fontSize: 'smaller' }}>
                                        <CallIcon sx={{ fontSize: 'larger', marginRight: '6px' }} /> Call us now
                                      </a>
                                    </>
                                  )}
                                </React.Fragment>
                              ))}
                            </Box>

                          </>
                        </Box>

                        <Box
                          className="inputbar"
                          sx={{ display: 'flex', width: '100%', justifyContent: 'space-around', margin: '10px 0', alignItems: 'center' }}
                        >
                          <IconButton>
                            <AddCircleIcon sx={{ fontSize: 20 }} />
                          </IconButton>
                          <IconButton>
                            <PhotoCameraIcon sx={{ fontSize: 20 }} />
                          </IconButton>
                          <Box sx={{ width: '70%', backgroundColor: 'rgba(213, 241, 253, 0.336)', borderRadius: '50px', padding: '7px 0', marginRight: '15px'  }}>
                            <Box sx={{ display: 'flex !important',   }}>
                              <TextField
                                variant="standard"
                                placeholder="Chat (Jio4G)"

                                sx={{
                                  border: 'none',
                                  backgroundColor: 'transparent',
                                  outline: 'none',
                                  padding: '0 10px',
                                  fontSize: 'smaller',
                                }}

                              />
                              <IconButton>
                                <SimCardIcon sx={{ fontSize: "15px", color: '#007bff', paddingLeft: "0px" }} />
                              </IconButton>
                              <IconButton>
                                <SentimentSatisfiedIcon sx={{ fontSize: '15px' }} />
                              </IconButton>
                              <IconButton>
                                <MicIcon sx={{ fontSize: '15px' }} />
                              </IconButton>
                            </Box>


                          </Box>
                        </Box>

                        <Box
                          className="btmbar"
                          sx={{
                            width: '50%',
                            margin: '0 auto',
                            '@media(max-width: 767px)': {
                              width: '100%',
                            },
                          }}
                        >
                          <Typography variant="body2">&nbsp;</Typography>
                        </Box>
                      </Box>
                    </Box>
  );
}