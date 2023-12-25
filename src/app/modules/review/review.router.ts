import express from "express"
import validateRequest from "../../middleware/validateRequest";
import { reviewValidationSchema } from "./review.validation";
import { reviewController } from "./review.contrller";


const router= express.Router()
router.post('/reviews',validateRequest(reviewValidationSchema.createReviewValidationSchema),reviewController.createReviewIntoDB);
router.get('/reviews',reviewController.getAllReviewFromDB)
export const reviewRoute=router