import {object, string, z} from "zod";


export const SignInValidator = object({
    email: string().min(1, {
        message:'This field is required'
    }).email(),
    password: string().min(6, {
        message: "Password must be at least 6 characters"
    })
});

export type SignInInputValidator = z.infer<typeof SignInValidator>;