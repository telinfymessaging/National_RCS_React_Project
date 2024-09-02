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
export interface ITemplatePreview {

}
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
  showAggregatedData: false,  // Add this property
  showStatusBlk: false,       // Add this property
  selectedCampaign: null,     // Add this property
};

const campaignReportsSlice = createSlice({
  name: 'campaignReports',
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
  
        if (res.message.hasOwnProperty('template_json_data_VI') && res.message.template_json_data_VI !== null) {
          state.template1 = JSON.parse(res.message.template_json_data_VI);
          state.template2 = '';
        } else if (res.message.template_json_data_VI === null && res.message.template_json_data) {
          state.template2 = JSON.parse(res.message.template_json_data);
          state.template1 = '';
          state.templateImage = res.message.template_json_fileURL;
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

export const fetchTemplatePreview = (templateName: string) => async (dispatch: AppDispatch) => {
  const encodedTemplateName = btoa(templateName);

  dispatch(fetchPreviewStart());
  try {
    const response = await axios.post('/api/campaign', { templateId: encodedTemplateName });
    dispatch(fetchPreviewSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchPreviewFailure(error.message || 'Failed to fetch template preview'));
  }
};
// export const { setSelectedTemplateName } = selectTemplateName.actions;

export const selectCampaignTemplates = (state: any) => state.campaign.templates;
export const selectTemplatesLoading = (state: any) => state.campaign.loadingTemplates;
export const selectTemplatesError = (state: any) => state.campaign.templatesError;
export const selectSelectedTemplateName = (state: any) => state.campaign.selectedTemplateName;
export const selectPreview = (state: any) => state.campaign.preview;

export const selectPreviewLoading = (state: any) => state.campaign.loadingPreview;
export const selectPreviewError = (state: any) => state.campaign.previewError;

export default campaignReportsSlice.reducer;
