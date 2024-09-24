import { GetAllCampaigns } from '@/app/constants/URLConstants';
import { AppDispatch } from '@/app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Report {
  tid: number;
  no_of_rcs: number;
  recv_timestamp: string;
  rcs_data: string;
  campaign_name: string;
  status1: number;
  act_rcs: number;
  delivered_rcs: number;
  read_rcs: number;
  un_delivered_rcs: number;
}

interface CampaignReportsState {
  reports: Report[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  selectedReport: Report | null;
  
}

const initialState: CampaignReportsState = {
  reports: [],
  status: 'idle',
  error: null,
  selectedReport: null,
  
};

const campaignReportsSlice = createSlice({
  name: 'campaignReports',
  initialState,
  reducers: {
    setReports(state, action: PayloadAction<Report[]>) {
      state.reports = action.payload;
    },
    setSelectedReport(state, action: PayloadAction<Report | null>) {
      state.selectedReport = action.payload;
    },
    setReportsStatus(state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) {
      state.status = action.payload;
    },
    setReportsError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    
  },
});

export const { setReports, setSelectedReport, setReportsStatus, setReportsError } = campaignReportsSlice.actions;
export const fetchReports = () => async (dispatch: AppDispatch) => {
    // dispatch(fetchTemplatesStart());
    try {
      const response = await axios.get(GetAllCampaigns,{
        headers: {
           'token_RCS':localStorage.getItem("RCS_token")
        }
      }); // Adjust the endpoint
      console.log(response);
  
      const templatesArray = response.data;
      // Access the nested `message` array
      dispatch(setReports(templatesArray)); // Dispatch the array to the store
      console.log( dispatch(setReports(templatesArray)));
    } catch (error: any) {
      dispatch(setReportsError(error.message));
    }
  };
  
export const selectReports = (state: { campaignReports: CampaignReportsState }) => state.campaignReports.reports;
export const selectReportsStatus = (state: { campaignReports: CampaignReportsState }) => state.campaignReports.status;
export const selectSelectedReport = (state: { campaignReports: CampaignReportsState }) => state.campaignReports.selectedReport;

export default campaignReportsSlice.reducer;
