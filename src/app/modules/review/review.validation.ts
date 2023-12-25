import { z } from 'zod'

const createReviewValidationSchema = z.object({
    courseId: z.string(),
    rating:z.number().min(1).max(5),
    review:z.string({
        invalid_type_error: 'description must be String',
        required_error: 'description must be required'
    })


})
export const reviewValidationSchema = {
    createReviewValidationSchema
}