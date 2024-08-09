import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAuthenticated = cookies().get("accesstoken")?.value;


  const private_Path = ["/", "/campaign"];

  const public_Path=["/login","/register"];  


  if (public_Path.includes(path) && isAuthenticated) {
    return NextResponse.redirect(new URL("/campaign", request.url));
  }
 

   if (private_Path.includes(path)&& isAuthenticated) {
     return NextResponse.next();
  }
  
  if (private_Path.includes(path) && (!isAuthenticated || isAuthenticated === undefined)) {
     
    return NextResponse.redirect(new URL("/login", request.url));
  }
    

 



  return NextResponse.next();
}
