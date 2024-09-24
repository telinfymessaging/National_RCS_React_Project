'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
  Button,
  CircularProgress,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/index';
import Image from 'next/image';
import EmptyFile from '../../../../public/assets/image/empty-file.png';
import { fetchDownloadListFailure, fetchDownloadListStart, fetchDownloadListSuccess } from '@/app/slices/download/download';
import axios from 'axios';
import { saveAs } from 'file-saver'; // Import file-saver for downloading files
import { downloadReport } from '@/app/constants/URLConstants';

const DownloadPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [downloading, setDownloading] = useState<string | null>(null); // Track which file is downloading

  // Access the download state
  const { data, loading, error } = useSelector((state: RootState) => state.download || { data: [], loading: false, error: null });

  // Fetch download list function
  const fetchDownloadList = async () => {
    try {
      dispatch(fetchDownloadListStart()); // Start loading state
      const response = await axios.get('/api/download'); // Replace with your actual API
      dispatch(fetchDownloadListSuccess(response.data.message)); // Dispatch success state with data
    } catch (error: any) {
      dispatch(fetchDownloadListFailure(error.message || 'Failed to fetch data')); // Dispatch failure state
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchDownloadList();
  }, []);

  // Function to trigger file download with headers and body
  const downloadFile = async (filePath: string) => {
    try {
      setDownloading(filePath); // Show spinner on the respective file
      const token = localStorage.getItem("RCS_token");
      console.log("token",token);
      
      const headers = {
        'token_RCS': token, // Add your token or authorization header here
        'Content-Type': 'application/json', // Content type if required
      };

      // Body payload (you can adjust the payload as needed)
      const body = {
        filePath, // Pass the file path in the body
      };
      console.log(body,"body");
      

      // Make the API request
      const response = await axios.post(
        downloadReport, // API URL
        body, // Request body
        {
          headers, // Request headers
          responseType: 'blob', // Ensures we get a file in binary format (Blob)
        }
      );
console.log("res",response);

      // Use FileSaver to save the file locally
      const fileName = filePath.split('/').pop() || 'file';
      saveAs(response.data, fileName); // Save the file using file-saver

      setDownloading(null); // Stop spinner after download
    } catch (error) {
      console.error('Error downloading file:', error);
      setDownloading(null); // Stop spinner in case of error
    }
  };

  // Render loading state
  if (loading) {
    return (
      <Box>
        <div>Loading...</div>
        <Table>
          <TableBody>
            {Array.from(new Array(5)).map((_, index) => (
              <TableRow key={index}>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
                <TableCell><Skeleton /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    );
  }

  // Render error state
  if (error) {
    return <Box>Error: {error}</Box>;
  }

  return (
    <Box sx={{ backgroundColor: '#ffffff', padding: '20px', marginTop: '20px', borderRadius: '12px' }}>
      <Box sx={{ marginTop: 4, overflowX: 'auto', whiteSpace: 'nowrap', border: '1px solid black', borderRadius: '12px', padding: '10px' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', borderBottom: '0px' }}>Date</TableCell>
              <TableCell sx={{ fontWeight: 'bold', borderBottom: '0px' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', borderBottom: '0px' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ borderBottom: '0px' }}>{item.done_timestamp}</TableCell>
                  <TableCell sx={{ borderBottom: '0px' }}>{item.file_path}</TableCell>
                  <TableCell sx={{ borderBottom: '0px' }}>
                    <Button
                      variant="contained"
                      onClick={() => downloadFile(item.file_path)}
                      disabled={downloading === item.file_path} // Disable button while file is downloading
                    >
                      {downloading === item.file_path ? <CircularProgress size={24} /> : 'Download'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  <Image
                    src={EmptyFile}
                    width={500}
                    height={500}
                    className='mx-auto'
                    alt="No data available"
                  />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default DownloadPage;
