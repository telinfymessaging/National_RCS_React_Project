'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  // setReports,
  selectReports,
  selectReportsStatus,
  selectSelectedReport,
  setReports,
  setSelectedReport,
  // selectSelectedReport,
  // setSelectedReport,
  // setReportsStatus,
  // setReportsError,
} from '../../slices/campaign-reports/campaign-reports';
import {
  Box,
  Typography,
  Checkbox,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Button,
  Pagination,
  Avatar,
  IconButton,
  Tooltip,
  Fade,
  tooltipClasses,
  TooltipProps,
  styled,
  TablePagination,
} from '@mui/material';
import { Report } from '../../slices/campaign-reports/campaign-reports';
import { AppDispatch } from '@/app/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { downloadCampaignReport, GetAllCampaigns } from '@/app/constants/URLConstants';

const CampaignReports: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const reports:Report[] = useSelector(selectReports) ?? [];
  const status = useSelector(selectReportsStatus);
  const selectedReport = useSelector(selectSelectedReport);
  const router = useRouter();
  const [page, setPage] = useState(0); // Page index, starting from 0
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  
  // Fetch reports data when the component mounts
  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        const response = await axios.get(GetAllCampaigns,{
          headers: {
             'token_RCS':localStorage.getItem("RCS_token")
          }
        });
        console.log('Fetched Reports:', response.data);
  
        // Adjust if reports are nested inside a `data` property
        const reports = response.data.message || response.data;
        
        if (Array.isArray(reports) && reports.length > 0) {
          reports.sort(
            (a: Report, b: Report) =>
              new Date(b.recv_timestamp).getTime() - new Date(a.recv_timestamp).getTime()
          );
          dispatch(setReports(reports));
          console.log(dispatch(setReports(reports)),'rrrr');
          
        } else {
          console.warn('No reports found or data is not an array.');
        }
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };
    fetchReportsData();
  }, [dispatch]);
  console.log('Reports in Component:', reports); // Debugging line

  const handleReportSelect = (report: Report) => {
    if (selectedReport?.tid === report.tid) {
      // If the report is already selected, unselect it by setting selectedReport to null
      dispatch(setSelectedReport(null));
    } else {
      // Otherwise, select the report
      dispatch(setSelectedReport(report));
    }
  };

  const handleAddTemplate = () => {
    router.push('/add-template');
  };
  const handleReports = () => {
    router.push('/reports');
  };

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#A02695',
      color: '#ffff',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(15),
    },
  }));

  const indexOfLastReport = (page + 1) * rowsPerPage;
  const indexOfFirstReport = indexOfLastReport - rowsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);
  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 5));
    setPage(0); // Reset to the first page
  };
 
//   const downloadCReport = (event:any)=>{
//     console.log("dssdsd");
    
// console.log(downloadName,"sel");

//   }
 
    const downloadCReport = async () => {
      if (selectedReport) {
        

        try {
          const downloadName = selectedReport?.tid
          console.log("Encoded Template Name: ", downloadName);
          const token = localStorage.getItem("RCS_token");
          console.log(token,'token');
          
          const response = await axios.post(
            downloadCampaignReport,
            {cid:downloadName} ,
            {
              headers: {
                'token_RCS': token, // Replace with your actual token or relevant header
              }, 
            }
          );
          router.push("/download");
          console.log("API Response: ", response);
        } catch (error: any) {
          console.error("API Error: ", error);
        }
      }
    };

  return (
    <Box  p={3}>
         <header className="flex justify-between p-4">
        <Typography variant="h4"> Reports</Typography>
        <Box>
        <HtmlTooltip disableFocusListener  TransitionComponent={Fade}
  TransitionProps={{ timeout: 600 }} title="Reports" arrow>
            <IconButton onClick={handleReports}>
        <CalendarMonthIcon className='mr-5 text-3xl text-[#A02695]'/>
            </IconButton>
            </HtmlTooltip>
        <Button onClick={handleAddTemplate} className="bg-transparent border border-solid border-[#A02695] text-[#A02695] px-4 py-3 font-bold rounded hover:bg-[#A02695] hover:text-white">
          Add Template
        </Button>
        </Box>
      </header>
      <Box sx={{position:'relative',display:'flex',justifyContent:'end'}}>
      <Paper elevation={3} sx={{ flex: 1, p: 2, mr: 3 }}>
        <Typography variant="h6" gutterBottom>
          Campaign Reports
        </Typography>
        <Box mb={2}>
          <Checkbox />
          <Typography component="span">Select All</Typography>
        </Box>
     {currentReports.length > 0 ? (
            <List >
              {currentReports.map((report: Report, index: number) => (
                <ListItem key={index} button sx={{borderBottom:"1px solid #F2F4F7"}}>
                
                <Checkbox
                    checked={selectedReport?.tid === report.tid}
                    onChange={() => handleReportSelect(report)}
                  />
               
                <Box className="w-min	px-3 py-2 rounded-xl	font-bold	" sx={{ bgcolor: '#E5E7EB', marginRight: 2 }}>
  {new Date(report.recv_timestamp).toLocaleDateString('en-US', {
    month: 'short',   // 'short' for abbreviated month name (e.g., "Jan")
    day: '2-digit',   // '2-digit' for two-digit day (e.g., "01")
    year: 'numeric',  // 'numeric' for four-digit year (e.g., "2024")
  })}
</Box>

<ListItemText
  primary={<span className='text-base font-semibold'>{report.campaign_name}</span>}
  secondary={
    <>
      <span className='text-sm font-semibold'>
        {new Date(report.recv_timestamp).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
      <br />
      <span className='text-sm font-semibold'>{report.rcs_data}</span>
    </>
  }
/>

                <Button variant="contained"  style={{
    backgroundColor: report.status1 === 2 
      ? '#0B815A' 
      : report.status1 === 1 
        ? '#e4a11c' 
        : '#d82c2b'
  }}>
  {report.status1 === 2
    ? 'Campaign Completed'
    : report.status1 === 1
      ? 'Campaign Running'
      : 'Not Running'}
</Button>

                </ListItem>
              ))}
            </List>
          ) : (
            <Typography>No reports available.</Typography>
          )}
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'end', mt: 3 }}>
  <TablePagination
    sx={{ marginTop: '15px' }}
    component="div"
    count={reports.length} // Total number of reports
    page={page}
    onPageChange={handleChangePage}
    rowsPerPage={rowsPerPage}
    onRowsPerPageChange={handleChangeRowsPerPage}
  />
</Box>
      </Paper>

       {selectedReport && (
          <Paper
            elevation={3}
            sx={{
              p: 2,
              minWidth: '300px',
              position: "absolute",
              top: '0',
              width: "358px",
              padding: "33px 46px 27px 40px",
              right: "-27px"
            }}
          >
            <Typography variant="h6" sx={{ margin: '0 0 16px' }} className='text-base font-normal'>
              Campaign Status
            </Typography>
            <Box>
              <Box display="flex" justifyContent="space-between" mb={1} alignItems="center">
                <Typography className='text-base font-bold text-black block'>Total</Typography>
                <Typography className='block w-16 rounded bg-[#F0F0F0] p-2 text-[#595959] text-right'>{selectedReport.act_rcs}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1} alignItems="center">
                <Typography className='text-base font-bold text-black '>Delivered</Typography>
                <Typography className='block w-16 rounded bg-[#F0F0F0] p-2 text-[#595959] text-right'>{selectedReport.delivered_rcs}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1} alignItems="center">
                <Typography className='text-base font-bold text-black '>Read</Typography>
                <Typography className='block w-16 rounded bg-[#F0F0F0] p-2 text-[#595959] text-right'>{selectedReport.read_rcs}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1} alignItems="center">
                <Typography className='text-base font-bold text-black '>Failed</Typography>
                <Typography className='block w-16 rounded bg-[#F0F0F0] p-2 text-[#595959] text-right'>{selectedReport.un_delivered_rcs}</Typography>
              </Box>
            </Box>
            <Box mt={2}>
              <Typography variant="body1" className='text-base font-bold text-black '>
                Campaign Name: {selectedReport.campaign_name}
              </Typography>
              <Typography variant="body1" className='text-base font-bold text-black '>
                Template Name: {selectedReport.rcs_data}
              </Typography>
            </Box>
            <Button
              onClick={downloadCReport}
              className='mx-auto mt-4 block border border-[#00AEEF] bg-[#F0F0F0] text-[#00AEEF] rounded-lg border-solid py-2 px-6 font-semibold'
              sx={{ mt: 2 }}
            >
              Download
            </Button>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default CampaignReports;



