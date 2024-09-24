import React from 'react'
import { Box, TextField, Button, Typography } from "@mui/material";
import telnify_logo from "../../../../public/assets/image/login-logo.png";
import bg_image from "../../../../public/assets/image/login-img.png";
import Image from "next/image";
import Link from 'next/link';
function Auth_Layout() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      boxShadow={0}
      borderRadius={2}
      ml={13}
      width="50%"
      height={"100%"}
    >
      <Box display="flex" width={"100%"} height="auto">
        <Image
          src={telnify_logo}
          alt="Telinfy Platform"
          style={{
            width: "auto",
            marginBottom: "10px",
            alignItems: "start",
            marginTop: "20px",
          }}
        />
      </Box>
      <Box display="flex-col" alignItems="end" justifyContent={"end"}>
        <Image
          src={bg_image}
          alt="bg_image"
          style={{
            width: "500px",
            height: "auto",
            marginTop: "55px",
            marginLeft: "55px",
            marginBottom: "30px",
            alignItems: "end",
            justifyContent: "end",
          }}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          ml="20px"
        >
          <Typography variant="h5" gutterBottom sx={{ fontSize: "25px" }}>
            Create exceptional conversational experiences using
          </Typography>
          <Box display="flex">
            <Typography variant="h4">
              RCS Business Messaging
            </Typography>
          </Box>
          <Link href="/register">
            <Button
              variant="outlined"
              color="primary"
              style={{
                marginTop: "25px",
                fontSize: "20px",
                fontWeight: "bold",
                width: "270px",
              }}
              sx={{
                textTransform: "initial",
              }}
              size="large"
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
export default Auth_Layout