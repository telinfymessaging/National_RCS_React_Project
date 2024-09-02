'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Skeleton,
  TablePagination,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { RootState } from '../../store/index';
import { setSelected, setFrmDate, setLstmDate, fetchReports, setPage, setRowsPerPage } from '../../slices/reports/reports';
import { PieChart } from '@mui/x-charts/PieChart';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import Image from 'next/image';
import EmptyFile from '../../../../public/assets/image/empty-file.png';

const ReportsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    selected,
    frmDate,
    lstmDate,
    page,
    rowsPerPage,
    reports,    chartData,
    chartDatalabels,
    status,
  } = useSelector((state: RootState) => state.report);

  const router = useRouter();

  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    // Clear all fields and reset the page
    dispatch(setPage(newPage));
    dispatch(setSelected(''));
    dispatch(setFrmDate(null));
    dispatch(setLstmDate(null));
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Clear all fields when rows per page changes
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
    dispatch(setSelected(''));
    dispatch(setFrmDate(null));
    dispatch(setLstmDate(null));
  };

  const handleSearch = () => {
    dispatch(fetchReports());
  };

  const handleAddTemplate = () => {
    router.push('/add-template');
  };

  const colors = ['#0085FF', '#01C43B', '#FF002B', '#FFB002'];

  const pieChartData = chartData.map((value, index) => ({
    value,
    label: chartDatalabels[index],
    color: colors[index % colors.length],
  }));

  const paginatedData = reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const formatDate = (date: string | null) => {
    return date ? dayjs(date).format('DD/MM/YYYY') : '--';
  };

  return (
    <Box className="max-w-[1010px] mx-auto p-5">
      <header className="flex justify-between">
        <Typography variant="h4">Manage Reports</Typography>
        <Button  onClick={handleAddTemplate}  className="bg-transparent border border-solid border-[#A02695] text-[#A02695] px-4 py-2 font-bold rounded hover:bg-[#A02695] hover:text-white">
          Add Template
        </Button>
      </header>

      <Box >
        {chartData.length > 0 && (
          <PieChart
            series={[
              {
                data: pieChartData,
                highlightScope: { faded: 'global', highlighted: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
              },
            ]}
            height={300}
          />
        )}
      </Box>

      <Box sx={{ backgroundColor: '#ffffff', padding: '20px', marginTop: '20px', borderRadius: '12px' }}>
        <Box   className="flex justify-between mt-4">
          <Box className="w-full md:w-1/4">
            <FormControl  className='w-full md:w-3/4'>
              <Select
              className="h-11 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#A02695] font-bold"
              value={selected}
                style={{padding:"0 0"}}
                onChange={(e) => dispatch(setSelected(e.target.value))}
              displayEmpty
              >
                <MenuItem value="COMPOSE" className='p-0 '>Compose</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* From Date Picker */}
          <Box  className="w-full md:w-1/4">
            <DatePicker
              selected={frmDate ? new Date(frmDate) : null}
              onChange={(date: Date | null) => dispatch(setFrmDate(date ? date.toISOString() : null))}
              placeholderText="From Date"
              dateFormat="dd-MM-yyyy"
              className="form-control w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              wrapperClassName="date-picker-wrapper"
              showPopperArrow={false}
            />
          </Box>

          {/* To Date Picker */}
          <Box className="w-full md:w-1/4">
            <DatePicker
              selected={lstmDate ? new Date(lstmDate) : null}
              onChange={(date: Date | null) => dispatch(setLstmDate(date ? date.toISOString() : null))}
              placeholderText="To Date"
              dateFormat="dd-MM-yyyy"
              className="form-control w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              wrapperClassName="date-picker-wrapper"
              showPopperArrow={false}
            />
          </Box>

          <Box className="w-full md:w-1/4">
            <Button variant="contained" onClick={handleSearch} className="bg-[#A02695] font-bold text-white px-4 py-2 rounded border-2 border-green-400 hover:bg-[#A02695]">
              Get Report
            </Button>
          </Box>
        </Box>

        {/* Responsive Table Wrapper */}
        <Box sx={{ marginTop: 4, overflowX: 'auto', whiteSpace: 'nowrap' , border:'1px solid black', borderRadius:'12px',padding:'10px'}}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' ,borderBottom: '0px'}}>Mobile</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,borderBottom: '0px'}}>Template</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,borderBottom: '0px'}}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,borderBottom: '0px'}}>Error Code</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,borderBottom: '0px'}}>Credits Used</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,borderBottom: '0px'}}>Send Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,borderBottom: '0px'}}>Delivery Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,borderBottom: '0px'}}>Read Time</TableCell>
                <TableCell sx={{ fontWeight: 'bold' ,borderBottom: '0px'}}>Response</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {status === 'loading' ? (
                Array.from(new Array(5)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                  </TableRow>
                ))
              ) : paginatedData.length > 0 ? (
                paginatedData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ borderBottom: '0px' }}>{item.phone_number}</TableCell>
                    <TableCell sx={{ borderBottom: '0px' , whiteSpace: 'normal',
    wordWrap: 'break-word',
    maxWidth: '150px',}}>{item.rcs_data1 || 'N/A'}</TableCell>
                    <TableCell sx={{ borderBottom: '0px' }}>{item.rcs_status1}</TableCell>
                    <TableCell sx={{ borderBottom: '0px' }}>
                      <Tooltip title={getTooltip(item.error_code)}>
                        <span>{item.error_code}</span>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '0px' }}>{item.reply_data || 'No'}</TableCell>
                    <TableCell sx={{ borderBottom: '0px' }}>{formatDate(item.insert_timestamp)}</TableCell>
                    <TableCell sx={{ borderBottom: '0px' }}>{formatDate(item.delivered_timestamp)}</TableCell>
                    <TableCell sx={{ borderBottom: '0px' }}>{formatDate(item.read_timestamp)}</TableCell>
                    <TableCell sx={{ borderBottom: '0px' }}>Success</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} className="text-center">
                  <Image
        src={EmptyFile}
        width={500}
        height={500}
        className='mx-auto'
        alt="Picture of the author"
      />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* Pagination */}
          <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={reports.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </Box>
      </Box>
    </Box>
  );
};

const getTooltip = (errorCode: number): string => {
  switch (errorCode) {
    case 400:
      return 'MAAP specific error (or) Invalid template data (or) Google rate limit';
    case 402:
      return 'Insufficient balance';
    case 403:
      return 'Curfew hours';
    case 404:
      return 'Number is RCS Disabled';
    case 409:
      return 'Invalid template';
    case 410:
      return 'Opted out';
    case 423:
      return 'DND enabled';
    case 429:
      return 'Monthly message limit exceeded';
    default:
      return '';
  }
};

export default ReportsPage;
