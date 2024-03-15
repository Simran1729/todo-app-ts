import { z } from "zod";

export const signUpInput = z.object({
    username: z.string().min(10).max(50),
    password: z.string().min(6).max(15)
})

export type SignUpParams = z.infer<typeof signUpInput>;