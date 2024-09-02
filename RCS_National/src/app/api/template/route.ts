
import { getUserRCSTemp, } from "@/app/constants/URLConstants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";





export async function GET(request: Request) {
  try {
    
   
        const response = await axios.get(getUserRCSTemp, {
            headers: {
               'token_RCS':  cookies().get("accesstoken")?.value
            }
          });
      console.log(response.data.message,'dsd')
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}



