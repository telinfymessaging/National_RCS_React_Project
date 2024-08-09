import { LOGIN } from "@/app/constants/URLConstants";
import axios from "axios";
import { NextResponse } from "next/server";
import { createCookie } from "@/app/actions/mutateCookie";





export async function POST(request: Request) {
  try {
    const body = await request.json();
      const response = await axios.post(LOGIN, body);
     
       if (response !== null) {
         await createCookie(response.data);
       }
      console.log("data fetched")
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
