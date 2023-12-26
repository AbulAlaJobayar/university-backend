
import express  from "express"
import validateRequest from "../../middleware/validateRequest"
import { userValidation } from "./user.validation"
import { userController } from "./user.controller"
import auth from "../../middleware/auth"

const router=express.Router()
router.post('/auth/register',validateRequest(userValidation.createUserValidationSchema),userController.createUserIntoDB)
router.post('/auth/login',validateRequest(userValidation.loginValidationSchema),userController.loginUser)
router.post('/auth/change-password',auth('user','admin'), validateRequest(userValidation.userChangedPassword),userController.userChangedPassword)


export const userRouter=router