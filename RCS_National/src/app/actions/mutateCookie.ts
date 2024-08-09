"use server"
import { cookies } from "next/headers";

export async function createCookie(data: any) {
  
  const token = await data.token;
  token !== null
    ?  cookies().set("accesstoken", token)
    :  cookies().set("accesstoken", "");
  
  if (token == null) {
     cookies().set("accesstoken", token);
  }
    
       
}

export async function deleteCookie() {
  
  cookies().delete("accesstoken");
}


