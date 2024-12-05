import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
require("dotenv").config()
interface DecodedTokenInterface {
    userId: string,
    username: string,
    iat:number,
    exp: number
}
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const token = req.headers.authorization!.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedTokenInterface
        const {username} = decodedToken
        req.body.user = username
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ "message": "Access denied due to invalid token" })
        return
       
    }
}

export default authMiddleware