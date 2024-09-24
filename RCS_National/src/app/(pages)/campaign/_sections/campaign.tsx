'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTemplatesStart,
  fetchTemplatesSuccess,
  fetchTemplatesFailure,
  fetchPreviewStart,
  fetchPreviewSuccess,
  fetchPreviewFailure,
  clearPreview,
  selectCampaignTemplates,
  selectTemplatesLoading,
  selectTemplatesError,
  selectPreview,
  selectPreviewLoading,
  selectPreviewError,
  selectSelectedTemplateName,
  setSelectedTemplateName,
} from '../../../slices/campaign/campaign';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  CircularProgress,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tabs,
  Tab,
  TextField,
  Input,
  SelectChangeEvent,
} from '@mui/material';
import { useFormik } from 'formik';
import axios from 'axios';
import Mobile_view from '../../../compoents/campaign /Mobile_view';
import { IgetAllTemplates } from '../../../slices/campaign/campaign';
import { GET_TEMPLATE_PREVIEW, COMPOSE, COMPOSE_BULK } from '@/app/constants/URLConstants';

// Define the type for a template
interface Template {
  tid: string;
  template_name: string;
}

const CampaignPage = ({data}:{data:any}) => {
  const dispatch = useDispatch();
  const templates = useSelector(selectCampaignTemplates);
  const loadingTemplates = useSelector(selectTemplatesLoading);
  const templatesError = useSelector(selectTemplatesError);
  let preview = useSelector(selectPreview);
  const loadingPreview = useSelector(selectPreviewLoading);
  const previewError = useSelector(selectPreviewError);

  const selectedTemplateName = useSelector(selectSelectedTemplateName);

  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([]); // Ensure it's an array
  const [phoneNumber, setPhoneNumber] = useState('');
  const [output, setOutput] = useState('');
  const [phoneCount, setPhoneCount] = useState(0);
  const [btnShow, setBtnShow] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    dispatch(fetchTemplatesStart());
    try {
      const response = data;
      if (Array.isArray(response.message)) {
        dispatch(fetchTemplatesSuccess(response.data));
        setFilteredTemplates(response.message); // Cast the response data to Template[]
      } else {
        throw new Error('API did not return an array');
      }
    } catch (error: any) {
      dispatch(fetchTemplatesFailure(error.message || 'Failed to fetch templates'));
    }
  };

  const composeData = async () => {
    try {
      const { data: response } = await axios.post<Template[]>("");
      if (Array.isArray(response)) {
        setFilteredTemplates(response);
      } else {
        throw new Error('API did not return an array');
      }
    } catch (error) {
      console.error("Error fetching templates", error);
    }
  };

  useEffect(() => {
    fetchData();
    composeData();
    dispatch(clearPreview());
  }, []);

  // Search filter function
  const handleSearch = (event: { target: { value: string } }) => {
    const searchText = event.target.value.toLowerCase();
    setSearchTerm(searchText);

    // Filter templates where the search term appears anywhere in the template name
    const filtered = templates.filter((temp: { template_name: string }) =>
      temp.template_name.toLowerCase().includes(searchText)
    );

    setFilteredTemplates(filtered);
  };

  const uniqNumber = () => {
    const phone = phoneNumber.replace(/\D/g, ',');
    const myArray = phone.split(',');

    let arr = [];
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i].slice(-10).length === 10) {
        arr.push(myArray[i].slice(-10));
      }
    }

    const removedD = Array.from(new Set(arr)); // Removing duplicates
    let filteredRemoved = removedD.filter(item => item && item.trim()); // Filtering out empty/whitespace items

    const r_c = filteredRemoved.join('\n'); // Joining array elements with newline characters
    setOutput(filteredRemoved.join(','));
    setPhoneNumber(r_c);
    mobileNumbers();
  };

  const mobileNumbers = () => {
    const y = phoneNumber.length; // Total length of the phoneNumbers field
    const x = phoneNumber.replace(/\D/g, '').length; // Length of only the digits
    setPhoneCount((y - x) + 1);
  };

  const call = async () => {
    uniqNumber();
    console.log('Phone Count after uniqNumber:', phoneCount);
    console.log('Formik values:', formik.values);
    console.log('Formik isValid:', formik.isValid);

    const composeBulkFrmData = {
      cName: formik.values.campaignName,
      PhoneNumber: output,
      Phone_count: phoneCount,
    };

    const composeData = {
      cName: formik.values.campaignName,
      PhoneNumber: output,
    };

    try {
      if (phoneCount > 99) {
        if (formik.isValid) {
          console.log('Phone count greater than 99, making bulk request...');
          const response = await axios.post(COMPOSE_BULK, composeBulkFrmData);

          if (response.data.message === 'Sent Successfully') {
            alert('Done: ' + response.data.message);
            setBtnShow(false);
            setTimeout(() => {
              formik.resetForm();
              setBtnShow(true);
              setPhoneCount(0);
            }, 7000);
          } else if (response.data.message === "Smart messaging service not enabled for you. Please contact sales person.") {
            alert('Pending: ' + response.data.message);
            setBtnShow(false);
            setTimeout(() => {
              formik.resetForm();
              setBtnShow(true);
              setPhoneCount(0);
            }, 7000);
          }
        } else {
          alert('Please Fill all the Fields.!');
        }
      } else {
        if (formik.isValid) {
          console.log('Phone count 99 or less, making single request...');
          const response = await axios.post(COMPOSE, composeData);

          if (response.data.message === 'Insufficient Credits') {
            alert('Pending: ' + response.data.message);
            setBtnShow(false);
            setTimeout(() => {
              formik.resetForm();
              setBtnShow(true);
              setPhoneCount(0);
            }, 7000);
          } else {
            alert('Done: ' + response.data.message);
            setBtnShow(false);
            setTimeout(() => {
              formik.resetForm();
              setBtnShow(true);
              setPhoneCount(0);
            }, 7000);
          }
        } else {
          alert('Please Fill all the Fields.!');
        }
      }
    } catch (error: any) {
      console.error('Failed:', error);
      alert('Failed: ' + error.message);
      setBtnShow(false);
      setTimeout(() => {
        formik.resetForm();
        setBtnShow(true);
        setPhoneCount(0);
      }, 7000);
    }
  };

  const formik = useFormik({
    initialValues: {
      template: '',
      campaignName: '',
      sendCampaignTo: 'Numbers',
      fileUrl: '',
      fileUpload: null,
      selectedTab: 'xls-csv',
    },
    onSubmit: async (values) => {
      await call();
    },
  });

  const handleTemplateChange = async (event: SelectChangeEvent<string>) => {
    const selectedTemplateName = event.target.value;
    formik.setFieldValue('template', selectedTemplateName);

    if (selectedTemplateName) {
      dispatch(setSelectedTemplateName(selectedTemplateName)); // Store the selected template name in Redux
      dispatch(fetchPreviewStart());

      try {
        const encodedTemplateName = btoa(selectedTemplateName);
        const token = localStorage.getItem('RCS_token');

        const response = await axios.post(
          GET_TEMPLATE_PREVIEW,
          { tName: encodedTemplateName },
          {
            headers: {
              'token_RCS': token, // Replace with your actual token or relevant header
            },
          }
        );

        preview = await response.data.message.template_json_data_VI;
        dispatch(fetchPreviewSuccess(response.data));
      } catch (error: any) {
        console.error("API Error: ", error);
        dispatch(fetchPreviewFailure(error.message || 'Failed to fetch template preview'));
      }
    }
    //  else {
    //   dispatch(clearPreview());
    // }
  };

  return (
    <Box display={"flex"} flexDirection={{ xs: "column", md: "row" }} width="100%" alignItems={"center"} height="100vh">
      <Box width={{ xs: "100%", md: "60%" }} height={{ xs: "auto", md: "100vh" }} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <h2>Create a Campaign</h2>

          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
  
  <Select
    fullWidth
    name="template"
    value={formik.values.template || ''}
    onChange={handleTemplateChange}
    displayEmpty
    renderValue={(selected) => selected || "Select a template"}
    sx={{
      borderRadius: '10px',
    }}
    MenuProps={{
      PaperProps: {
        sx: {
          maxHeight: 300, // Increase the height to accommodate the search bar
        },
      },
    }}
  >
    {/* Add search bar inside Menu */}
    
      <TextField
        placeholder="Search templates..."
        fullWidth
        variant="outlined"
        size="small"
        type="text"
        value={searchTerm}
         // Prevent the Select from closing
        onChange={handleSearch}
        sx={{
          marginBottom: 1,
        }}
      />
   

    {/* Show loading state */}
    {loadingTemplates && (
      <MenuItem value="">
        <CircularProgress size={24} />
      </MenuItem>
    )}

    {/* Show error message */}
    {templatesError && (
      <MenuItem value="">
        <Typography color="error">{templatesError}</Typography>
      </MenuItem>
    )}

    {/* Render filtered templates */}
    {Array.isArray(filteredTemplates) && filteredTemplates.map((temp) => (
      <MenuItem key={temp.tid} value={temp.template_name}>
        {temp.template_name}
      </MenuItem>
    ))}
  </Select>
</FormControl>

          <TextField
            fullWidth
            label="Campaign Name"
            name="campaignName"
            value={formik.values.campaignName}
            onChange={formik.handleChange}
            InputProps={{ style: { borderRadius: "10px" } }}
            sx={{ mb: 2 }}
          />

          <Box component="span" sx={{ fontWeight: 600 }}>
            Send Campaign To
          </Box>
          <RadioGroup
            row
            name="sendCampaignTo"
            value={formik.values.sendCampaignTo}
            onChange={formik.handleChange}
            sx={{ mt: 1 }}
          >
            <FormControlLabel value="Numbers" control={<Radio />} label="Numbers" />
            <FormControlLabel value="UploadFile" control={<Radio />} label="Upload File" />
            <FormControlLabel value="Groups" control={<Radio />} label="Groups" />
          </RadioGroup>

          {formik.values.sendCampaignTo === 'Numbers' && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <span>Total Mobile Numbers: {phoneCount}</span>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined" onClick={() => setPhoneNumber('')}>Remove Invalid Numbers</Button>
                  <Button variant="outlined" onClick={uniqNumber}>Unique Numbers</Button>
                </Box>
              </Box>
              <TextField
                label="Phone Number"
                multiline
                rows={7}
                fullWidth
                variant="outlined"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{ mb: 2, borderRadius: "10px" }}
              />
            </Box>
          )}

          {formik.values.sendCampaignTo === 'UploadFile' && (
            <Box sx={{ mb: 2 }}>
              <Tabs
                value={formik.values.selectedTab}
                onChange={(e, value) => formik.setFieldValue('selectedTab', value)}
              >
                <Tab value="xls-csv" label="Upload XLS or CSV" />
                <Tab value="google-sheet" label="Upload Google Sheet" />
              </Tabs>

              {formik.values.selectedTab === 'xls-csv' && (
                <Box sx={{ mt: 2 }}>
                  <Input
                    type="file"
                    id="file-upload"
                    name="fileUpload"
                    onChange={(e) => {
                      const file = (e.currentTarget as HTMLInputElement).files?.[0];
                      formik.setFieldValue('fileUpload', file);
                    }}
                  />
                  <label htmlFor="file-upload">
                    <Button component="span" variant="outlined">Upload File</Button>
                  </label>
                  <Box mt={1}>Supported Formats: CSV & XLS</Box>
                </Box>
              )}

              {formik.values.selectedTab === 'google-sheet' && (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    label="Add File URL"
                    variant="outlined"
                    fullWidth
                    name="fileUrl"
                    value={formik.values.fileUrl}
                    onChange={formik.handleChange}
                    sx={{ mb: 2 }}
                  />
                  <Button variant="outlined">Upload</Button>
                </Box>
              )}
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type="submit" variant="contained" color="primary">Send Campaign</Button>
            <Button variant="outlined">Schedule</Button>
            <Button variant="outlined" color="error">Cancel</Button>
          </Box>
        </form>
      </Box>

      {/* Preview Section */}
      {/* <Box width={{ xs: "100%", md: "40%" }} height={{ xs: "auto", md: "100vh" }} sx={{ p: 2 }}> */}
      {/* {loadingPreview && (
          <Box display="flex" justifyContent="center" alignItems="center" my={2}>
            <CircularProgress />
          </Box>
        )} */}

      {/* {previewError && (
          <Typography color="error" my={2}>
            {previewError}
          </Typography>
        )} */}

      {/* Pass the preview content to the Mobile_view component */}
      {/* </Box> */}
      <Mobile_view />
    </Box>
  );
};

export default CampaignPage;