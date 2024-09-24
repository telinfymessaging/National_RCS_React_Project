'use client'
import React from "react"
import {
  TextField,
  Button,
  Typography,
  FormHelperText,
} from "@mui/material"
import { useFormik } from "formik"
import { toFormikValidationSchema } from "zod-formik-adapter"
import { LoginSchema } from "@/app/utils/Schemas/LoginSchema"
import { login } from "../../server/actions/auth"
import { useRouter } from "next/navigation"
type LoginModel = {
  userName: string
  password: string
  submit: null
}
const initialValues: LoginModel = {
  userName: "",
  password: "",
  submit: null,
}
export default function LoginForm() {
  const router = useRouter()
  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(LoginSchema as any),
    onSubmit: async (values, helpers) => {
      try {
        const response = await login(values.userName, values.password)
        if (response && response.token) {
          localStorage.setItem("RCS_token", response.token)
          router.push("/campaign")
        }
      } catch (err) {
        console.error(err)
        helpers.setErrors({ submit: (err as Error).message })
        helpers.setSubmitting(false)
      }
    },
  })
  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <Typography variant="caption" fontSize="20px">
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
      <Typography variant="caption" fontSize="20px" marginTop="10px">
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
  )
}









