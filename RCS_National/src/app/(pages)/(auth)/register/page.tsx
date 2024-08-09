
"use client";
import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  
} from "@mui/material";
import {
  Google as GoogleIcon,
  Microsoft as MicrosoftIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  RegisterSchema,
  RegisterModel,
} from "@/app/utils/Schemas/RegisterSchema";
import Link from "next/link";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const initialValues: RegisterModel = {
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(RegisterSchema),
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission
    },
  });

  return (
    
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          
          zIndex: "3",
      }}
      width={"49%"}
      >
        <Typography component="h1" variant="h5">
          Create your Account
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 1 }}
        >
          Already have an Account?{" "}
          <Link href="/login" style={{ zIndex: "20" }}>
            Sign In
          </Link>
        </Typography>
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid item>
            <Button
              variant="outlined"
              sx={{ textTransform: "initial" }}
              startIcon={<GoogleIcon />}
            >
              Continue with Google
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              sx={{ textTransform: "initial" }}
              startIcon={<MicrosoftIcon />}
            >
              Continue with Microsoft
            </Button>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 2 }}
        >
          OR
        </Typography>
        <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ mt: 1, width: "60%" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="name"
            autoFocus
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Company Email"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="mobileNumber"
            label="Mobile Number"
            name="mobileNumber"
            autoComplete="tel"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
            value={formik.values.mobileNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)
            }
            helperText={
              formik.touched.mobileNumber && formik.errors.mobileNumber
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register Now
          </Button>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          sx={{ mt: 2 }}
        >
          By signing up, you agree to our <Link href="/terms">Terms</Link> &{" "}
          <Link href="/privacy">Privacy Policy</Link>
        </Typography>
      </Box>
    
  );
};

export default RegisterForm;