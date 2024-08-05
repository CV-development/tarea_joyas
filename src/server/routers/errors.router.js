import { Router } from 'express'
import * as errors from '../controllers/errors.controller.js'

const router = Router()

router.all('*', errors.errors)

export default router
