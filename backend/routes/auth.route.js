import express from 'express'
const router = express.Router()
import {signup, login, logout, verifyEmail} from '../controllers/auth.controller.js'


router.post('/', signup)

router.post('/login', login)

router.post('/logout', logout)

router.post('/verify-email', verifyEmail)

export default router
