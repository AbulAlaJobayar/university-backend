import { Request, Response } from "express";

const notFound = (req: Request, res: Response) => {
    res.status(404).json({
        status: 'fail',
        message: `Router Not Found ${req.originalUrl}`
    })
}
export default notFound