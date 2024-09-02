import React from 'react';
import TemplateForm from '../../compoents/add-template/TemplateForm';
import { Typography } from '@mui/material';
// import Layout from './layout';

const Page: React.FC = () => {
  return (
    <>
        <Typography marginBottom="12px" >Templates</Typography>
      <div>
        <TemplateForm />
      </div>
      </>
    
  );
};

export default Page;
