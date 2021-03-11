import { Router } from 'express'
import multer from 'multer'

import RootController from './root.controller'

const router = Router()
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/', upload.single('csv'), RootController.index)

export default router
