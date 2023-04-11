import express from 'express'
import { getAllUsers, login, signUp } from '../controllers/userController.js'

const router = express.Router()

router.get('/', getAllUsers)
router.post('/signup', signUp)
router.post('/login', login)

export default router