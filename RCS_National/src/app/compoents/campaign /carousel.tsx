
import { useEffect } from 'react';
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
import React from 'react';

// interface Suggestion {
//     suggestionType: 'reply' | 'url' | 'phoneNumber';
//     displayText?: string;
//     url?: string;
//     phoneNumber?: string;
//   }

export default function CarouselView({ listData = [], height }: { listData: any[], height: any }) {

    console.log("listData",listData);



    //   const mediaUrl = data?.mediaUrl;
    //   const cardTitle = data?.cardTitle;
    //   const cardDescription = data?.cardDescription;
    //   const imageHeight = height === 'SHORT_HEIGHT' ? '100px' : '130px';
    //   const suggestions= data?.suggestions || [];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '10px', width: '100%', justifyContent: 'space-between' }}>
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
                <Avatar src="" alt="nothing" sx={{ height: 70, width: 70, border: '1px solid lightgray', position: 'relative', borderRadius: '50%' }} />
            </Box>
            <Box sx={{ display: 'flex', overflow: 'hidden', overflowX: 'scroll' }}>
                {/* Ensure listData is an array */}
                {Array.isArray(listData) && listData.length > 0 ? (
                    listData.map((item: any, index: number) => (
                        <Box sx={{ display: "flex" }} key={index}>
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
                                        '&::-webkit-scrollbar': { display: 'none' },
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    {/* Card content */}
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Box className="image" sx={{ border: '1px solid lightgray', borderRadius: '15px', display: 'flex', flexDirection: 'column' }}>
                                            <img src={item.mediaUrl} style={{ width: '100%', height: height }} alt="Template Image" />
                                        </Box>
                                        <Box className="msgContent" sx={{ padding: '3px 12px 10px' }}>
                                            {item.cardTitle && (
                                                <Typography variant="h2" sx={{ font: '600 20px /32px Roboto, sans-serif', letterSpacing: '0.0125em', margin: '0 0 16px' }}>
                                                    {item.cardTitle}
                                                </Typography>
                                            )}
                                            {item.cardDescription && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{ textAlign: 'justify', font: '400 14px /20px Roboto, sans-serif', letterSpacing: '0.0178571429em' }}
                                                >
                                                    {item.cardDescription}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box className="msglinks">
                                            {item.suggestions && item.suggestions.map((i: any, suggestionIndex: number) => (
                                                <React.Fragment key={suggestionIndex}>
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
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body1">No items to display</Typography> 
                )}
            </Box>


            <Box>
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
                    <Box
                        sx={{
                            width: '70%',
                            backgroundColor: 'rgba(213, 241, 253, 0.336)',
                            borderRadius: '50px',
                            padding: '7px 0',
                            marginRight: '15px',
                        }}
                    >
                        <Box sx={{ display: 'flex !important' }}>
                            <TextField
                                variant="standard"
                                placeholder="Chat (Jio4G)"
                                sx={{ border: 'none', backgroundColor: 'transparent', outline: 'none', padding: '0 10px', fontSize: 'smaller' }}
                            />
                            <IconButton>
                                <SimCardIcon sx={{ fontSize: '15px', color: '#007bff', paddingLeft: '0px' }} />
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
                        '@media(max-width: 767px)': { width: '100%' },
                    }}
                >
                    <Typography variant="body2">&nbsp;</Typography>
                </Box>
            </Box>
        </Box>
    );


}

