import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
require("dotenv").config()
interface DecodedTokenInterface {
    userId: string,
    username: string,
    iat: number,
    exp: number
}
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {
        console.log(process.env.JWT_SECRET)
        console.log(req.headers.authorization)
        const token = req.headers.authorization!.split(" ")[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedTokenInterface
        const { username, userId } = decodedToken
        req.body.user = username
        req.body.user_id = userId
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({ "message": "Access denied due to invalid token" })
        return

    }
}

export default authMiddleware