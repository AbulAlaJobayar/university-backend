import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import notFound from './app/middleware/notFound'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { courseRoute } from './app/modules/course/course.route'
import { categoryRoute } from './app/modules/category/category.route'
import { reviewRoute } from './app/modules/review/review.router'
import { userRouter } from './app/modules/user/user.router'
const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api',courseRoute)
app.use('/api',categoryRoute)
app.use('/api',reviewRoute)
app.use('/api',userRouter)
app.get('/', (req: Request, res: Response) => {
res.json({
    status: 'success',
    message: 'Course Review server running'
  })
})

app.use(notFound)
app.use(globalErrorHandler)


export default app
