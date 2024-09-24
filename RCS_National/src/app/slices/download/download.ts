import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
interface DownloadState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DownloadState = {
  data: [],
  loading: false,
  error: null,
};

// Step 2: Create the slice with regular reducers
const downloadSlice = createSlice({
  name: 'download',
  initialState,
  reducers: {
    fetchDownloadListStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchDownloadListSuccess(state, action: PayloadAction<any[]>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDownloadListFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearDownloadList(state) {
      state.data = [];
    },
  },
});

export const {
  fetchDownloadListStart,
  fetchDownloadListSuccess,
  fetchDownloadListFailure,
  clearDownloadList,
} = downloadSlice.actions;

export default downloadSlice.reducer;
