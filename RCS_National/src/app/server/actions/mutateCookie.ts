"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Function to create or update the cookie
export async function createCookie(data: any) {
  const token = await data.token;

  if (token) {
    // Set the cookie if the token is available
    cookies().set("accesstoken", token);
  } else {
    // Clear the cookie if the token is null or expired
    cookies().set("accesstoken", "");
    redirect("/login"); // Redirect the user to the login page if no token
  }
}

// Function to delete the cookie
export async function deleteCookie() {
  // Delete the accesstoken cookie
  cookies().delete("accesstoken");

  // Optionally, redirect the user to the login page after deletion
  redirect("/login");
}
