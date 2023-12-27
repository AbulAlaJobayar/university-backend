import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

import { sendResponse } from "../../utils/sendResponse";
import { courseService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const body = req.body
 
  const result = await courseService.createCourseIntoDB(req.user,body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully',
    data: result
  })
});
const getAllCourseFromDB = catchAsync(async (req, res) => {
  const result = await courseService.getAllCourseFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Courses retrieved successfully',
    data: result
  })
})
const updateCourseIntoDB = catchAsync(async (req, res) => {
  const {courseId}=req.params
  const body=req.body
  
  const result = await courseService.updateCourseIntoDB(courseId,body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result
  })
})
const getCourseByReviewFromDB = catchAsync(async (req, res) => {
  const {courseId}=req.params
  const result = await courseService.getCourseByReviewFromDB(courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course and Reviews retrieved successfully',
    data: result
  })
})
const getBestCourseByReviewFromDB = catchAsync(async (req, res) => {
  const result = await courseService.getBestCourseByReviewFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Best course retrieved successfully',
    data: result
  })
})
export const courseController = {
  createCourse,
  getAllCourseFromDB,
  updateCourseIntoDB,
  getCourseByReviewFromDB,
  getBestCourseByReviewFromDB
}