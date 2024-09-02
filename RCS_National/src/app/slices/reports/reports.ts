import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch, RootState } from '../../store';
import dayjs from 'dayjs';

interface Report {
  phone_number: number;
  rcs_data1: string | null;
  no_of_credits: number;
  rcs_status1: string;
  error_code: number;
  reply_data: string | null;
  insert_timestamp: string;
  delivered_timestamp: string | null;
  read_timestamp: string | null;
}

interface ReportsState {
  reports: Report[];
  chartData: number[];
  chartDatalabels: string[];
  selected: string;
  frmDate: string | null;
  lstmDate: string | null;
  page: number;
  rowsPerPage: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  downloadStatus: boolean;
}

interface FetchReportsSuccessPayload {
  reports: Report[];
  chartData: number[];
  chartDatalabels: string[];
}

const initialState: ReportsState = {
  reports: [],
  chartData: [],
  chartDatalabels: [],
  selected: 'COMPOSE',
  frmDate: null,
  lstmDate: null,
  page: 0,
  rowsPerPage: 10,
  status: 'idle',
  error: null,
  downloadStatus: false,
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setSelected(state, action: PayloadAction<string>) {
      state.selected = action.payload;
    },
    setFrmDate(state, action: PayloadAction<string | null>) {
      state.frmDate = action.payload;
    },
    setLstmDate(state, action: PayloadAction<string | null>) {
      state.lstmDate = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    fetchReportsStart(state) {
      state.status = 'loading';
    },
    fetchReportsSuccess(state, action: PayloadAction<FetchReportsSuccessPayload>) {
      state.status = 'succeeded';
      state.reports = action.payload.reports;
      state.chartData = action.payload.chartData;
      state.chartDatalabels = action.payload.chartDatalabels;
    },
    fetchReportsFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const {
  setSelected,
  setFrmDate,
  setLstmDate,
  setPage,
  setRowsPerPage,
  fetchReportsStart,
  fetchReportsSuccess,
  fetchReportsFailure,
} = reportsSlice.actions;

export const fetchReports = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { frmDate, lstmDate, downloadStatus, page, rowsPerPage } = getState().report;

  if (!frmDate || !lstmDate) {
    console.error("frmDate or lstmDate is missing");
    return;
  }

  dispatch(reportsSlice.actions.fetchReportsStart());

  try {
    const formattedFrmDate = dayjs(frmDate).format('YYYY-MM-DD HH:mm:ss');
    const formattedLstmDate = dayjs(lstmDate).format('YYYY-MM-DD HH:mm:ss');

    const response = await axios.post<{ message: Report[] }>('/api/reports', {
      frmDate: formattedFrmDate,
      toDate: formattedLstmDate,
      download_Status: downloadStatus,
    });

    if (response.status === 200) {
      const reportsArray = response.data.message;
      
      let Sent = 0;
      let Un_Deliverd = 0;
      let Deliverd = 0;
      let Read = 0;
      
      reportsArray.forEach((item) => {
        if (item.rcs_status1 === 'Sent') Sent++;
        if (item.rcs_status1 === 'Un Deliverd') Un_Deliverd++;
        if (item.rcs_status1 === 'Deliverd') Deliverd++;
        if (item.rcs_status1 === 'Read') Read++;
      });
      
      dispatch(reportsSlice.actions.fetchReportsSuccess({
        reports: reportsArray,
        chartData: [Sent, Deliverd, Un_Deliverd, Read],
        chartDatalabels: ['Sent', 'Delivered', 'Un-Delivered', 'Read'],
      }));
      
    } else {
      console.error("Failed to fetch reports:", response.data);
      dispatch(reportsSlice.actions.fetchReportsFailure("Failed to fetch reports"));
    }
  } catch (error: any) {
    console.error("Error fetching reports:", error.message);
    dispatch(reportsSlice.actions.fetchReportsFailure(error.message));
  }
};

export default reportsSlice.reducer;
