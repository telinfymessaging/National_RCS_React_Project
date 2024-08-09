'use client';
import React from 'react';
import { Box, Button, FormControl, FormControlLabel, Input, InputLabel, MenuItem, Radio, RadioGroup, Select, Tab, Tabs, TextField } from '@mui/material';
import { useFormik } from 'formik';
import Mobile_view from "./_components/Mobile_view";

const page = () => {
  const formik = useFormik({
    initialValues: {
      template: '',
      campaignName: '',
      sendCampaignTo: 'Numbers',
      phoneNumbers: '',
      fileUrl: '',
      fileUpload: null,
      selectedTab: 'xls-csv',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box display={"flex"} flexDirection={{ xs: "column", md: "row" }} width="100%" justifyContent={"center"} alignItems={"center"} height="100vh">
      <Box width={{ xs: "100%", md: "50%" }} height={{ xs: "auto", md: "100vh" }} sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
        <form onSubmit={formik.handleSubmit}>
          <h2>Create a Campaign</h2>

          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Select a template</InputLabel>
            <Select
              fullWidth
              name="template"
              value={formik.values.template}
              onChange={formik.handleChange}
              sx={{
                borderRadius: '10px',
              }}
            >
              <MenuItem value="template1">Template 1</MenuItem>
              <MenuItem value="template2">Template 2</MenuItem>
              <MenuItem value="template3">Template 3</MenuItem>
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
                <span>Total Mobile Numbers: 0</span>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button variant="outlined">Remove Invalid Numbers</Button>
                  <Button variant="outlined">Unique Numbers</Button>
                </Box>
              </Box>
              <TextField
                label="Phone Number"
                multiline
                rows={7}
                fullWidth
                variant="outlined"
                name="phoneNumbers"
                value={formik.values.phoneNumbers}
                onChange={formik.handleChange}
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

      <Mobile_view />
    </Box>
  );
};

export default page;
