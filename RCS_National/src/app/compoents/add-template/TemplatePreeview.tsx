import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, CardMedia, Typography, Box, Button } from '@mui/material';
import { RootState } from '../../store/index';

const TemplatePreview: React.FC = () => {
  const formState = useSelector((state: RootState) => state.form);

  return (
    <Box className="add-template-right">
      <Card className="border bg-white" sx={{ borderRadius: '20px' }}>
        {!formState.templateType.includes('text_message') ? (
          <>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
              <Typography>Conversation</Typography>
            </Box>
            <hr />
            <Box id="conversationView" sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>Preview of Conversation</Typography>

              <Box sx={{ m: 3, display: 'flex', justifyContent: 'center' }}>
                <Box className="mobi">
                  <Card className="border" sx={{ borderRadius: '30px', width: '360px', height: '600px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                      <Box className="border" sx={{ borderRadius: '30px', width: '70px', height: '10px' }} />
                      <Box className="border" sx={{ borderRadius: '50%', width: '10px', height: '10px', ml: 3 }} />
                    </Box>

                    <Card className="border m-2 mt-3 rounded-lg" sx={{ height: '510px' }}>
                      <Box sx={{ pt: 3, pl: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography component="span" sx={{ fontSize: 17 }}>&#xf060;</Typography>
                          <img src={`../../../../../assets/image/${formState.pagelogo}`} alt="Your Company Logo" width="30" />
                          <Typography component="span" sx={{ ml: 2, mr: 2 }}><strong>{formState.cmpnyName}</strong></Typography>
                        </Box>
                        <Typography component="span" sx={{ mr: 2 }}>&#xe5d4;</Typography>
                      </Box>

                      <Box className="mobileCard m-2 bg-light" sx={{
                        overflowWrap: 'break-word',
                        borderRadius: '7px',
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        maxHeight: '445px',
                        width: 'auto'
                      }}>
                        <Box>
                          {formState.orientation === 'VERTICAL' ? (
                            <Box>
                              <CardMedia
                                component={formState.isvideo ? 'video' : 'img'}
                                src={formState.img_file?.base64 || formState.img_file}
                                alt=""
                                height={formState.height === 'SHORT_HEIGHT' ? "100px" : "140px"}
                                sx={{ width: '316px' }}
                                autoPlay
                                loop
                                muted
                              />
                              <CardContent sx={{ textAlign: 'left', pl: 2 }}>
                                <Typography variant="h6">{formState.cardTitle}</Typography>
                                <Typography variant="body2" id="outputDesc">{formState.cardDescription}</Typography>
                              </CardContent>
                            </Box>
                          ) : (
                            <Box className="row w-100" sx={{ display: 'flex', width: '322px' }}>
                              {formState.imagePosition !== 'RIGHT' ? (
                                <Box className="col-lg-3 p-0 pl-2 m-0">
                                  <CardMedia
                                    component={formState.isvideo ? 'video' : 'img'}
                                    src={formState.img_file?.base64 || formState.img_file}
                                    alt=""
                                    height="150px"
                                    sx={{ width: '120px', objectFit: 'fill' }}
                                    autoPlay
                                    loop
                                    muted
                                  />
                                </Box>
                              ) : null}

                              <Box className="col-lg-2" sx={{ borderRight: '2px solid lightgray', pl: 3 }} />

                              <Box className="col-lg-7 p-2" sx={{ textAlign: 'left', padding: 2 }}>
                                <Typography variant="h6">{formState.cardTitle}</Typography>
                                <Typography variant="body2">{formState.cardDescription}</Typography>
                              </Box>

                              {formState.imagePosition === 'RIGHT' ? (
                                <Box className="col-lg-2 p-0 m-0">
                                  <CardMedia
                                    component={formState.isvideo ? 'video' : 'img'}
                                    src={formState.img_file?.base64 || formState.img_file}
                                    alt=""
                                    height="150px"
                                    sx={{ width: '120px', objectFit: 'fill' }}
                                    autoPlay
                                    loop
                                    muted
                                  />
                                </Box>
                              ) : null}
                            </Box>
                          )}
                        </Box>
                      </Box>

                      <Box sx={{ w: '100%' }}>
                        {formState.suggestions?.map((suggestion, index) => (
                          <Button key={index} className="btn-sm w-100" sx={{
                            padding: '0px 15px',
                            color: 'blue',
                            borderBottom: '1px solid lightgray',
                            cursor: 'auto'
                          }}>
                            {suggestion.displayText}
                          </Button>
                        ))}
                      </Box>
                    </Card>
                  </Card>
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          // Code for text message preview
          <Card className="border textMess bg-white" sx={{ borderRadius: '20px' }}>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-around' }}>
              <Typography>Conversation</Typography>
            </Box>
            <hr />
            <Box id="conversationView" sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>Preview of Conversation</Typography>

              <Box sx={{ m: 3, display: 'flex', justifyContent: 'center' }}>
                <Card className="border" sx={{ borderRadius: '30px', width: '360px', height: '600px' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Box className="border" sx={{ borderRadius: '30px', width: '70px', height: '10px' }} />
                    <Box className="border" sx={{ borderRadius: '50%', width: '10px', height: '10px', ml: 3 }} />
                  </Box>

                  <CardContent className="border m-2 mt-3 rounded-lg" sx={{ height: '510px', overflowY: 'scroll', maxHeight: '445px' }}>
                    <Typography id="outputDesc" sx={{ textAlign: 'left', pl: 2 }}>
                      {formState.messageField}
                    </Typography>
                    <Box className="btn-group btn-group-sm">
                      {formState.suggestions?.map((suggestion, index) => (
                        <Button key={index} className="btn-sm" sx={{
                          borderRadius: '30px',
                          padding: '5px 15px',
                          cursor: 'auto',
                          color: 'blue',
                          margin: 2,
                          border: '1px solid',
                        }}>
                          {suggestion.displayText}
                        </Button>
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Card>
        )}
      </Card>
    </Box>
  );
};

export default TemplatePreview;
