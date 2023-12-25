import { z } from "zod";

const createUserValidationSchema = z.object({
    username: z.string({
        invalid_type_error: 'User name must be String',
        required_error: 'User name must be required'
    }),
    email: z.string().email().refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
        message: 'invalid email address'
    }),
    password: z.string().min(6, 'password should have at least 6 character').max(20, 'password should be no longer then 20 character').refine((value) => /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/.test(value), 'password must be one digit,one uppercase,one lowercase,one special character'),
    role: z.enum(['user', 'admin'])
})
export const userValidation = {
    createUserValidationSchema,
}