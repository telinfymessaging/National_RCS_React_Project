import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../../store';

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
}

const initialState: TemplatesState = {
  templates: [], // Start with an empty array
  status: 'idle',
  error: null,
};

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    fetchTemplatesStart(state) {
      state.status = 'loading';
    },
    fetchTemplatesSuccess(state, action: PayloadAction<Template[]>) {
      state.status = 'succeeded';
<<<<<<< Updated upstream
      state.templates = action.payload; // Store the array directly
=======
      state.templates = action.payload;
      console.log(action.payload,"template action");
       // Store the array directly
>>>>>>> Stashed changes
    },
    fetchTemplatesFailure(state, action: PayloadAction<string>) {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { fetchTemplatesStart, fetchTemplatesSuccess, fetchTemplatesFailure } = templatesSlice.actions;

export const fetchTemplates = () => async (dispatch: AppDispatch) => {
  dispatch(fetchTemplatesStart());
  try {
<<<<<<< Updated upstream
    const response = await axios.get<{ message: Template[] }>('api/templates'); // Adjust the endpoint
    const templatesArray = response.data.message; // Access the nested `message` array
    console.log(templatesArray,'dsfsfs');
    
    dispatch(fetchTemplatesSuccess(templatesArray)); // Dispatch the array to the store
=======
    const response = await axios.get<{ message: Template[] }>('api/template'); // Adjust the endpoint
    console.log(response);

    const templatesArray = response.data.message;
    // Access the nested `message` array
    dispatch(fetchTemplatesSuccess(templatesArray)); // Dispatch the array to the store
    console.log( dispatch(fetchTemplatesSuccess(templatesArray)));
>>>>>>> Stashed changes
  } catch (error: any) {
    dispatch(fetchTemplatesFailure(error.message));
  }
};

export default templatesSlice.reducer;
