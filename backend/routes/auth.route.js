import express from 'express'
import {signup, login, logout, verifyEmail, forgotPassword, resetPassword, checkAuth} from '../controllers/auth.controller.js'
import { protectAuth } from '../middleWare/protectAuth.js'

const router = express.Router()

router.get("/check-auth", protectAuth, checkAuth)
router.post('/', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)

export default router
