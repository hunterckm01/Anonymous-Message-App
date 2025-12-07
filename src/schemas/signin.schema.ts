import z from "zod";

export const signInSchema = z.object({
  username: z.string()
            .min(2, {message: "Username must be 2 char"})
            .max(20, "Username length is longer")
            .regex(/^[a-zA-Z0-9_]/, {message: "Username must not contain special chars"}),
  password: z.string()
})