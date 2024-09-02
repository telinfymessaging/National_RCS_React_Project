
import { getUserRCSTemp } from "@/app/constants/URLConstants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";





export async function GET(request: Request) {
  try {
    // const token = cookies().get("accesstoken")?.value;
    // console.log(token,'dssdc');
    
        const response = await axios.get(getUserRCSTemp, {
            headers: {
               'token_RCS': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEzMzUyNywiZnVsbE5hbWUiOiJ0ZWxlcHIiLCJhcGlrZXkiOiIzMzNlNGU0Yi0xYTY5LTExZWYtOTQxZi0wMDE1NWQwMmFmMWEiLCJpYXQiOjE3MjM2MTA5MjAsImV4cCI6MTcyMzYyNTMyMH0.ZpbK_oVuEAPtUS_N3V2EE8tMdRq0zQhIM_o-f9naXnY'
            }
          });
      // console.log(response.data.message,'dsd')
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}