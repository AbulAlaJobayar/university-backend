import express  from "express"
import validateRequest from "../../middleware/validateRequest"
import { userValidation } from "./user.validation"
import { userController } from "./user.controller"

const router=express.Router()
router.post('/auth/register',validateRequest(userValidation.createUserValidationSchema),userController.createUserIntoDB)
router.post('/auth/login',validateRequest(userValidation.loginValidationSchema),userController.loginUser)


export const userRouter=router