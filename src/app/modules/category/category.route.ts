import express from "express"
import validateRequest from "../../middleware/validateRequest";

import { categoryValidationSchema } from "./category.validation";
import { categoryController } from "./category.controller";


const router= express.Router()
router.post('/categories',validateRequest(categoryValidationSchema.createCategoryValidationSchema),categoryController.createCategory);
router.get('/categories',categoryController.getAllCategoryFromDB)
export const categoryRoute=router