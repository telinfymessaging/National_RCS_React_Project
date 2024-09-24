import {
    GET_TEMPLATE_PREVIEW,
    GET_USER_RCS_TEMPLETS,
  } from "@/app/constants/URLConstants";
  import axios from "axios";
  import { cookies } from "next/headers";
  import { NextResponse } from "next/server";
  export const getUserRcsTemplates = async () => {
    try {
      const token = cookies().get("accesstoken")?.value || "";
      const response = await axios.get(GET_USER_RCS_TEMPLETS, {
        headers: {
          token_RCS: token,
        },
      });
         const responseData = JSON.parse(JSON.stringify(response.data));
      return responseData;
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  };
