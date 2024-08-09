import * as z from "zod";

export const RegisterSchema = z.object({
  fullName: z.string().min(3, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  mobileNumber: z
    .string({
      required_error: "Mobile Number is required",
      invalid_type_error: "Mobile Number must be a number",
    })
    .length(10, "Mobile Number must be exactly 10 digits")
    .refine(
      (val) => /^\d{10}$/.test(val),
      "Mobile Number must contain only digits"
    ),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export type RegisterModel = z.infer<typeof RegisterSchema>;
