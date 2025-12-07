import z from "zod";

export const messageSchema = z.object({
    content: z.string()
            .min(10, {message: "Message must be of 10 chars"})
            .max(1000, {message: "Message length overflowed"})
})