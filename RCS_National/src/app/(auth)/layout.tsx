"use client"

import { Box, TextField, Button, Typography } from "@mui/material";

import Isolation_Mode from "../../../public/assets/image/Isolation_Mode.png";
import Image from "next/image";
import Auth_Layout from "./sections/auth_Layout";
import { ThemeProvider } from "@emotion/react";
import theme from "../themes/auth_theme";
import { Metadata } from "next";




export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: "0" }}>
        <Box
          display="flex"
          flex="1 1 auto"
          flexDirection={{ xs: "column", md: "row" }}
          height="100vh"
          bgcolor="#f9f9f9"
        >
          <Image
            src={Isolation_Mode}
            alt="Isolation_Mode"
            style={{
              width: "315px",
              height: "auto",
              marginBottom: "20px",
              zIndex: 2,
              position: "absolute",
              top: 0,
              right: 0,
              overflow: "clip"
            }}
          />

            <ThemeProvider theme={theme} >
            <Auth_Layout />

            {children}
        </ThemeProvider> 
        </Box>
      </body>
    </html>
  );
}
