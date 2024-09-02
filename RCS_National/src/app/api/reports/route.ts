import { reports } from "@/app/constants/URLConstants";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Parse the incoming request body
    const body = await request.json();

    // Log the body for debugging
    console.log("Request Body:", body);

    // Get the token from cookies
    const token = cookies().get("accesstoken")?.value

    // Log the token for debugging
    console.log("Token:", token);

    // Prepare headers
    const headers = {
      'Content-Type': 'application/json',
      'token_RCS': token,
    };

    // Log the headers for debugging
    console.log("Headers:", headers);

    // Make the POST request using axios
    const response = await axios.post(reports, body, { headers });

    // Log the response for debugging
    console.log( response.data.message,"API Response:");

    // Return the response data
    return NextResponse.json(response.data);
  } catch (error: any) {
    // Log the error for debugging
    console.error("Error:", error);

    // Return an error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
