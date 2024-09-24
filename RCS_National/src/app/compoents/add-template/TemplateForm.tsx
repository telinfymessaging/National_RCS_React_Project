'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  SelectChangeEvent,
  Grid,
} from '@mui/material';
import {
  setTemplateName,
  setTemplateType,
  setOrientation,
  setHeight,
  setImage,
  setCardTitle,
  setCardDescription,
} from '../../slices/add-template/formSlice';
import SuggestionForm from './SuggestionForm';
import TemplatePreview from './TemplatePreeview';
import { RootState } from '../../store';
import ImageCropper from './ImageCropper';

const TemplateForm: React.FC = () => {
  const [alignment, setAlignment] = useState<'LEFT' | 'RIGHT'>('LEFT');

  const dispatch = useDispatch();
  const formState = useSelector((state: RootState) => state.form);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'templateName':
        dispatch(setTemplateName(value));
        break;
      case 'cardTitle':
        dispatch(setCardTitle(value));
        break;
      case 'cardDescription':
        dispatch(setCardDescription(value));
        break;
      case 'image':
        dispatch(setImage(value));
        break;
      default:
        break;
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'templateType':
        dispatch(setTemplateType(value as 'rich_card' | 'carousel' | 'text_message'));
        break;
      case 'orientation':
        dispatch(setOrientation(value as 'VERTICAL' | 'HORIZONTAL'));
        break;
      case 'height':
        dispatch(setHeight(value as 'SHORT_HEIGHT' | 'MEDIUM_HEIGHT'));
        break;
      default:
        break;
    }
  };

  const handleAlignmentChange = (e: SelectChangeEvent<'LEFT' | 'RIGHT'>) => {
    setAlignment(e.target.value as 'LEFT' | 'RIGHT');
  };
  const handleCroppedImage = (croppedImage: string) => {
    dispatch(setImage(croppedImage));
  };
  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e.target);  // Log the input element
  //   const file = e.target.files?.[0]; // Get the selected file
  
  //   console.log(file);  // Log the file details
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       if (reader.result) {
  //         console.log(reader.result);  // Log the base64 string for debugging
  //         dispatch(setImage(reader.result as string)); // Dispatch the base64 string of the file
  //       }
  //     };
  
  //     // Check if the file is an image or video based on its MIME type
  //     if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
  //       reader.readAsDataURL(file); // Read the file as a base64 encoded string
  //     } else {
  //       alert("Please upload an image or video file");
  //     }
  //   }
  // };
  
  
  return (
    <Box>
      <Grid  sx={{backgroundColor:'#ffffff',display:'flex',justifyContent:'space-between'}} container spacing={3}>
        <Grid item xs={12} md={7}>
          <Box mt={3}>
            <Typography variant="h6" color="black">Bot Message Type</Typography>
            <FormControl fullWidth margin="normal">
              <TextField
                name="templateName"
                value={formState.templateName}
                onChange={handleInputChange}
                placeholder="Please Enter Template Name/Code"
                inputProps={{ maxLength: 20,color:'black',padding:'9px 18px' }}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Template Type</InputLabel>
              <Select
                name="templateType"
                value={formState.templateType}
                onChange={handleSelectChange}
                label="Template Type"
              >
                <MenuItem value="rich_card">Rich Card Stand Alone</MenuItem>
                <MenuItem value="carousel">Rich Card Carousel</MenuItem>
                <MenuItem value="text_message">Text Message</MenuItem>
              </Select>
            </FormControl>

            {formState.templateType !== 'text_message' && (
              <>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Select Card Orientation</InputLabel>
                  <Select
                    name="orientation"
                    value={formState.orientation}
                    onChange={handleSelectChange}
                    label="Card Orientation"
                  >
                    <MenuItem value="VERTICAL">VERTICAL</MenuItem>
                    <MenuItem value="HORIZONTAL">HORIZONTAL</MenuItem>
                  </Select>
                </FormControl>

                {formState.orientation === 'VERTICAL' ? (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Select Media Height</InputLabel>
                    <Select
                      name="height"
                      value={formState.height}
                      onChange={handleSelectChange}
                      label="Media Height"
                    >
                      <MenuItem value="SHORT_HEIGHT">SHORT</MenuItem>
                      <MenuItem value="MEDIUM_HEIGHT">MEDIUM</MenuItem>
                    </Select>
                  </FormControl>
                ) : (
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Select Card Alignment</InputLabel>
                    <Select
                      name="alignment"
                      value={alignment}
                      onChange={handleAlignmentChange}
                      label="Card Alignment"
                    >
                      <MenuItem value="LEFT">LEFT</MenuItem>
                      <MenuItem value="RIGHT">RIGHT</MenuItem>
                    </Select>
                  </FormControl>
                )}

                <Box>
                <ImageCropper onCroppedImage={handleCroppedImage} />
    </Box>

    <FormControl fullWidth margin="normal">
                  <TextField
                    name="cardTitle"
                    label="Card Title"
                    value={formState.cardTitle}
                    onChange={handleInputChange}
                    rows="6"
                    
                    placeholder="Please Enter Card Title"
                    inputProps={{ maxLength: 2048 }}
                  />
                </FormControl> 
              </>
            )}


                <FormControl fullWidth margin="normal">
                  <TextField
                    name="cardDescription"
                    label="Card Description"
                    value={formState.cardDescription}
                    onChange={handleInputChange}
                    rows="12"
                    multiline
                    placeholder="Please Enter Card Description"
                    inputProps={{ maxLength: 2048 }}
                  />
                </FormControl>
           
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{maxWidth:'fit-content'}}>
          <TemplatePreview  />
        </Grid>
      </Grid>
      <SuggestionForm />
    </Box>
  );
};

export default TemplateForm;
