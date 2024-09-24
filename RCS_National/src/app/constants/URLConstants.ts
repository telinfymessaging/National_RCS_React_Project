
export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const LOGIN = `${baseURL}/login`;
export const getUserRCSTemp = `${baseURL}/getUserRCSTemp`;
export const getAllTemplatePreview = `${baseURL}/Get_RCS_Template/getAllTemplates`;
export const Reports = `${baseURL}/smsReport`;
export const GET_TEMPLATE_PREVIEW=`${baseURL}/Get_RCS_Template`;    
export const GET_USER_RCS_TEMPLETS=`${baseURL}/getUserRCSTemp`;
export const COMPOSE_BULK = `${baseURL}/compose/bulk`;
export const COMPOSE = `${baseURL}/compose/`;
export const GET_SMART_CREDITS = `${baseURL}/credit_Bal_Smart`;
export const GetAllCampaigns = `${baseURL}/Campaigns`;
export const downloadCampaignReport = `${baseURL}/Campaigns/downloadCampaign`;
export const getDownloadCenterDetails = `${baseURL}/download_Center`;
export const downloadReport = `${baseURL}/reportDownload`;