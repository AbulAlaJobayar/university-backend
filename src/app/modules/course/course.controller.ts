/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";

import { sendResponse } from "../../utils/sendResponse";
import { courseService } from "./course.service";
import { meta } from "../../utils/meta";

const createCourse = catchAsync(async (req, res) => {
  const body = req.body

  const result = await courseService.createCourseIntoDB(req.user, body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Course created successfully',
    data: result
  })
});
const getAllCourseFromDB = catchAsync(async (req, res) => {
  const courses = await courseService.getAllCourseFromDB(req.query);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
  let perPageLimit = 10
  const totalDataLength = courses.length
  const metaResult = meta(perPageLimit, totalDataLength, courses)
  const { page, pageData } = metaResult
  res.send({
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    meta: { page, limit: 10, total: pageData.length },
    data:{courses}
  })
})
const updateCourseIntoDB = catchAsync(async (req, res) => {

  const { courseId } = req.params
  const body = req.body

  const result = await courseService.updateCourseIntoDB(req.user, courseId, body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result
  })
})
const getCourseByReviewFromDB = catchAsync(async (req, res) => {
  const { courseId } = req.params
  const result = await courseService.getCourseByReviewFromDB(courseId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course with reviews retrieved successfully',
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