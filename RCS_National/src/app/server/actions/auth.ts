"use server";
import { LOGIN } from "../../constants/URLConstants";
import axios from "axios";
import { createCookie } from "./mutateCookie";
export async function login( name:string, psw:string) {
  try {
    const response = await axios.post(LOGIN, { name, psw});
    console.log("in login server")
    if (response && response.data) {
      await createCookie(response.data);
      return {
        token: response.data.token,
        ...response.data,
      };
    }
  } catch (error: any) {
    throw new Error(`Login failed: ${error.message}`);
  }
}