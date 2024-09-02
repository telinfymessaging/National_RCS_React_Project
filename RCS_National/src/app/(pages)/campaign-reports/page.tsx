'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReports, selectReports, selectReportsStatus, selectReportsError, fetchTemplatesStart } from '../../slices/campaign-reports/campaign-reports';
import { AppDispatch, RootState } from '@/app/store';
import {Report} from '../../slices/campaign-reports/campaign-reports';

const CampaignReports: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {  status, error } = useSelector((state: RootState) => state.campaignReports);
  const reports = useSelector(selectReports) ?? [];


  useEffect(() => {
    dispatch(fetchTemplatesStart());  // Dispatch the async action
  }, [dispatch]);

  console.log('Status:', status); // Log the status
  console.log('Error:', error); // Log any errors
  console.log('Reports:', reports); // Log the reports array
  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <ul>
          {reports.map((report:any,index:number) => (
            <li key={index}>{report.campaign_name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CampaignReports;
