"use client";
import React, { useCallback, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormHelperText,
} from "@mui/material";
import { TypeOf } from "zod";
import { useFormik } from "formik";
import { LoginSchema } from "@/app/utils/Schemas/LoginSchema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import axios from "axios";
import { useRouter } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { createCookie } from "@/app/actions/mutateCookie";

// Function to display error messages


// Type definition for the login model based on the schema
type LoginModel = TypeOf<typeof LoginSchema>;

// Initial form values
const initialValues: LoginModel = {
  userName: "",
  password: "",
  submit: null,
};

function LoginPage() {


  const router=useRouter()

 const signIn = useCallback(
   async (name: string, psw: string) => {
     try {
       const { data: response } = await axios.post("/api/auth", { name, psw });
       const { token } = response;

       if (typeof window !== "undefined") {
         localStorage.setItem("RCS_token", token);
       }
       
      router.push("/campaign");
        
     } catch (error) {
       console.error("Sign-in failed", error);
       
     }
   },
   [router] 
 );


  // Formik hook for form handling
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(LoginSchema as any),
    onSubmit: async (values, helpers) => {
      try {
        await signIn(values.userName, values.password);
      } catch (err) {
        console.error(err);
        helpers.setErrors({ submit: (err as Error).message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      width="49%"
    >
      <Box paddingLeft={"100px"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          width={"420px"}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            fontSize="40px"
            marginBottom={"100px"}
          >
            Login to Telinfy
          </Typography>

          <form noValidate onSubmit={formik.handleSubmit}>
            <Typography
              variant="caption"
              fontWeight=""
              fontSize="20px"
              marginBottom={""}
            >
              Username
            </Typography>
            <TextField
              autoFocus
              error={!!(formik.touched.userName && formik.errors.userName)}
              fullWidth
              helperText={formik.touched.userName && formik.errors.userName}
              name="userName"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.userName}
              placeholder="mail@gmail.com"
              variant="outlined"
              InputProps={{
                style: {
                  width: "412px",
                  borderRadius: "15px",
                  marginBottom: "16px",
                },
              }}
            />
            <Typography
              variant="caption"
              fontWeight=""
              fontSize="20px"
              marginTop="10px"
            >
              Password
            </Typography>
            <TextField
              error={!!(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              placeholder="password"
              variant="outlined"
              InputProps={{
                style: {
                  width: "412px",
                  borderRadius: "15px",
                },
              }}
            />
            {formik.errors.submit && (
              <FormHelperText error sx={{ mt: 3 }}>
                {formik.errors.submit as string}
              </FormHelperText>
            )}
            <Typography
              variant="body2"
              color="primary"
              align="right"
              fontSize="20px"
              style={{ width: "100%", cursor: "pointer", marginTop: "20px" }}
            >
              Forgot Password?
            </Typography>
            <Button
              disabled={formik.isSubmitting}
              variant="contained"
              color="primary"
              style={{ marginTop: "20px", width: "280px", height: "50px" }}
              sx={{
                textTransform: "initial",
                fontWeight: "bold",
                fontSize: "20px",
              }}
              type="submit" // Add this line
            >
              Login Now
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default LoginPage;