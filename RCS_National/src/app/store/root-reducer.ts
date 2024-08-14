import { combineReducers } from "@reduxjs/toolkit";
import templatesReducer from '../slices/templates/template';



export const rootReducer = combineReducers({
    templates: templatesReducer,
})