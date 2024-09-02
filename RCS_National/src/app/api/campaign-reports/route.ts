import { getAllCampaigns } from "@/app/constants/URLConstants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        // const token =;
        const response = await axios.get(getAllCampaigns, {
            headers: {
              'token_RCS': cookies().get("accesstoken")?.value
            }
          });
          console.log(response.data.message,'campaign');
      return NextResponse.json(response.data.message);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
