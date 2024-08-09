'use client';

import React, { useState, useEffect } from 'react';
import { Container, Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Menu, MenuItem, Modal, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import copy from '../../../../public/assets/image/copy.svg';

const templates = [
  { name: 'Template 1', lastUpdate: new Date(), type: 'Type A', status: 'approved' },
  { name: 'Template 2', lastUpdate: new Date(), type: 'Type B', status: 'pending' },
  // Add more templates as needed
];

const Templates = () => {
  const [inputString, setInputString] = useState('');
  const [hoverDropdown, setHoverDropdown] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Code that requires the window object
    }
  }, []);

  // const handleOpen = (template) => {
  //   setSelectedTemplate(template);
  //   setOpen(true);
  // };

  const handleClose = () => setOpen(false);

  const handleAddTemplate = () => {
    router.push('/add-template');
  };

  // const handleMenuOpen = () => {
  //   setAnchorEl(event.currentTarget);
  //   setHoverDropdown(templateName);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setHoverDropdown(null);
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(inputString.toLowerCase())
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
        <Typography variant='h1' sx={{fontSize:'30px',fontWeight:'700',lineHeight:1.6,color:'#60576B'}}>Templates</Typography>
        <Box display="flex" alignItems="center">
        <Button sx={{maxWidth:'158px',flexBasis:'158px',backgroundColor:'transparent',color:'#A02695',padding:'13px',fontSize:'16px',borderRadius:'4px',fontWeight:'700',border:'0.565px solid #A02695'}} onClick={handleAddTemplate}>Add Template</Button>
        </Box>
      </Box>
       
       <Box component={Paper} sx={{marginTop:'37px',padding:"23px 75px 100px 75px",borderRadius:'14px'}}>
      <Box display="flex" justifyContent="flex-end" marginRight="14px" mt={2} mb={2}>
        <TextField
          variant="outlined"
          placeholder="Search.."
          value={inputString}
          onChange={(e) => setInputString(e.target.value)}
          InputProps={{
            endAdornment: <SearchIcon />
          }}
        />
        <Box display='flex' alignItems='center'>
          <Button sx={{ width:'97px',borderRadius:'12px',border:'1px solid #CDCDCD',
    //          width: 97px;
    // border-radius: 12px;
    // border: 1px solid #CDCDCD;
    // background-color: #F4F4F4;
    // color: #000000;
    // padding: 3px 8px;
    // font-weight: 600;
    // font-size: 18px;
}}> Filter
        <IconButton>
          <FilterListIcon />
        </IconButton>
        </Button>
        </Box>
      </Box>

      <TableContainer >
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
            {filteredTemplates.map((template, index) => (
              <TableRow key={index}>
                <TableCell>{template.name}</TableCell>
                <TableCell>{new Date(template.lastUpdate).toLocaleString()}</TableCell>
                <TableCell>{template.type}</TableCell>
                <TableCell>
                  <Typography color={
                    template.status === 'approved' ? 'green' : 
                    template.status === 'pending' ? 'orange' : 'grey'
                  }>
                    {template.status}
                  </Typography>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <Image src={copy} alt="copy" />
                  </IconButton>
                  <IconButton onClick={() => console.log('Delete template', template.name)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton 
                     
                    onMouseLeave={handleMenuClose}
                  >
                    <MoreVertIcon />
                    <Menu
                      anchorEl={anchorEl}
                      open={hoverDropdown === template.name}
                      onClose={handleMenuClose}
                    >
                      <MenuItem >Preview Template</MenuItem>
                      <MenuItem onClick={() => console.log('Delete template', template.name)}>Delete Template</MenuItem>
                    </Menu>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
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
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Template Preview
          </Typography>
          {selectedTemplate && (
            <Box id="modal-modal-description" sx={{ mt: 2 }}>
              <Typography>Name: {}</Typography>
              <Typography>Type: {}</Typography>
              <Typography>Status: {}</Typography>
              <Typography>Last Updated: {new Date().toLocaleString()}</Typography>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Templates;
