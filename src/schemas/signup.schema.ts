import z from "zod";

export const usernameValidation = z
    .string()
    .min(2, "Username must be at least 2 Characters")
    .max(20, "Username is length overpassed")
    
export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid Email Address"}),
    password: z.string().min(6, {message:"Password must be 6 chars"})
})