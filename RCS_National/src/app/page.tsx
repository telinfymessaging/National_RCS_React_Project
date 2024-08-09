"use client"
import { Box, Button, Container } from '@mui/material';
import React, { useCallback, useState } from 'react'
import { deleteCookie as Logout } from "./actions/mutateCookie"
import { useRouter } from 'next/navigation';



function page() {

  const router = useRouter();
  
  const handleLogout=useCallback(async()=>{
    await Logout();

    console.log("logged out");

     if (typeof window !== "undefined") {
       localStorage.removeItem("RCS_token");
    }
    
    router.push("/login");
    

  },[])
  return (
    <>
      <h1>Welcome to RCS</h1>

      <Box  display="flex" justifyContent="center" alignItems="center" height="100vh">

        <Button variant='contained' color="primary" onClick={handleLogout} >
          logout
         </Button>
      </Box>
    </>
  );
}

export default page
