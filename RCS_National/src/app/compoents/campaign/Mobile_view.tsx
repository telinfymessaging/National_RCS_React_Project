import React, { useEffect, useState } from 'react';
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
import {
  fetchPreviewStart,
  fetchPreviewSuccess,
  fetchPreviewFailure,
  selectSelectedTemplateName,
  selectPreviewLoading,
} from '@/app/slices/campaign/campaign';
import axios from 'axios';
import { GET_TEMPLATE_PREVIEW } from '@/app/constants/URLConstants';

interface MobileViewProps {
  template1?: any;
  template2?: any;
  templateImage?: string;
}

export default function Mobile_view({ template1, template2, templateImage }: MobileViewProps) {
  const dispatch = useDispatch();
  const selectedTemplateName = useSelector(selectSelectedTemplateName);
  const loadingPreview = useSelector(selectPreviewLoading);
  const [preview, setPreview] = useState<any>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      if (selectedTemplateName) {
        dispatch(fetchPreviewStart());

        try {
          const encodedTemplateName = btoa(selectedTemplateName);
          console.log("Encoded Template Name: ", encodedTemplateName);
          const token = localStorage.getItem("RCS_token");
          console.log(token,'token');
          
          const response = await axios.post(
            GET_TEMPLATE_PREVIEW,
            { tName: encodedTemplateName },
            {
              headers: {
                'token_RCS': token, // Replace with your actual token or relevant header
              }, 
            }
          );
          console.log("API Response: ", response.data.message);

          const previewData = JSON.parse(response.data.message.template_json_data_VI);
          setPreview(previewData);
          dispatch(fetchPreviewSuccess(response.data));
        } catch (error: any) {
          console.error("API Error: ", error);
          dispatch(fetchPreviewFailure(error.message || 'Failed to fetch template preview'));
        }
      }
    };

    fetchPreview();
  }, [selectedTemplateName, dispatch]);

  // Safely access nested properties with optional chaining
  const mediaUrl = (preview?.templateModel?.standAlone?.mediaUrl);
  const cardTitle = preview?.templateModel?.standAlone?.cardTitle;
  const cardDescription = preview?.templateModel?.standAlone?.cardDescription;
  const imageHeight = preview?.templateModel?.height === 'SHORT_HEIGHT' ? '100px' : '130px';


  return (
    <Box display={"flex"} width={"40%"} sx={{backgroundColor:'white',paddingTop:"20px",paddingBottom:"80px"}} justifyContent="center">
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

      <Box className="campaign-details"  sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display:'flex',
            fontSize: '20px',
            fontWeight: 700,
            color: '#60576B',
            justifyContent: "center",
            width: "100%",
            height: "auto",
            alignItems: "center"
          }}
        >
          Campaign Details
        </Typography>

        <Box className="estimate-cnt">
          {/* <Box
            sx={{
              marginTop: '20px',
              borderRadius: '10px',
              backgroundColor: '#F9EFF8',
              padding: '11px 24px',
              width: "280px",
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
          </Box> */}

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
                borderRadius: '35px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                
                flexShrink: 0
              }}
            >
              <Box
                className="innerbar"
                sx={{
                  border: '1px solid rgba(231, 231, 231, 0.74)',
                  width: { xs: '100%', sm: 284.31 },
                  height: 600.15,
                  backgroundColor: '#fff',
                  borderRadius: 6
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
                    position: 'relative',
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
                    <Avatar src={templateImage} sx={{ height: 70, width: 70, border: '1px solid lightgray' }} />
                  </Box>

                  <Box className="mob-bottom" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%' }}>
                    {loadingPreview ? (
                      <Box display="flex" justifyContent="center" alignItems="center" my={2}>
                        <CircularProgress />
                      </Box>
                    ) : (
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
                        {mediaUrl && (
                          <>
                            <Box className="image">
                              <img
                                src={mediaUrl}
                                style={{ width: '100%', height: imageHeight }}
                                alt="Template Image"
                              />
                            </Box>
                            <Box className="msgContent" sx={{ padding: '5px 15px 0 15px' }}>
                              {cardTitle && <Typography variant="h6">{cardTitle}</Typography>}
                              {cardDescription && (
                                <Typography variant="body2" sx={{ textAlign: 'justify' }}>
                                  {cardDescription}
                                </Typography>
                              )}
                            </Box>
                          </>
                        )}
                      </Box>
                    )}

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
