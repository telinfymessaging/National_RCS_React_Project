import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Select, MenuItem, TextField, FormControl, InputLabel } from '@mui/material';
import { addSuggestion, removeSuggestion, updateSuggestion } from '../../slices/add-template/formSlice';
import { RootState } from '../../store/index';
import DeleteIcon from '@mui/icons-material/Delete';

const SuggestionForm: React.FC = () => {
  const dispatch = useDispatch();
  const suggestions = useSelector((state: RootState) => state.form.suggestions);

  const handleAddSuggestion = () => {
    dispatch(
      addSuggestion({
        suggestionType: 'reply',
        displayText: '',
        postback: '',
      })
    );
  };

  const handleRemoveSuggestion = (index: number) => {
    dispatch(removeSuggestion(index));
  };

  const handleInputChange = (
    index: number,
    field: keyof typeof suggestions[0],
    value: string
  ) => {
    const updatedSuggestion = { ...suggestions[index], [field]: value };
    dispatch(updateSuggestion({ index, suggestion: updatedSuggestion }));
  };

  return (
    <Box mt={3} sx={{backgroundColor:'#ffffff',padding:'26px 0 12px 46px',borderRadius:'12px'}}>
      <Button variant="contained" onClick={handleAddSuggestion}>
        + Add Suggestion
      </Button>
      {suggestions.map((suggestion, index) => (
        <Box key={index} mt={2}  gap="12px"  display="flex" >
          <FormControl fullWidth margin="normal">
            <InputLabel>Type of Action</InputLabel>
            <Select
              value={suggestion.suggestionType}
              onChange={(e) => handleInputChange(index, 'suggestionType', e.target.value as string)}
              label="Type of Action"
            >
              <MenuItem value="reply">REPLY</MenuItem>
              <MenuItem value="url_action">URL ACTION</MenuItem>
              <MenuItem value="dialer_action">DIALER ACTION</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            label="Suggestion Text"
            value={suggestion.displayText}
            onChange={(e) => handleInputChange(index, 'displayText', e.target.value)}
          />

          {suggestion.suggestionType === 'reply' && (
            <TextField
              fullWidth
              margin="normal"
              label="Suggestion Postback"
              value={suggestion.postback || ''}
              onChange={(e) => handleInputChange(index, 'postback', e.target.value)}
            />
          )}

          {suggestion.suggestionType === 'url_action' && (
            <TextField
              fullWidth
              margin="normal"
              label="URL/URI"
              value={suggestion.url || ''}
              onChange={(e) => handleInputChange(index, 'url', e.target.value)}
            />
          )}

          {suggestion.suggestionType === 'dialer_action' && (
            <TextField
              fullWidth
              margin="normal"
              label="Phone Number"
              value={suggestion.phoneNumber || ''}
              onChange={(e) => handleInputChange(index, 'phoneNumber', e.target.value)}
            />
          )}

          <Button  color="error" onClick={() => handleRemoveSuggestion(index)}>
            <DeleteIcon/>
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default SuggestionForm;
