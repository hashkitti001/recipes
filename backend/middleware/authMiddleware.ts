import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
require("dotenv").config()

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log(process.env.JWT_SECRET)
    try {
        const token = req.headers.authorization!.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)
        req.body.user = decodedToken
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ "message": "Access denied due to invalid token" })
        return
       
    }
}

export default authMiddleware