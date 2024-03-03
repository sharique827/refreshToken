import express from 'express'
import { registerUser, loginUser, logout } from '../services/authentication.service'
import { validateUserDetails } from '../middlewares/validate'

const router = express.Router()

router.post('/register', validateUserDetails, registerUser)
router.post('/login', loginUser)
router.post('/logout', logout)

export { router as authenticationRouter }