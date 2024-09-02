'use client';

<<<<<<< Updated upstream
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Modal, Typography } from '@mui/material';
=======
import React, { useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Modal, Typography, Skeleton, TablePagination } from '@mui/material';
>>>>>>> Stashed changes
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import copy from '../../../../public/assets/image/copy.svg';
import { RootState, AppDispatch } from '../../store';
<<<<<<< Updated upstream
import { fetchTemplates,Template } from '../../slices/templates/template';

const Templates: React.FC = () => {
  const [inputString, setInputString] = useState('');
  const [hoverDropdown, setHoverDropdown] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
=======
import { fetchTemplates } from '../../slices/templates/template';

interface Template {
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

const Templates: React.FC = () => {
  const [inputString, setInputString] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
>>>>>>> Stashed changes

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { templates, status, error } = useSelector((state: RootState) => state.templates);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTemplates());
    }
  }, [dispatch, status]);

<<<<<<< Updated upstream
  const filteredTemplates = templates.filter((template) =>
    template.template_name.toLowerCase().includes(inputString.toLowerCase())
  );
=======
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // const templateModel = JSON.parse(templates.template_json_data_VI).templateModel;

  const filteredTemplates = templates.filter((template) =>
    template.template_name.toLowerCase().includes(inputString.toLowerCase())
  );
  
  const paginatedTemplates = filteredTemplates.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  console.log(paginatedTemplates,'fffff');
>>>>>>> Stashed changes

  const handleClose = () => setOpen(false);

  const handleAddTemplate = () => {
    router.push('/add-template');
  };

<<<<<<< Updated upstream
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, templateName: string) => {
    setAnchorEl(event.currentTarget);
    setHoverDropdown(templateName);
=======
  const handleMenuOpen = (event: MouseEvent<HTMLButtonElement>, template: Template) => {
    setAnchorEl(event.currentTarget);
    setSelectedTemplate(template);
>>>>>>> Stashed changes
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

<<<<<<< Updated upstream
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
=======
  const handlePreview = () => {
    setOpen(true);
    handleMenuClose();
  };

  const renderSkeleton = () => (
    <TableRow>
      <TableCell>
        <Skeleton variant="text" width="60%" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="40%" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="30%" />
      </TableCell>
      <TableCell>
        <Skeleton variant="text" width="20%" />
      </TableCell>
      <TableCell>
        <Skeleton variant="circular" width={40} height={40} />
      </TableCell>
    </TableRow>
  );
>>>>>>> Stashed changes

  if (status === 'loading') {
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
                  <TableCell sx={{fontWeight:'800',fontSize:'1rem'}}>Name</TableCell>
                  <TableCell sx={{fontWeight:'800',fontSize:'1rem'}}>Date</TableCell>
                  <TableCell sx={{fontWeight:'800',fontSize:'1rem'}}>Category</TableCell>
                  <TableCell sx={{fontWeight:'800',fontSize:'1rem'}}>Status</TableCell>
                  <TableCell sx={{fontWeight:'800',fontSize:'1rem'}}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from(new Array(5)).map((_, index) => renderSkeleton())}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    );
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
<<<<<<< Updated upstream
=======
              '&:hover': {
                backgroundColor: '#A02695',
                color: '#ffffff',
              },
>>>>>>> Stashed changes
            }}
            onClick={handleAddTemplate}
          >
            Add Template
          </Button>
        </Box>
      </Box>

      <Box component={Paper} sx={{ marginTop: '37px', padding: '23px 75px 100px 75px' }}>
        <Box display="flex" justifyContent="flex-end" marginRight="14px" mt={2} mb={2}>
<<<<<<< Updated upstream
          <TextField
            variant="outlined"
            placeholder="Search.."
            className='p-0'
=======
          <Box sx={{height:'35px'}}>
          <TextField
            placeholder="Search.."
>>>>>>> Stashed changes
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
<<<<<<< Updated upstream
            }}
            sx={{ marginRight: '10px', borderRadius: '12px' }}
          />
=======
              sx: {
                height: '35px', // Set the height to 35px
                padding: 0, // Remove any additional padding
                '& .MuiOutlinedInput-notchedOutline': {
                  borderRadius: '4px', // Optional: Adjust the border radius
                },
                '& .MuiInputBase-input': {
                  height: '35px', // Ensure the input text aligns well
                  padding: '0 14px', // Adjust padding for text inside the input
                  boxSizing: 'border-box', // Ensure padding does not affect height
                },
              },
            }}
            sx={{marginRight: '10px', borderRadius: '12px'}}
          />
          </Box>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
                <TableCell sx={{fontWeight:'800',fontSize:'1rem'}}>Name</TableCell>
                <TableCell sx={{fontWeight:'800',fontSize:'1rem'}}>Date</TableCell>
                <TableCell sx={{fontWeight:'800',fontSize:'1rem'}}>Category</TableCell>
                <TableCell sx={{fontWeight:'800',fontSize:'1rem'}}>Status</TableCell>
                <TableCell sx={{fontWeight:'800',fontSize:'1rem'}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTemplates.length > 0 ? (
                paginatedTemplates.map((template, index) => (
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
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
=======
                      <IconButton onClick={(event) => handleMenuOpen(event, template)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl && selectedTemplate?.template_name === template.template_name)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={handlePreview}>Preview Template</MenuItem>
                        <MenuItem onClick={() => console.log('Delete template', template.template_name)}>Delete Template</MenuItem>
                      </Menu>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
        <TablePagination
        sx={{marginTop:'15px'}}
          component="div"
          count={filteredTemplates.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
>>>>>>> Stashed changes
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
