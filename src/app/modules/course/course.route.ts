import express from "express"
import validateRequest from "../../middleware/validateRequest";
import { courseValidationSchema } from "./courseValidation";
import { courseController } from "./course.controller";
import auth from "../../middleware/auth";


const router= express.Router()
router.post('/course',auth('admin'), validateRequest(courseValidationSchema.createCourseValidationSchema),courseController.createCourse);
router.get('/courses',courseController.getAllCourseFromDB)
router.put('/courses/:courseId',validateRequest(courseValidationSchema.updateCourseValidationSchema),courseController.updateCourseIntoDB);
router.get('/courses/:courseId/reviews',courseController.getCourseByReviewFromDB)
router.get('/course/best',courseController.getBestCourseByReviewFromDB)
export const courseRoute=router