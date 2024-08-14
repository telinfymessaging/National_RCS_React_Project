'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Modal, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import copy from '../../../../public/assets/image/copy.svg';
import { RootState, AppDispatch } from '../../store';
import { fetchTemplates,Template } from '../../slices/templates/template';

const Templates: React.FC = () => {
  const [inputString, setInputString] = useState('');
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { templates, status, error } = useSelector((state: RootState) => state.templates);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTemplates());
    }
  }, [dispatch, status]);

  const filteredTemplates = templates.filter((template) =>
    template.template_name.toLowerCase().includes(inputString.toLowerCase())
  );

  const handleClose = () => setOpen(false);

  const handleAddTemplate = () => {
    router.push('/add-template');
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, templateName: string) => {
    setAnchorEl(event.currentTarget);
    setHoverDropdown(templateName);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setHoverDropdown(null);
  };

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    setOpen(true);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant="h1" sx={{ fontSize: '30px', fontWeight: '700', lineHeight: 1.6, color: '#60576B' }}>
          Templates
        </Typography>
        <Box display="flex" alignItems="center">
          <Button
            sx={{
              maxWidth: '158px',
              flexBasis: '158px',
              backgroundColor: 'transparent',
              color: '#A02695',
              padding: '13px',
              fontSize: '16px',
              borderRadius: '4px',
              fontWeight: '700',
              border: '0.565px solid #A02695',
            }}
            onClick={handleAddTemplate}
          >
            Add Template
          </Button>
        </Box>
      </Box>

      <Box component={Paper} sx={{ marginTop: '37px', padding: '23px 75px 100px 75px' }}>
        <Box display="flex" justifyContent="flex-end" marginRight="14px" mt={2} mb={2}>
          <TextField
            variant="outlined"
            placeholder="Search.."
            className='p-0'
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            sx={{ marginRight: '10px', borderRadius: '12px' }}
          />
          <Box display="flex" alignItems="center">
            <Button
              sx={{
                width: '107px',
                borderRadius: '12px',
                border: '1px solid #CDCDCD',
                padding: '3px 8px',
                fontSize: '14px',
                fontWeight: '600',
                color: 'black',
              }}
              startIcon={<FilterListIcon />}
            >
              Filter
            </Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template, index) => (
                  <TableRow key={index}>
                    <TableCell>{template.template_name}</TableCell>
                    <TableCell>{new Date(template.insert_timestamp).toLocaleString()}</TableCell>
                    <TableCell>{template.template_type}</TableCell>
                    <TableCell>
                      <Typography
                        color={
                          template.status === 'approved'
                            ? 'green'
                            : template.status === 'pending'
                            ? 'orange'
                            : 'red'
                        }
                      >
                        {template.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <Image src={copy} alt="copy" />
                      </IconButton>
                      <IconButton onClick={() => console.log('Delete template', template.template_name)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={(event) => handleMenuOpen(event, template.template_name)}>
                        <MoreVertIcon />
                        <Menu
                          anchorEl={anchorEl}
                          open={hoverDropdown === template.template_name}
                          onClose={handleMenuClose}
                        >
                          <MenuItem onClick={() => handlePreview(template)}>Preview Template</MenuItem>
                          <MenuItem onClick={() => console.log('Delete template', template.template_name)}>Delete Template</MenuItem>
                        </Menu>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>No templates found.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Template Preview
          </Typography>
          {selectedTemplate && (
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              <Typography>Name: {selectedTemplate.template_name}</Typography>
              <Typography>Type: {selectedTemplate.template_type}</Typography>
              <Typography>Status: {selectedTemplate.status}</Typography>
              <Typography>Last Updated: {new Date(selectedTemplate.insert_timestamp).toLocaleString()}</Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Templates;
