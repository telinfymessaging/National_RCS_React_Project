import { GET_TEMPLATE_PREVIEW, GET_USER_RCS_TEMPLETS } from "@/app/constants/URLConstants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        // const token =;
        const response = await axios.get(GET_USER_RCS_TEMPLETS, {
            headers: {
              'token_RCS':cookies().get("accesstoken")?.value
            }
          });
          // console.log(response.data.message,'campaign');
      return NextResponse.json(response.data.message);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
