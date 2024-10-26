import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
require('dotenv').config();

interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }


    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };


        req.user = await User.findById(decoded.id).select('-password') as { id: string };


        if (!req.user) {
            return res.status(401).json({ message: "Not authorized, user does not exist" });
        }

        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ message: "Not authorized, invalid token" });
    }
};

export default authMiddleware;
