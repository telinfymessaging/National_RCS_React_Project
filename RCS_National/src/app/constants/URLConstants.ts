
export const baseEndpoint = (baseUrl: string) => `https://${baseUrl}`;
export const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const LOGIN = `${baseURL}/login`;
