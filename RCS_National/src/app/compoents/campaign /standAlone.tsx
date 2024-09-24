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

interface Suggestion {
  suggestionType: 'reply' | 'url' | 'phoneNumber';
  displayText?: string;
  url?: string;
  phoneNumber?: string;
}

interface StandAlone {
  mediaUrl: string;
  cardTitle: string;
  cardDescription: string;
  suggestions: Suggestion[];
}

interface TemplateModel {
  type: 'rich_card';
  standAlone: StandAlone;
  height: 'SHORT_HEIGHT' | 'MEDIUM_HEIGHT';
}



export default function StandAlone({ data, height }: { data: any, height: any }) {



  const mediaUrl = data?.mediaUrl;
  const cardTitle = data?.cardTitle;
  const cardDescription = data?.cardDescription;
  const imageHeight = height === 'SHORT_HEIGHT' ? '100px' : '130px';
  const suggestions = data?.suggestions || [];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '100%' }}>
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
        <Avatar src={mediaUrl} sx={{ height: 70, width: 70, border: '1px solid lightgray', position: 'relative', borderRadius: '50%' }} />
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
            <Box className="image" sx={{ border: '1px solid lightgray', borderRadius: '15px' }}>
              {mediaUrl && (
                mediaUrl.endsWith('.mp4') ? (
                  <video
                    src={mediaUrl}
                    style={{ width: '100%', height: imageHeight }}
                    controls

                  />
                ) : (
                  <img
                    src={mediaUrl}
                    style={{ width: '100%', height: imageHeight }}
                    alt="Template Image"
                  />
                )
              )}

            </Box>
            <Box className="msgContent" sx={{ padding: "3px 12px 10px" }}>
              {cardTitle && <Typography variant="h2" sx={{ font: '600 20px /32px Roboto, sans-serif', letterSpacing: '0.0125em', margin: '0 0 16px' }}>{cardTitle}</Typography>}
              {cardDescription && (
                <Typography variant="body2" sx={{ textAlign: 'justify', font: '400 14px /20px Roboto, sans-serif', letterSpacing: '0.0178571429em', }}>
                  {cardDescription}
                </Typography>
              )}
            </Box>
            <Box className="msglinks">
             
              {suggestions && suggestions.length > 0 && suggestions[0]?.action ? (
                suggestions.map((suggestion: any, index: number) => {
                  const action = suggestion.action;

                  return (
                    <React.Fragment key={index}>
                    
                      {action.plainText && (
                        <a style={{ fontWeight: 600, fontSize: 'smaller' }}>
                          {action.plainText}
                        </a>
                      )}

                      {/* Handle open URL action */}
                      {action.openUrl?.url && (
                        <>
                          <hr style={{ borderTop: '1px solid rgba(0, 0, 0, .1)' }} />
                          <a
                            href={action.openUrl.url}
                            title={action.openUrl.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontWeight: 600, fontSize: 'smaller' }}
                          >
                            icon
                          </a>
                        </>
                      )}

                     
                      {action.dialerAction?.phoneNumber && (
                        <>
                          <hr style={{ borderTop: '1px solid rgba(0, 0, 0, .1)' }} />
                          <a
                            href={`tel:${action.dialerAction.phoneNumber}`}
                            style={{ fontWeight: 600, fontSize: 'smaller' }}
                          >
                            click here
                            
                          </a>
                        </>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
               
                suggestions.map((suggestion: any, index: number) => {
                  return (
                    <React.Fragment key={index}>
                     
                      {suggestion.suggestionType === 'reply' && (
                        <a style={{ fontWeight: 600, fontSize: 'smaller' }}>
                          {suggestion.displayText}
                        </a>
                      )}

                      {/* Handle URL suggestion */}
                      {suggestion.url && (
                        <>
                          <hr style={{ borderTop: '1px solid rgba(0, 0, 0, .1)' }} />
                          <a
                            href={suggestion.url}
                            title={suggestion.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontWeight: 600, fontSize: 'smaller' }}
                          >
                            <LanguageIcon sx={{ fontSize: 'larger', marginRight: '6px' }} />
                          </a>
                        </>
                      )}

                      {/* Handle phone number suggestion */}
                      {suggestion.phoneNumber && (
                        <>
                          <hr style={{ borderTop: '1px solid rgba(0, 0, 0, .1)' }} />
                          <a
                            href={`tel:${suggestion.phoneNumber}`}
                            style={{ fontWeight: 600, fontSize: 'smaller' }}
                          >
                            <CallIcon sx={{ fontSize: 'larger', marginRight: '6px' }} />
                          </a>
                        </>
                      )}
                    </React.Fragment>
                  );
                })
              )}
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
          <Box sx={{ width: '70%', backgroundColor: 'rgba(213, 241, 253, 0.336)', borderRadius: '50px', padding: '7px 0', marginRight: '15px' }}>
            <Box sx={{ display: 'flex !important', }}>
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