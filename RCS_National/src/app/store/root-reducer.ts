import { combineReducers } from "@reduxjs/toolkit";
import templatesReducer from '../slices/templates/template'; 
import formReducer from '../slices/add-template/formSlice'; 
import reportReducer from '../slices/reports/reports';
import campaignReducer from '../slices/campaign/campaign';
import campaignReportsReducer from '../slices/campaign/campaign';

export const rootReducer = combineReducers({
    templates: templatesReducer,
    form: formReducer,
    report: reportReducer,
    campaign: campaignReducer,
    campaignReports: campaignReportsReducer,
})