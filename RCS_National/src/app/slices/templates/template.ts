import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../../store';
import { GET_USER_RCS_TEMPLETS } from '@/app/constants/URLConstants';

export interface Template {
  tid: number;
  user_id: number;
  template_name: string;
  template_description: string;
  template_type: string;
  template_json_data_VI: string;
  template_json_data: string;
  template_json_fileURL: string | null;
  status: string;
  rejectedComment: string;
  insert_timestamp: string;
}

interface TemplatesState {
  templates: Template[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  inputString: string;
  page: number;
  rowsPerPage: number;
  filterStatus: string;  // Added filter status
}

const initialState: TemplatesState = {
  templates: [],
  status: 'idle',
  error: null,
  inputString: '',
  page: 0,
  rowsPerPage: 10,
  filterStatus: '', // Default: show all
};

// Define the async thunk
export const fetchTemplates = createAsyncThunk('templates/fetchTemplates', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<{ message: Template[] }>(GET_USER_RCS_TEMPLETS, {
      headers: {
         'token_RCS':localStorage.getItem("RCS_token")
      }
    });
    return response.data.message;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setInputString(state, action: PayloadAction<string>) {
      state.inputString = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setRowsPerPage(state, action: PayloadAction<number>) {
      state.rowsPerPage = action.payload;
    },
    setFilterStatus(state, action: PayloadAction<string>) {
      state.filterStatus = action.payload; // Set the filter status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setInputString, setPage, setRowsPerPage, setFilterStatus } = templatesSlice.actions;

export default templatesSlice.reducer;
