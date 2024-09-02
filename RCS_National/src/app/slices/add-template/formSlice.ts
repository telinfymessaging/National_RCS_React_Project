import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Suggestion {
  suggestionType: 'reply' | 'url_action' | 'dialer_action';
  displayText: string;
  postback?: string;
  url?: string;
  phoneNumber?: string;
}

export interface FormState {
  templateName: string;
  templateType: 'rich_card' | 'carousel' | 'text_message';
  orientation: 'VERTICAL' | 'HORIZONTAL';
  height: 'SHORT_HEIGHT' | 'MEDIUM_HEIGHT';
  image: string | null;
  cardTitle: string;
  cardDescription: string;
  suggestions: Suggestion[];
  [key: string]: any; // Allow additional properties
}

const initialState: FormState = {
  templateName: '',
  templateType: 'rich_card',
  orientation: 'VERTICAL',
  height: 'SHORT_HEIGHT',
  image: null,
  cardTitle: '',
  cardDescription: '',
  suggestions: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<{ name: keyof FormState; value: string }>) => {
        const { name, value } = action.payload;
        state[name] = value;
      },
    setTemplateName: (state, action: PayloadAction<string>) => {
      state.templateName = action.payload;
    },
    setTemplateType: (state, action: PayloadAction<'rich_card' | 'carousel' | 'text_message'>) => {
      state.templateType = action.payload;
    },
    setOrientation: (state, action: PayloadAction<'VERTICAL' | 'HORIZONTAL'>) => {
      state.orientation = action.payload;
    },
    setHeight: (state, action: PayloadAction<'SHORT_HEIGHT' | 'MEDIUM_HEIGHT'>) => {
      state.height = action.payload;
    },
    setImage: (state, action: PayloadAction<string | null>) => {
      state.image = action.payload;
    },
    setCardTitle: (state, action: PayloadAction<string>) => {
      state.cardTitle = action.payload;
    },
    setCardDescription: (state, action: PayloadAction<string>) => {
      state.cardDescription = action.payload;
    },
    addSuggestion: (state, action: PayloadAction<Suggestion>) => {
      state.suggestions.push(action.payload);
    },
    removeSuggestion: (state, action: PayloadAction<number>) => {
      state.suggestions.splice(action.payload, 1);
    },
    updateSuggestion: (
      state,
      action: PayloadAction<{ index: number; suggestion: Suggestion }>
    ) => {
      const { index, suggestion } = action.payload;
      state.suggestions[index] = suggestion;
    },
  },
});

export const {
  setTemplateName,
  setTemplateType,
  setOrientation,
  setHeight,
  setImage,
  setCardTitle,
  setCardDescription,
  addSuggestion,
  removeSuggestion,
  updateSuggestion,
  updateForm
} = formSlice.actions;

export default formSlice.reducer;
