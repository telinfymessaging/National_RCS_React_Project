import { combineReducers } from "@reduxjs/toolkit";
<<<<<<< Updated upstream
import templatesReducer from '../slices/templates/template';



export const rootReducer = combineReducers({
    templates: templatesReducer,
=======
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
>>>>>>> Stashed changes
})