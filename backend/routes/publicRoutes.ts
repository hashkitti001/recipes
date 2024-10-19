import express from 'express'
import { Router } from "express"
import {loginUser, signupUser, dummy} from '../controllers/authController'
const publicRouter: Router = express.Router()

publicRouter.post('/auth/login', loginUser)
publicRouter.post('/auth/signup', signupUser)
publicRouter.get('/dummy', dummy)

export default publicRouter