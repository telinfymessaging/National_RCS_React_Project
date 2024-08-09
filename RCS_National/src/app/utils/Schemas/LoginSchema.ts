import { z } from "zod";

const requiredMessage: string = "This field is required";

export const LoginSchema = z.object({
  userName: z.string({
    required_error: requiredMessage,
  }),
  password: z.string({
    required_error: requiredMessage,
  }),
  submit: z.any(),
});
