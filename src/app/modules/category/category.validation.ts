import { z } from 'zod'

const createCategoryValidationSchema = z.object({
    name: z.string({
        invalid_type_error: 'name must be String',
        required_error: 'name must be required'
    }),


})
export const categoryValidationSchema = {
    createCategoryValidationSchema
}