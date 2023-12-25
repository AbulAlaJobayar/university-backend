import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { reviewService } from "./review.service";

const createReviewIntoDB = catchAsync(async (req, res) => {
  const body = req.body
  const result = await reviewService.createReviewIntoDB(body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review created Successfully',
    data: result
  })
});
const getAllReviewFromDB = catchAsync(async (req, res) => {
  const result = await reviewService.getAllReviewFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    data: result
  })
})
export const reviewController = {
    createReviewIntoDB,
    getAllReviewFromDB
}