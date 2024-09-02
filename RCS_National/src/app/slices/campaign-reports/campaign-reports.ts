import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '@/app/store';  // Import your AppDispatch type

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
}

const initialState: CampaignReportsState = {
  reports: [],
  status: 'idle',
  error: null,
};

const campaignReportsSlice = createSlice({
  name: 'campaignReports',
  initialState,
  reducers: {
    fetchTemplatesStart(state) {
      state.status = 'loading';
    },
    fetchTemplatesSuccess(state, action: PayloadAction<Report[]>) {
      state.status = 'succeeded';
      state.reports = action.payload;
      console.log(action.payload,"template action");
       // Store the array directly
    },
    fetchTemplatesFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchTemplatesStart, fetchTemplatesSuccess, fetchTemplatesFailure } = campaignReportsSlice.actions;

export const fetchReports = () => async (dispatch: AppDispatch) => {
  dispatch(fetchTemplatesStart());
  try {
    const response = await axios.get('/api/campaign-reports'); // Adjust the endpoint
    console.log(response);

    const templatesArray = response.data;
    // Access the nested `message` array
    dispatch(fetchTemplatesSuccess(templatesArray)); // Dispatch the array to the store
    console.log( dispatch(fetchTemplatesSuccess(templatesArray)));
  } catch (error: any) {
    dispatch(fetchTemplatesFailure(error.message));
  }
};


export const selectReports = (state: { campaignReports: CampaignReportsState }) => state.campaignReports.reports;
export const selectReportsStatus = (state: { campaignReports: CampaignReportsState }) => state.campaignReports.status;
export const selectReportsError = (state: { campaignReports: CampaignReportsState }) => state.campaignReports.error;

export default campaignReportsSlice.reducer;
