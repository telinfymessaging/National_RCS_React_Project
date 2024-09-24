import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '@/app/store';
// import { IgetAllTemplates, ITemplatePreview } from './interfaces';

export interface CampaignState {
  showAggregatedData: any;
  showStatusBlk: any;
  selectedCampaign: any;
  error: any;
  selectedReport: any;
  status: any;
  reports: any;
  templates: IgetAllTemplates[];
  loadingTemplates: boolean;
  templatesError: string | null;
  preview: ITemplatePreview | null;
  loadingPreview: boolean;
  previewError: string | null;
  template1: any | null;
  template2: any | null;
  templateImage: string | null;
  selectedTemplateName: string | null;
}

export interface ITemplatePreview {}

export interface IgetAllTemplates {
  tid: number;
  user_id: number;
  template_name: string;
  template_description: string;
  template_type: string;
  template_json_data_VI: string | null;
  template_json_data: string | null;
  template_json_fileURL: string | null;
  status: 'approved' | 'pending' | 'rejected';
  rejectedComment: string;
  insert_timestamp: string;
}

const initialState: CampaignState = {
  templates: [],
  loadingTemplates: false,
  templatesError: null,
  preview: null,
  loadingPreview: false,
  previewError: null,
  template1: null,
  template2: null,
  templateImage: null,
  selectedTemplateName: '',
  error: undefined,
  selectedReport: undefined,
  status: undefined,
  reports: undefined,
  showAggregatedData: false,
  showStatusBlk: false,
  selectedCampaign: null,
};

const campaignReportsSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    fetchTemplatesStart(state) {
      state.loadingTemplates = true;
      state.templatesError = null;
    },
    fetchTemplatesSuccess(state, action: PayloadAction<IgetAllTemplates[]>) {
      state.templates = action.payload;
      state.loadingTemplates = false;
    },
    fetchTemplatesFailure(state, action: PayloadAction<string>) {
      state.loadingTemplates = false;
      state.templatesError = action.payload;
    },
    fetchPreviewStart(state) {
      state.loadingPreview = true;
      state.previewError = null;
      state.preview = null;
    },
    fetchPreviewSuccess(state, action: PayloadAction<any>) {
      const res = action.payload;
    
      if (res.message && res.message.template_json_data_VI !== null && (res.message.template_json_data === null || res.message.template_json_data === '')) {
        // VI Template
        
        state.preview = JSON.parse(res.message.template_json_data_VI);
      } else if (res.message && res.message.template_json_data !== null && (res.message.template_json_data_VI === null || res.message.template_json_data_VI ==='')) {
        // Jio Template
         ;
         state.templateImage=res.message.template_json_fileURL;
      
        state.preview = JSON.parse(res.message.template_json_data);
      }
      state.loadingPreview = false;
    },
    fetchPreviewFailure(state, action: PayloadAction<string>) {
      state.loadingPreview = false;
      state.previewError = action.payload;
    },
    clearPreview(state) {
      state.preview = null;
      state.loadingPreview = false;
      state.previewError = null;
    },
    setSelectedTemplateName(state, action: PayloadAction<string>) {
      state.selectedTemplateName = action.payload;
    },
  },
});

export const {
  fetchTemplatesStart,
  fetchTemplatesSuccess,
  fetchTemplatesFailure,
  fetchPreviewStart,
  fetchPreviewSuccess,
  fetchPreviewFailure,
  clearPreview,
  setSelectedTemplateName,
} = campaignReportsSlice.actions;

export const fetchTemplates = () => async (dispatch: AppDispatch) => {
  dispatch(fetchTemplatesStart());
  try {
    const response = await axios.get('/api/templates'); // Replace with your actual API endpoint
    dispatch(fetchTemplatesSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchTemplatesFailure(error.message || 'Failed to fetch templates'));
  }
};

export const fetchTemplatePreview = (templateName:any) => async (dispatch: AppDispatch) => {
  const encodedTemplateName = btoa(templateName);

  dispatch(fetchPreviewStart());
  try {
    const response = await axios.post('/api/campaign', { templateId: encodedTemplateName });
    dispatch(fetchPreviewSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchPreviewFailure(error.message || 'Failed to fetch template preview'));
  }
};

// Selectors
export const selectCampaignTemplates = (state: any) => state.campaign.templates;
export const selectTemplatesLoading = (state: any) => state.campaign.loadingTemplates;
export const selectTemplatesError = (state: any) => state.campaign.templatesError;
export const selectSelectedTemplateName = (state: any) => state.campaign.selectedTemplateName;
export const selectPreview = (state: any) => state.campaign.preview;
export const selectPreviewLoading = (state: any) => state.campaign.loadingPreview;
export const selectPreviewError = (state: any) => state.campaign.previewError;
export const selectTemplateImage = (state: any) => state.campaign.templateImage;

export default campaignReportsSlice.reducer;
