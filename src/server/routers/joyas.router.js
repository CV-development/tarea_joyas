import { Router } from 'express'
import * as joyasController from '../controllers/joyas.controller.js'

const router = Router()

router.get('/joyas', joyasController.findAll)
router.get('/joyas/filtros', joyasController.findAllWithFilters)

export default router
