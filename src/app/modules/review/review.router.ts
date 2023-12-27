import express from "express"
import validateRequest from "../../middleware/validateRequest";
import { reviewValidationSchema } from "./review.validation";
import { reviewController } from "./review.contrller";
import auth from "../../middleware/auth";


const router= express.Router()
router.post('/reviews',auth('user'), validateRequest(reviewValidationSchema.createReviewValidationSchema),reviewController.createReviewIntoDB);
router.get('/reviews',reviewController.getAllReviewFromDB)
export const reviewRoute=router